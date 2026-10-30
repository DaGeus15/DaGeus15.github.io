/**
 * Variantes WebP del retrato, para la portada.
 *
 *   npm run portrait
 *
 * `public/dayle.jpeg` (480×660) sale a 480 px de ancho, o a su ancho real si
 * es menor: no se amplía. `public/dayle-avatar.jpg` sale a 160 y 320 px, para
 * el recorte de móvil. Calidad 82.
 *
 * El marcador borroso es una versión de ~16 px en WebP, como data URI. Hay
 * dos, uno por recorte (cuerpo entero y cara): el de la cara no sirve de
 * fondo para el otro. Los escribe en `src/content/portrait.js`.
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outDir = join(root, "public", "assets", "images", "portrait");
const QUALITY = 82;

mkdirSync(outDir, { recursive: true });

/** WebP al ancho pedido, sin pasar del original. Devuelve píxeles reales. */
async function variant(input, width) {
  const meta = await sharp(input).metadata();
  const target = Math.min(width, meta.width);
  const { data, info } = await sharp(input)
    .resize({ width: target, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/** Data URI de ~16 px: el hueco de la ficha tiene color antes de que llegue la foto. */
async function blurDataUri(input) {
  const { data, info } = await sharp(input)
    .resize({ width: 16, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer({ resolveWithObject: true });
  return {
    src: `data:image/webp;base64,${data.toString("base64")}`,
    w: info.width,
    h: info.height,
  };
}

const jpeg = join(root, "public", "dayle.jpeg");
const avatar = join(root, "public", "dayle-avatar.jpg");

const fullFile = await variant(jpeg, 480);
const fullName = `dayle-${fullFile.w}.webp`;
writeFileSync(join(outDir, fullName), fullFile.data);

const avatarFiles = [];
for (const width of [160, 320]) {
  const file = await variant(avatar, width);
  const name = `avatar-${file.w}.webp`;
  writeFileSync(join(outDir, name), file.data);
  avatarFiles.push({
    src: `/assets/images/portrait/${name}`,
    w: file.w,
    h: file.h,
  });
}

const portrait = {
  full: {
    src: `/assets/images/portrait/${fullName}`,
    w: fullFile.w,
    h: fullFile.h,
  },
  avatar: avatarFiles,
  blur: await blurDataUri(jpeg),
  avatarBlur: await blurDataUri(avatar),
};

const modulePath = join(root, "src", "content", "portrait.js");
writeFileSync(
  modulePath,
  `/* generado por npm run portrait, no editar */\nexport const portrait = ${JSON.stringify(portrait, null, 2)};\n\nexport default portrait;\n`,
);

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
console.log(`${fullName}  ${fullFile.w}×${fullFile.h}  ${kb(fullFile.data.length)}`);
for (const file of avatarFiles) {
  console.log(`${file.src}  ${file.w}×${file.h}`);
}
console.log(`blur ${portrait.blur.w}×${portrait.blur.h}, avatarBlur ${portrait.avatarBlur.w}×${portrait.avatarBlur.h}`);
console.log("src/content/portrait.js");
