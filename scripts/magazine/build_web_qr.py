"""Build the issue 01 feedback QR codes used by the web edition."""

from pathlib import Path

from reportlab.graphics.barcode.qr import QrCodeWidget


ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / "public" / "magazine" / "n01"


def main() -> None:
    for lang in ("fr", "en", "ar"):
        target = f"https://tenirlabs.cc/magazine/avis/?n=01&l={lang}&s=web"
        qr = QrCodeWidget(target)
        qr.qr.make()
        modules = qr.qr.modules
        border = 4  # Quiet zone, in modules.
        side = len(modules) + 2 * border
        runs = []
        for y, row in enumerate(modules, border):
            x = 0
            while x < len(row):
                if row[x]:
                    start = x
                    while x < len(row) and row[x]:
                        x += 1
                    runs.append(f"M{start + border} {y}h{x - start}v1h-{x - start}z")
                else:
                    x += 1
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" '
            f'viewBox="0 0 {side} {side}">'
            f'<rect width="{side}" height="{side}" fill="#fff"/>'
            f'<path fill="#102747" d="{" ".join(runs)}"/>'
            "</svg>\n"
        )
        (DEST / f"qr-avis-{lang}.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    main()
