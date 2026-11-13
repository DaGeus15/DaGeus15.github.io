/**
 * npm run portrait
 *
 * Genera las variantes responsivas y la máscara del filo, compartidas por
 * los dos temas. Las capas de origen se preparan con portrait_layers.py.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const layerDir = join(root, "scripts", "brand", ".portrait");
const assetPath = "/assets/images/portrait";
const outDir = join(root, "public", assetPath);
const widths = [384, 640, 832, 1088, 1440];
const photoSource = join(layerDir, "photo.png");
const rimSource = join(layerDir, "rim.png");

if (!existsSync(photoSource) || !existsSync(rimSource)) {
  console.error("Generá las capas con python scripts/brand/portrait_layers.py <retrato>.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const { width: w, height: h } = await sharp(photoSource).metadata();
const photo = [];
for (const width of [...new Set(widths.map((size) => Math.min(size, w)))]) {
  const name = `bust-${width}.webp`;
  const info = await sharp(photoSource)
    .resize({ width })
    .webp({ quality: 82 })
    .toFile(join(outDir, name));
  photo.push({ src: `${assetPath}/${name}`, w: info.width });
  console.log(`${name}: ${info.width}×${info.height}, ${info.size} B`);
}

const rimName = "bust-rim.webp";
const rim = await sharp(rimSource)
  .resize({ width: 896, withoutEnlargement: true })
  .webp({ quality: 75 })
  .toFile(join(outDir, rimName));
console.log(`${rimName}: ${rim.width}×${rim.height}, ${rim.size} B`);

const portrait = { w, h, photo, rim: `${assetPath}/${rimName}` };
writeFileSync(
  join(root, "src", "content", "portrait.js"),
  `/* generado por npm run portrait, no editar */\nexport const portrait = ${JSON.stringify(portrait, null, 2)};\n\nexport default portrait;\n`,
);
