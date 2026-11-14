"""Verify the committed TENIR N°01 PDF release artifacts.

This check is intentionally cross-platform and runs after generation on the
Windows runner. It verifies page count, metadata titles, quiz labels and the
SHA256 manifest. Visual spacing still requires human review of rendered pages.
"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
PDF_DIR = ROOT / "public/magazine/n01"
DATA = json.loads((ROOT / "src/data/magazine/n01.json").read_text(encoding="utf-8"))

EXPECTED = {
    "fr": {"file": "TENIR-N01-FR.pdf", "label": "Réponses (pages) — à lire en retournant la page"},
    "en": {"file": "TENIR-N01-EN.pdf", "label": "Answers (pages) — turn the page to read"},
    "ar": {"file": "TENIR-N01-AR.pdf", "label": "الأجوبة (الصفحات) — اقلب الصفحة لقراءتها"},
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    manifest = (PDF_DIR / "SHA256SUMS.txt").read_text(encoding="utf-8") if (PDF_DIR / "SHA256SUMS.txt").exists() else ""
    manifest_map = {}
    for line in manifest.splitlines():
        parts = line.split()
        if len(parts) == 2 and not parts[0].startswith("#"):
            manifest_map[parts[1]] = parts[0]

    for lang, item in EXPECTED.items():
        pdf = PDF_DIR / item["file"]
        if not pdf.exists():
            raise SystemExit(f"Missing PDF: {pdf}")
        reader = PdfReader(str(pdf))
        if len(reader.pages) != 16:
            raise SystemExit(f"{item['file']}: expected 16 pages, got {len(reader.pages)}")
        metadata = reader.metadata or {}
        expected_title = DATA[lang]["web"]["doc_title"]
        if metadata.title != expected_title:
            raise SystemExit(f"{item['file']}: title mismatch: {metadata.title!r} != {expected_title!r}")
        page_text = "\n".join((page.extract_text() or "") for page in reader.pages)
        if item["label"] not in page_text:
            raise SystemExit(f"{item['file']}: updated quiz label is missing")
        actual_sha = sha256(pdf)
        if manifest_map.get(item["file"]) != actual_sha:
            raise SystemExit(f"{item['file']}: SHA256SUMS.txt is stale")
        print(f"PASS {item['file']}: 16 pages, title, quiz label and SHA256 verified")


if __name__ == "__main__":
    main()
