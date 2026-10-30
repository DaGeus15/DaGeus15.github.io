/**
 * Variantes WebP del retrato de la portada.
 *
 *   npm run portrait
 *
 * Lee las cuatro capas de `scripts/brand/.portrait/` (persona + pared que se
 * apaga, y el filo, cada una en claro y en oscuro) y las deja con alfa en
 * `public/assets/images/portrait/`, a 1008 y 2016 px de ancho. Fotos a
 * calidad 82, filos a 90. Escribe las rutas y los píxeles reales en
 * `src/content/portrait.js`. La foto ya trae el halo transparente: no hace
 * falta un marcador borroso debajo.
 *
 * Si faltan las capas, hay que generarlas antes (ver la cabecera de
 * `portrait_layers.py`); este script no las calcula.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const layerDir = join(root, "scripts", "brand", ".portrait");
const outDir = join(root, "public", "assets", "images", "portrait");
const WIDTHS = [1008, 2016];
const THEMES = ["dark", "light"];
const PHOTO_QUALITY = 82;
const RIM_QUALITY = 90;

const missing = [];
for (const theme of THEMES) {
  for (const kind of ["photo", "rim"]) {
    const name = `${kind}-${theme}.png`;
    if (!existsSync(join(layerDir, name))) missing.push(name);
  }
}
if (missing.length) {
  console.error(
    `Faltan capas en scripts/brand/.portrait/: ${missing.join(", ")}.\n` +
      `Generálas desde la foto original (no se sube):\n` +
      `  python scripts/brand/portrait_layers.py "D:/Documentos/Fotos mias/29.Daile.jpg"`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

/** WebP con alfa, al ancho pedido. Devuelve píxeles reales y el buffer. */
async function variant(input, width, quality) {
  const { data, info } = await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

const portrait = { w: 0, h: 0, photo: {}, rim: {} };
const written = new Set();
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

for (const theme of THEMES) {
  const photoSrc = join(layerDir, `photo-${theme}.png`);
  const rimSrc = join(layerDir, `rim-${theme}.png`);
  const photos = [];
  const rims = [];

  for (const width of WIDTHS) {
    const photo = await variant(photoSrc, width, PHOTO_QUALITY);
    const photoName = `photo-${theme}-${photo.w}.webp`;
    writeFileSync(join(outDir, photoName), photo.data);
    written.add(photoName);
    photos.push({ src: `/assets/images/portrait/${photoName}`, w: photo.w, h: photo.h });
    console.log(`${photoName}  ${photo.w}×${photo.h}  ${kb(photo.data.length)}`);

    const rim = await variant(rimSrc, width, RIM_QUALITY);
    const rimName = `rim-${theme}-${rim.w}.webp`;
    writeFileSync(join(outDir, rimName), rim.data);
    written.add(rimName);
    rims.push({ src: `/assets/images/portrait/${rimName}`, w: rim.w, h: rim.h });
    console.log(`${rimName}  ${rim.w}×${rim.h}  ${kb(rim.data.length)}`);

    if (width === WIDTHS[WIDTHS.length - 1]) {
      portrait.w = photo.w;
      portrait.h = photo.h;
    }
  }

  portrait.photo[theme] = photos;
  portrait.rim[theme] = rims;
}

for (const file of readdirSync(outDir)) {
  if (!file.endsWith(".webp") || written.has(file)) continue;
  unlinkSync(join(outDir, file));
  console.log(`borra ${file}`);
}

const modulePath = join(root, "src", "content", "portrait.js");
writeFileSync(
  modulePath,
  `/* generado por npm run portrait, no editar */\nexport const portrait = ${JSON.stringify(portrait, null, 2)};\n\nexport default portrait;\n`,
);
console.log("src/content/portrait.js");
