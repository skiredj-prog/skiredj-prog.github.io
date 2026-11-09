"""Build the three A5 TENIR N° 01 editions from the web's editorial JSON.

Requires reportlab, Pillow, arabic-reshaper and python-bidi. The last two are
used only for the Arabic print edition; the HTML edition keeps logical Unicode.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path

from PIL import Image, ImageOps
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib import colors
from reportlab.lib.pagesizes import A5
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

try:
    import arabic_reshaper
    from bidi.algorithm import get_display
except ImportError:
    arabic_reshaper = None
    get_display = None


ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "src/data/magazine/n01.json").read_text(encoding="utf-8"))
PAGE_W, PAGE_H = A5
M = 34
RIGHT = PAGE_W - M
CONTENT = PAGE_W - 2 * M
NAVY = colors.HexColor("#102747")
INK = colors.HexColor("#172d4d")
MUTED = colors.HexColor("#56677e")
TEAL = colors.HexColor("#0c727a")
COPPER = colors.HexColor("#ad6235")
PALE = colors.HexColor("#e9f1f6")
PALE_TEAL = colors.HexColor("#e3f2f1")
PALE_COPPER = colors.HexColor("#f7ece5")
RULE = colors.HexColor("#d8e0e7")


def register_fonts():
    fonts = Path("C:/Windows/Fonts")
    for name, file in [
        ("Body", "arial.ttf"), ("BodyBold", "arialbd.ttf"),
        ("Head", "georgiab.ttf"), ("Arabic", "tahoma.ttf"),
        ("ArabicBold", "tahomabd.ttf"),
    ]:
        pdfmetrics.registerFont(TTFont(name, str(fonts / file)))


class Edition:
    def __init__(self, lang: str, out_dir: Path):
        self.d = DATA[lang]
        self.lang = lang
        self.rtl = lang == "ar"
        if self.rtl and (arabic_reshaper is None or get_display is None):
            raise RuntimeError("Arabic print needs arabic-reshaper and python-bidi")
        out_dir.mkdir(parents=True, exist_ok=True)
        self.path = out_dir / f"TENIR-N01-{lang.upper()}.pdf"
        self.c = canvas.Canvas(str(self.path), pagesize=A5, pageCompression=1)
        self.c.setTitle(self.d["web"]["doc_title"])
        self.c.setAuthor("TENIR Labs")
        self.c.setSubject("TENIR N° 01 — Maroc 2030")
        self.body = "Arabic" if self.rtl else "Body"
        self.bold = "ArabicBold" if self.rtl else "BodyBold"
        self.head = "ArabicBold" if self.rtl else "Head"
        self.body_size = 10.2 if self.rtl else 9.8
        self.leading = 14.0 if self.rtl else 13.6
        self.page_no = 0

    def visual(self, s):
        s = str(s).replace("\u202f", " ").replace("\u00a0", " ")
        return get_display(arabic_reshaper.reshape(s)) if self.rtl else s

    def side_line(self, text, y, side, size, bold=False, color=MUTED):
        self.c.setFont(self.font(bold), size)
        self.c.setFillColor(color)
        shown = self.visual(text)
        if side == "right":
            self.c.drawRightString(RIGHT, y, shown)
        else:
            self.c.drawString(M, y, shown)

    def font(self, bold=False, head=False):
        return self.head if head else self.bold if bold else self.body

    def width(self, s, size, bold=False, head=False):
        return pdfmetrics.stringWidth(self.visual(s), self.font(bold, head), size)

    def line(self, text, x, y, size=None, bold=False, head=False, color=INK, width=None, link=None):
        size = size or self.body_size
        self.c.setFont(self.font(bold, head), size)
        self.c.setFillColor(color)
        shown = self.visual(text)
        if self.rtl:
            self.c.drawRightString(x + (width or 0), y, shown)
        else:
            self.c.drawString(x, y, shown)
        if link:
            self.c.linkURL(link, (x, y - 2, x + (width or self.width(text, size, bold, head)), y + size), relative=0)

    def wrap(self, text, width, size=None, bold=False, head=False):
        size = size or self.body_size
        words = str(text).split()
        lines = []
        current = ""
        for word in words:
            candidate = f"{current} {word}" if current else word
            if current and self.width(candidate, size, bold, head) > width:
                lines.append(current)
                current = word
            else:
                current = candidate
        if current:
            lines.append(current)
        return lines or [""]

    def paragraph(self, text, y, x=M, width=CONTENT, size=None, leading=None,
                  bold=False, head=False, color=INK, after=8, link=None):
        size = size or self.body_size
        leading = leading or (size * 1.31 if head else self.leading)
        lines = self.wrap(text, width, size, bold, head)
        for text_line in lines:
            self.line(text_line, x, y, size, bold, head, color, width, link)
            y -= leading
        return y - after

    def title(self, text, y, size=None):
        size = size or (19.5 if self.rtl else 21.5)
        return self.paragraph(text, y, size=size, leading=size * (1.30 if self.rtl else 1.17),
                              bold=True, head=True, after=9)

    def subhead(self, text, y, size=None, color=NAVY):
        size = size or (11.6 if self.rtl else 12.3)
        return self.paragraph(text, y, size=size, leading=size * 1.25, bold=True, head=True, color=color, after=4)

    def tag(self, kind, y):
        label = self.d["tags"][kind]
        size = 7.2 if not self.rtl else 8.2
        w = self.width(label, size, True) + 13
        h = 15
        x = RIGHT - w if self.rtl else M
        fill = NAVY if kind == "fact" else colors.white
        border = NAVY if kind == "fact" else TEAL if kind == "think" else COPPER
        self.c.setStrokeColor(border)
        self.c.setFillColor(fill)
        self.c.roundRect(x, y - h + 4, w, h, 7, stroke=1, fill=1)
        self.line(label, x + 7, y - 6, size, bold=True,
                  color=colors.white if kind == "fact" else border, width=w - 14)
        return y - 22

    def tagged(self, kind, text, y, after=10):
        y = self.tag(kind, y)
        return self.paragraph(text, y, after=after)

    def box(self, text, y, fill=PALE, pad=9, size=None, color=INK, title=None, link=None):
        size = size or self.body_size
        lines = self.wrap(text, CONTENT - 2 * pad, size)
        lead = size * (1.34 if self.rtl else 1.28)
        title_height = 17 if title else 0
        height = 2 * pad + len(lines) * lead + title_height
        self.c.setFillColor(fill)
        self.c.roundRect(M, y - height, CONTENT, height, 4, stroke=0, fill=1)
        yy = y - pad - size
        if title:
            self.line(title, M + pad, yy, size + 1, bold=True, head=True,
                      color=color, width=CONTENT - 2 * pad)
            yy -= title_height
        for text_line in lines:
            self.line(text_line, M + pad, yy, size, color=color,
                      width=CONTENT - 2 * pad, link=link)
            yy -= lead
        return y - height - 12

    def rule(self, y):
        self.c.setStrokeColor(RULE)
        self.c.line(M, y, RIGHT, y)
        return y

    def choices(self, options, y):
        x = RIGHT if self.rtl else M
        row_y = y
        for option in options:
            is_arabic = bool(re.search(r"[\u0600-\u06ff]", option))
            font = "Arabic" if is_arabic else "Body"
            size = 9.4 if is_arabic else 8.5
            shown = get_display(arabic_reshaper.reshape(option)) if is_arabic else option
            width = pdfmetrics.stringWidth(shown, font, size) + 17
            if self.rtl and x - width < M:
                x = RIGHT
                row_y -= 22
            elif not self.rtl and x + width > RIGHT:
                x = M
                row_y -= 22
            left = x - width if self.rtl else x
            self.c.setFillColor(colors.white)
            self.c.setStrokeColor(NAVY)
            self.c.roundRect(left, row_y - 17, width, 18, 9, fill=1, stroke=1)
            self.c.setFillColor(NAVY)
            self.c.setFont(font, size)
            if is_arabic or self.rtl:
                self.c.drawRightString(left + width - 8, row_y - 11, shown)
            else:
                self.c.drawString(left + 8, row_y - 11, shown)
            x = left - 5 if self.rtl else left + width + 5
        return row_y - 34

    def step(self, i, title, body, y, size=None, gap=6):
        size = size or self.body_size
        num_x = RIGHT - 12 if self.rtl else M
        self.line(str(i), num_x, y, 10.5, bold=True, head=True,
                  color=COPPER, width=12 if self.rtl else None)
        text_x = M if self.rtl else M + 21
        text_w = CONTENT - 21
        y_title = self.paragraph(title, y, text_x, text_w, size=size + .3,
                                 leading=size * 1.28, bold=True, after=1)
        y_body = self.paragraph(body, y_title, text_x, text_w, size=size,
                                leading=size * (1.42 if self.rtl else 1.31), after=gap)
        self.rule(y_body + 3)
        return y_body - 3

    def start(self, section):
        self.page_no += 1
        y = PAGE_H - 34
        self.side_line(self.d["run"], y, "right" if self.rtl else "left", 8.1, bold=True)
        self.side_line(section, y, "left" if self.rtl else "right", 8.1, bold=True)
        self.rule(y - 9)
        return y - 31

    def finish(self, y):
        if y < 44:
            raise ValueError(f"{self.lang.upper()} page {self.page_no} overflows: y={y:.1f}")
        self.side_line(str(self.page_no).zfill(2), 23,
                       "right" if self.rtl else "left", 8.8, bold=True)
        self.side_line(self.d["tagline"], 23,
                       "left" if self.rtl else "right", 7.7)
        self.c.showPage()

    def cover(self):
        self.page_no += 1
        c = self.c
        image = Image.open(ROOT / "public/magazine/n01/couverture.jpg").convert("RGB")
        image = ImageOps.fit(image, (1200, 830), method=Image.Resampling.LANCZOS)
        c.drawImage(ImageReader(image), 0, PAGE_H * .48, PAGE_W, PAGE_H * .52)
        c.setFillColor(NAVY)
        c.rect(0, 0, PAGE_W, PAGE_H * .48, stroke=0, fill=1)
        self.line("TENIR", 22, PAGE_H - 48, 33, bold=True, head=True,
                  color=NAVY, width=PAGE_W - 44)
        self.line(self.d["issue_date"], 22, PAGE_H - 31, 7.8,
                  bold=True, color=NAVY, width=PAGE_W - 44)
        self.line(self.d["tagline"], 22, PAGE_H - 66, 8.2, bold=True,
                  head=True, color=NAVY, width=PAGE_W - 44)
        c.setFillColor(NAVY)
        c.roundRect(18, PAGE_H * .48 + 10, 165, 17, 8, fill=1, stroke=0)
        self.line(self.d["cover_caption"], 23, PAGE_H * .48 + 15,
                  6.6, color=colors.white, width=155)
        y = PAGE_H * .48 - 23
        self.line(self.d["kicker_cover"], 25, y, 8, bold=True,
                  color=colors.HexColor("#e8a976"), width=PAGE_W - 50)
        y -= 27
        y = self.paragraph(self.d["cover_title"], y, 25, PAGE_W - 50,
                           size=31 if not self.rtl else 26, leading=36,
                           bold=True, head=True, color=colors.white, after=2)
        y = self.paragraph(self.d["cover_sub"], y, 25, PAGE_W - 50,
                           size=14 if not self.rtl else 15, leading=18,
                           bold=True, head=True, color=colors.HexColor("#e8a976"), after=17)
        for text, page in self.d["cover_teasers"]:
            self.c.setStrokeColor(colors.HexColor("#53647a"))
            self.c.line(25, y + 6, PAGE_W - 25, y + 6)
            self.line(text, 25, y - 4, 7.8 if not self.rtl else 9.2,
                      color=colors.white, width=PAGE_W - 50)
            y -= 22
        c.showPage()

    def page2(self):
        d = self.d
        y = self.start(d["sections"]["edito"])
        y = self.title(d["edito_title"], y)
        for text in d["edito_body"][:2]:
            y = self.paragraph(text, y)
        y = self.box("  ".join(d["edito_q"]), y, fill=PALE_COPPER,
                     size=10 if not self.rtl else 10.3)
        y = self.paragraph(d["edito_body"][2], y)
        y = self.paragraph(d["edito_sign"], y, bold=True, color=TEAL, after=8)
        y = self.subhead(d["web"]["toc_label"], y, size=11)
        rows = d["toc"]
        for i in range(0, len(rows), 2):
            left = f"{rows[i][0]}  {rows[i][1]}"
            right = f"{rows[i+1][0]}  {rows[i+1][1]}" if i + 1 < len(rows) else ""
            self.line(left, M, y, 7.3 if not self.rtl else 8.5,
                      width=CONTENT / 2 - 4)
            self.line(right, M + CONTENT / 2 + 5, y,
                      7.3 if not self.rtl else 8.5, width=CONTENT / 2 - 4)
            y -= 14
        self.finish(y)

    def page3(self):
        d = self.d
        y = self.start(d["sections"]["essentiel"])
        y = self.title(d["ess_title"], y)
        for kind, text in d["howto"]:
            y = self.paragraph(f"{d['tags'][kind]} : {text}", y,
                               size=7.8 if not self.rtl else 9.0, after=2)
        self.rule(y + 1)
        y -= 10
        for i, (kind, text) in enumerate(d["ess"], 1):
            y = self.step(i, d["tags"][kind], text, y,
                          size=8.4 if not self.rtl else 9.0, gap=3)
        y = self.box(d["ess_q"], y, fill=NAVY, color=colors.white,
                     title=d["ess_q_label"], size=9)
        self.finish(y)

    def page4(self):
        d = self.d
        y = self.start(d["sections"]["angle"])
        y = self.title(d["angle_title"], y)
        y = self.tagged("fact", d["angle_intro"], y)
        card_w = (CONTENT - 10) / 2
        card_h = 130
        for i, card in enumerate(d["cards"]):
            col = i % 2
            row = i // 2
            x = M + col * (card_w + 10)
            top = y - row * (card_h + 9)
            self.c.setFillColor(PALE)
            self.c.roundRect(x, top - card_h, card_w, card_h, 5, fill=1, stroke=0)
            yy = top - 14
            yy = self.paragraph(card[0], yy, x + 9, card_w - 18,
                                size=8.6, bold=True, color=TEAL, after=2)
            yy = self.paragraph(card[1], yy, x + 9, card_w - 18,
                                size=24 if not self.rtl else 20, leading=27,
                                bold=True, head=True, color=COPPER, after=1)
            yy = self.paragraph(card[2], yy, x + 9, card_w - 18,
                                size=8.5 if not self.rtl else 9, bold=True, after=3)
            yy = self.paragraph(card[3], yy, x + 9, card_w - 18,
                                size=8.1 if not self.rtl else 8.9, leading=10.3, after=3)
            self.paragraph(card[4], yy, x + 9, card_w - 18,
                           size=6.5 if not self.rtl else 7.3, leading=8.0,
                           color=MUTED, after=0)
        y -= card_h * 2 + 18
        y = self.box(d["angle_box"], y, fill=PALE_TEAL,
                     title=d["angle_box_title"], size=8.8)
        self.finish(y)

    def page5(self):
        d = self.d
        y = self.start(d["sections"]["angle"])
        y = self.title(d["lock_title"], y)
        y = self.tagged("think", d["lock_intro"], y)
        self.c.setStrokeColor(TEAL)
        self.c.line(M + 6, y - 9, RIGHT - 6, y - 9)
        y -= 18
        for label in d["path_labels"]:
            y = self.paragraph(label, y, size=8.0 if not self.rtl else 8.9,
                               color=TEAL, after=1)
        y -= 5
        for i, (title, text) in enumerate(d["locks"], 1):
            y = self.step(i, title, text, y,
                          size=8.7 if not self.rtl else 9.1, gap=4)
        y = self.box(d["lock_suggest"], y, fill=PALE_COPPER, size=8.7)
        self.finish(y)

    def page6(self):
        d = self.d
        y = self.start(d["sections"]["eau"])
        y = self.title(d["eau_title"], y)
        y = self.tagged("fact", d["eau_fact"], y)
        y = self.box(" • ".join(d["eau_needs"]), y, fill=PALE,
                     title=d["eau_need_title"], size=8.9)
        y = self.tagged("think", d["eau_think"], y)
        y = self.tagged("suggest", d["eau_suggest"], y)
        y = self.paragraph(d["sources"][0], y, size=7.2, color=MUTED,
                           link=d["sources_links"][0][0]["href"])
        self.finish(y)

    def page7(self):
        d = self.d
        y = self.start(d["sections"]["ports"])
        y = self.title(d["ports_title"], y)
        y = self.subhead(d["port_head"], y)
        y = self.tagged("fact", d["port_fact"], y, after=7)
        y = self.tagged("think", d["port_think"], y, after=7)
        y = self.subhead(d["train_head"], y)
        y = self.tagged("fact", d["train_fact"], y, after=7)
        y = self.tagged("think", d["train_think"], y, after=7)
        y = self.box(d["ports_ask"], y, fill=PALE, title=d["ports_ask_title"], size=8.6)
        self.finish(y)

    def page8(self):
        d = self.d
        y = self.start(d["sections"]["cdm"])
        y = self.title(d["cdm_title"], y)
        y = self.tag("fact", y)
        for text in d["cdm_fact"]:
            y = self.paragraph(text, y)
        duo_y = y - 64
        self.c.setFillColor(NAVY)
        self.c.roundRect(M, duo_y, CONTENT, 64, 5, fill=1, stroke=0)
        box_w = CONTENT / 2
        for i, (value, label) in enumerate(d["cdm_big"]):
            x = M + i * box_w + 10
            self.line(value, x, duo_y + 34, 23 if not self.rtl else 18,
                      bold=True, head=True,
                      color=colors.HexColor("#e8a976") if i == 0 else colors.white,
                      width=box_w - 20,
                      link=d["sources_links"][5][2 if i == 0 else 1]["href"])
            self.paragraph(label, duo_y + 22, x, box_w - 20,
                           size=7.7 if not self.rtl else 8.5,
                           leading=9.5, color=colors.white, after=0)
        y = duo_y - 13
        y = self.tagged("think", d["cdm_think"], y)
        self.finish(y)

    def page9(self):
        d = self.d
        y = self.start(d["sections"]["cdm"])
        y = self.title(d["cdm_prec_title"], y)
        y = self.tag("fact", y)
        for i, (title, where, text) in enumerate(d["cdm_prec"], 1):
            y = self.step(i, f"{title} · {where}", text, y,
                          size=8.1 if not self.rtl else 8.7, gap=3)
        y = self.box(d["cdm_prec_think"], y, fill=PALE_TEAL, size=8.5)
        self.finish(y)

    def page10(self):
        d = self.d
        y = self.start(d["sections"]["cdm"])
        y = self.title(d["cdm_ma_title"], y)
        y = self.tag("fact", y)
        for i, (title, text) in enumerate(d["cdm_ma_rows"]):
            y = self.paragraph(f"{title}. {text}", y,
                               size=8.7 if not self.rtl else 9.3,
                               leading=11.6 if not self.rtl else 12.7,
                               after=12,
                               link=d["sources_links"][5][9]["href"] if i == 2 else None)
        y -= 5
        y = self.tagged("think", d["cdm_ma_think"], y)
        y = self.box(" • ".join(d["cdm_ma_unknown"]), y,
                     fill=PALE_COPPER, title=d["cdm_ma_unknown_title"],
                     size=8.4)
        y = self.paragraph(d["cdm_ma_note"], y, size=7.4, color=MUTED)
        self.finish(y)

    def page11(self):
        d = self.d
        y = self.start(d["sections"]["cdm"])
        y = self.title(d["cdm_ch_title"], y)
        y = self.tagged("fact", d["cdm_ch_fact"], y)
        y = self.paragraph(d["sources_links"][5][12]["label"], y,
                           size=7.5, color=TEAL, after=7,
                           link=d["sources_links"][5][12]["href"])
        y = self.tag("suggest", y)
        for i, (title, text) in enumerate(d["cdm_ch"], 1):
            y = self.step(i, title, text, y,
                          size=8.4 if not self.rtl else 9.0, gap=3)
        y = self.box(d["cdm_ask"], y, fill=NAVY, color=colors.white,
                     title=d["cdm_ask_title"], size=8.6)
        self.finish(y)

    def page12(self):
        d = self.d
        y = self.start(d["sections"]["ia"])
        y = self.title(d["ia_title"], y)
        y = self.tagged("fact", d["ia_fact"], y)
        y = self.tagged("think", d["ia_think"], y)
        for i, (title, text) in enumerate(d["ia_qs"], 1):
            y = self.step(i, title, text, y,
                          size=8.9 if not self.rtl else 9.4, gap=5)
        y = self.box(d["ia_think2"], y, fill=PALE_TEAL, size=8.6)
        y = self.tagged("suggest", d["ia_suggest"], y)
        self.finish(y)

    def page13(self):
        d = self.d
        y = self.start(d["sections"]["cas"])
        y = self.title(d["cas_title"], y)
        y = self.tagged("fact", d["cas_fact"], y)
        duo_y = y - 63
        self.c.setFillColor(NAVY)
        self.c.roundRect(M, duo_y, CONTENT, 63, 5, fill=1, stroke=0)
        for i, item in enumerate([d["cas_a"], d["cas_b"]]):
            x = M + 8 + i * CONTENT / 2
            self.line(item[0], x, duo_y + 45, 7.6, color=colors.white,
                      width=CONTENT / 2 - 17)
            self.line(item[1], x, duo_y + 23, 19, bold=True, head=True,
                      color=colors.HexColor("#e8a976") if i == 0 else colors.white,
                      width=CONTENT / 2 - 17)
            self.line(item[2], x, duo_y + 10, 7.2, color=colors.white,
                      width=CONTENT / 2 - 17)
        y = duo_y - 10
        y = self.paragraph(d["cas_grant"], y, size=7.6, color=MUTED)
        y = self.tagged("think", d["cas_think"], y)
        col_w = (CONTENT - 12) / 2
        tops = []
        for i, (title, items) in enumerate([(d["cas_known_title"], d["cas_known"]),
                                           (d["cas_unknown_title"], d["cas_unknown"])]):
            x = M + i * (col_w + 12)
            yy = self.paragraph(title, y, x, col_w,
                                size=10.2 if not self.rtl else 10.5,
                                bold=True, head=True, after=3)
            for item in items:
                yy = self.paragraph("• " + item, yy, x, col_w,
                                    size=7.8 if not self.rtl else 8.5,
                                    leading=10.2 if not self.rtl else 11.4,
                                    after=4)
            tops.append(yy)
        y = min(tops) - 4
        y = self.paragraph(d["cas_note"], y, size=7.2, color=MUTED)
        self.finish(y)

    def page14(self):
        d = self.d
        y = self.start(d["sections"]["outil"])
        y = self.title(d["tool_title"], y)
        y = self.step(1, d["tool_q1"], d["tool_a1"], y,
                      size=8.8 if not self.rtl else 9.4, gap=6)
        y = self.box(d["tool_ex"], y, fill=PALE,
                     title=d["tool_ex_label"], size=8.7)
        y = self.step(2, d["tool_q2"], d["tool_a2"], y,
                      size=8.8 if not self.rtl else 9.4, gap=6)
        y = self.box(d["tool_nc"], y, fill=NAVY, color=colors.white,
                     title=d["tool_nc_label"], size=8.6)
        y = self.paragraph(d["tool_note"], y, size=7.6, color=MUTED)
        self.finish(y)

    def page15(self):
        d = self.d
        y = self.start(d["sections"]["quiz"])
        y = self.title(d["quiz_title"], y)
        for i, (question, _, __) in enumerate(d["quiz"], 1):
            y = self.paragraph(f"{i}. {question}", y,
                               size=8.4 if not self.rtl else 9.0,
                               leading=10.7 if not self.rtl else 12.2,
                               after=3)
        answers = " · ".join(f"{i} {x[1]} ({x[2]})" for i, x in enumerate(d["quiz"], 1))
        y = self.paragraph(f"{d['quiz_answers_label']}: {answers}", y,
                           size=7.7 if not self.rtl else 8.3, color=TEAL, after=8)
        y = self.subhead(d["src_title"], y, size=11)
        for i, text in enumerate(d["sources"]):
            href = d["sources_links"][i][1 if i == 5 else 0]["href"]
            y = self.paragraph(text, y, size=7.2 if not self.rtl else 8.1,
                               leading=9.4 if not self.rtl else 10.7,
                               after=2, link=href)
        y = self.paragraph(d["src_note"], y, size=7.0 if not self.rtl else 7.7,
                           leading=9.0 if not self.rtl else 10.1,
                           color=MUTED, link="https://tenirlabs.cc/n01")
        self.finish(y)

    def page16(self):
        d = self.d
        self.c.setFillColor(PALE)
        self.c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
        y = self.start(d["sections"]["vous"])
        y = self.title(d["back_title"], y, size=20 if not self.rtl else 19)
        for question, options in d["back_qs"]:
            y = self.subhead(question, y, size=10.5 if not self.rtl else 10.8)
            y = self.choices(options, y)
        qr_size = 95
        box_y = y - 109
        self.c.setFillColor(colors.white)
        self.c.roundRect(M, box_y, CONTENT, 109, 5, stroke=0, fill=1)
        target = f"https://tenirlabs.cc/magazine/avis/?n=01&l={self.lang}&s=papier"
        qr = QrCodeWidget(target, barWidth=qr_size, barHeight=qr_size, barBorder=2)
        drawing = Drawing(qr_size, qr_size)
        drawing.add(qr)
        qr_x = RIGHT - 109 if self.rtl else M + 9
        renderPDF.draw(drawing, self.c, qr_x, box_y + 7)
        self.c.linkURL(target, (qr_x, box_y + 7, qr_x + qr_size, box_y + 102), relative=0)
        text_x = M + 12 if self.rtl else M + 114
        text_w = CONTENT - 125
        yy = box_y + 76
        yy = self.paragraph(d["back_cta"], yy, text_x, text_w,
                            size=12 if not self.rtl else 11.5,
                            bold=True, head=True, after=5)
        yy = self.paragraph(d["back_link"], yy, text_x, text_w,
                            size=8.3, color=TEAL, after=2,
                            link="https://tenirlabs.cc/n01")
        self.paragraph(target, yy, text_x, text_w, size=6.3, color=MUTED,
                       leading=8, after=0, link=target)
        y = box_y - 11
        y = self.box(d["back_suggest"], y, fill=PALE_COPPER,
                     size=8.6 if not self.rtl else 9.2,
                     link="https://tenirlabs.cc/n01")
        y = self.paragraph(d["back_legal"], y,
                           size=7.2 if not self.rtl else 8.0,
                           leading=9.6 if not self.rtl else 10.6,
                           color=MUTED)
        self.finish(y)

    def build(self):
        self.cover()
        for n in range(2, 17):
            getattr(self, f"page{n}")()
        self.c.save()
        return self.path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out-dir", type=Path,
                        default=ROOT / "public/magazine/n01")
    parser.add_argument("langs", nargs="*", choices=["fr", "en", "ar"])
    args = parser.parse_args()
    register_fonts()
    for lang in args.langs or ["fr", "en", "ar"]:
        print(Edition(lang, args.out_dir).build())


if __name__ == "__main__":
    main()
