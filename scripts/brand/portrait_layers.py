"""
Capas del retrato de la portada, desde la foto original.

    python scripts/brand/portrait_layers.py "D:/Documentos/Fotos mias/29.Daile.jpg"

Paso único y local: necesita Python con `rembg[cpu]`, `scipy` y `pillow`
(en un entorno aparte; no son dependencias del sitio). La foto original no
se sube: sólo las variantes que genera después `npm run portrait`.

Deja en `scripts/brand/.portrait/` (ignorado por git), a 2016 px de ancho:

  photo-dark.png, photo-light.png
      La persona intacta sobre su pared, con alfa. Junto a ella la pared
      conserva su color; con la distancia a la silueta se vuelve
      transparente y deja ver la página (su grano y su resplandor). A los lados la pared se prolonga (difuminada)
      para que el degradado tenga sitio. En claro el halo es más corto y
      tenue: la pared gris sobre el papel se leía como neblina.
  rim-dark.png, rim-light.png
      El filo de la silueta (banda nítida + halo) con alfa: latón en oscuro,
      blanco cálido en claro (el bronce sobre la pared se veía café).

El recorte de la persona lo hace BiRefNet (`birefnet-portrait`): el pelo
sale limpio. Se trabaja a 1400 px de ancho de foto.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy.ndimage import distance_transform_edt, gaussian_filter, grey_erosion

OUT = Path(__file__).parent / ".portrait"
CROP_BOTTOM = 0.74      # de la cabeza a la cintura (fracción del alto original)
WORK = 1400             # ancho de trabajo de la foto
THEMES = ("dark", "light")
RIM = {"dark": (240, 206, 150), "light": (255, 248, 236)}


def ss(t):
    c = np.clip(t, 0, 1)
    return c * c * (3 - 2 * c)


def blur3(a, s):
    return np.stack([gaussian_filter(a[..., c], s) for c in range(3)], -1)


def main(src_path):
    OUT.mkdir(exist_ok=True)
    src = Image.open(src_path).convert("RGB")
    crop = src.crop((0, 0, src.width, int(src.height * CROP_BOTTOM)))
    crop = crop.resize((WORK, round(crop.height * WORK / crop.width)), Image.LANCZOS)
    cut = remove(crop, session=new_session("birefnet-portrait"), post_process_mask=True)

    orig = np.asarray(crop).astype(np.float32)
    alpha = np.asarray(cut.getchannel("A")).astype(np.float32) / 255
    H, W = alpha.shape
    M = int(W * 0.22)                       # pared prolongada a cada lado

    # Pared sola: la persona se rellena con la pared de alrededor.
    wm = (alpha < 0.05).astype(np.float32)
    wall_only = blur3(orig * wm[..., None], 40) / np.maximum(gaussian_filter(wm, 40), 1e-4)[..., None]
    wall_only = orig * wm[..., None] + wall_only * (1 - wm[..., None])
    big = blur3(np.pad(wall_only, ((0, 0), (M, M), (0, 0)), mode="edge"), 90)

    WW = W + 2 * M
    yy, xx = np.mgrid[0:H, 0:WW]
    dx = np.minimum(xx - M, M + W - 1 - xx)
    inner = ss(dx / 80) * (dx >= 0)         # de la foto real a la pared prolongada
    photo = np.zeros((H, WW, 3), np.float32)
    photo[:, M:M + W] = orig
    A = np.zeros((H, WW), np.float32)
    A[:, M:M + W] = alpha
    scene_wall = photo * inner[..., None] + big * (1 - inner[..., None])

    dist = distance_transform_edt(A < 0.5)
    keep = {
        "dark": (1 - ss(dist / (W * 0.42))) * ss(np.minimum(xx, WW - 1 - xx) / (W * 0.12)) * ss(yy / (H * 0.16)),
        "light": (1 - ss(dist / (W * 0.22))) * inner * ss(yy / (H * 0.12)) * 0.85,
    }
    # Con alfa, no con el color del fondo horneado: la página tiene grano y
    # un resplandor arriba, y un fondo plano dejaría ver el rectángulo.
    for theme in THEMES:
        wall_a = (1 - A) * keep[theme]
        total = A + wall_a
        rgb = (photo * A[..., None] + scene_wall * wall_a[..., None]) / np.maximum(total, 1e-4)[..., None]
        out = np.dstack([rgb, total * 255]).clip(0, 255).astype(np.uint8)
        Image.fromarray(out, "RGBA").save(OUT / f"photo-{theme}.png")

    # Filo: desde el alfa suavizado, para que no salga escalonado.
    a = gaussian_filter(A, 1.2)
    a = gaussian_filter((a > 0.5).astype(np.float32), 1.1)
    band = gaussian_filter(np.clip(a - grey_erosion(a, size=(7, 7)), 0, 1), 1.4)
    glow = gaussian_filter(np.clip(a - grey_erosion(a, size=(31, 31)), 0, 1), 12) * 0.5
    rim = np.clip(np.maximum(band * 1.8, glow), 0, 1)
    for theme, rgb in RIM.items():
        boost = 1.15 if theme == "light" else 1.0
        out = np.zeros((H, WW, 4), np.uint8)
        out[..., :3] = rgb
        out[..., 3] = (np.clip(rim * boost, 0, 1) * 255).astype(np.uint8)
        Image.fromarray(out, "RGBA").save(OUT / f"rim-{theme}.png")
    print(f"capas en {OUT} ({WW}x{H})")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("uso: python scripts/brand/portrait_layers.py <foto original>")
    main(sys.argv[1])
