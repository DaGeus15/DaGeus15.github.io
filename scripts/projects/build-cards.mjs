/**
 * Variantes pequeñas de las capturas que salen en las tarjetas de la portada.
 *
 *   npm run cards
 *
 * Una captura de teléfono se pinta a ~150px y su archivo mide 650. Parte del
 * WebP que ya existe (no necesita los informes): córrelo después de
 * `npm run shots`. Escribe `<id>-sm.webp` junto al original y el índice
 * `src/content/cardShots.js`, que usa `Frame.jsx`. Si una captura ya es casi
 * de ese tamaño, no se genera: no ahorraría nada.
 */
import sharp from "sharp";
import { statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import projects from "../../src/content/projects.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const QUALITY = 82;
const SMALL = 400; // teléfonos e insertos: ~2x de lo que se pinta
const MEDIUM = 800; // ventanas: ~2x del ancho en un teléfono

const targets = new Map();
for (const { cover, inset } of projects) {
  targets.set(cover.src, { shot: cover, width: cover.mobile ? SMALL : MEDIUM });
  if (inset) targets.set(inset.src, { shot: inset, width: SMALL });
}

const index = {};
let saved = 0;
for (const { shot, width } of targets.values()) {
  if (shot.w < width * 1.2) continue;
  const input = join(root, "public", shot.src);
  const src = shot.src.replace(/\.webp$/, "-sm.webp");
  const { size } = await sharp(input)
    .resize({ width })
    .webp({ quality: QUALITY })
    .toFile(join(root, "public", src));
  const original = statSync(input).size;
  index[shot.src] = { src, w: width };
  saved += original - size;
  console.log(`${src}  ${Math.round(original / 1024)} KB → ${Math.round(size / 1024)} KB`);
}

const body = `/* generado por npm run cards, no editar */
export const cardShots = ${JSON.stringify(index, null, 2)};

export default cardShots;
`;
writeFileSync(join(root, "src", "content", "cardShots.js"), body);
console.log(`${Object.keys(index).length} variantes, ${Math.round(saved / 1024)} KB menos si se usan todas`);
