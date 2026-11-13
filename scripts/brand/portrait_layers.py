"""Prepara el retrato de cabeza y hombros y la máscara del filo.

    python scripts/brand/portrait_layers.py <retrato>

El retrato debe estar encuadrado, con espacio alrededor de la cabeza. Un PNG
con alfa conserva su recorte. Una foto opaca se recorta con BiRefNet (requiere
rembg[cpu]). Las capas intermedias quedan fuera de git.
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter, ImageOps

OUT = Path(__file__).parent / ".portrait"
WORK_WIDTH = 1440


def prepare(src_path):
    with Image.open(src_path) as source:
        photo = ImageOps.exif_transpose(source).convert("RGBA")
    photo.thumbnail((WORK_WIDTH, WORK_WIDTH), Image.Resampling.LANCZOS)

    alpha = photo.getchannel("A")
    if alpha.getextrema() == (255, 255):
        from rembg import new_session, remove

        photo = remove(photo, session=new_session("birefnet-portrait"), post_process_mask=True)
        alpha = photo.getchannel("A")

    # Una banda nítida y otra más difusa, ambas del lado interior.
    silhouette = alpha.point(lambda value: 255 if value >= 128 else 0)
    band = ImageChops.subtract(silhouette, silhouette.filter(ImageFilter.MinFilter(7)))
    glow = ImageChops.subtract(silhouette, silhouette.filter(ImageFilter.MinFilter(19)))
    band = band.filter(ImageFilter.GaussianBlur(1.6))
    glow = glow.filter(ImageFilter.GaussianBlur(5)).point(lambda value: value // 2)

    rim = Image.new("RGBA", photo.size, "white")
    rim.putalpha(ImageChops.lighter(band, glow))
    OUT.mkdir(exist_ok=True)
    photo.save(OUT / "photo.png")
    rim.save(OUT / "rim.png")
    print(f"Capas en {OUT} ({photo.width}×{photo.height})")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Uso: python scripts/brand/portrait_layers.py <retrato>")
    prepare(sys.argv[1])
