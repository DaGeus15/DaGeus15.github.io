/**
 * Genera el icono de la pestaña (`src/app/icon.png`) y el de iOS
 * (`src/app/apple-icon.png`): el monograma "DG" en el acento sobre el lienzo
 * oscuro del sitio.
 *
 *   npm run icons
 *
 * PNG y no SVG a propósito: un SVG con texto se dibuja con la fuente de cada
 * sistema y el monograma cambiaría de forma entre Windows, Mac y Android. Se
 * dibuja a 512px y se reduce, para que a 16-32px siga nítido.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const S = 512;

const svg = Buffer.from(`
<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="8" width="${S - 16}" height="${S - 16}" rx="116" fill="#0a0e11"
        stroke="#52a5cd" stroke-opacity="0.45" stroke-width="12"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-weight="700"
        font-size="236" letter-spacing="-10" fill="#52a5cd">DG</text>
</svg>`);

const base = await sharp(svg).png().toBuffer();

await sharp(base).resize(192, 192).png().toFile(join(root, "src", "app", "icon.png"));
/* iOS pone sus propias esquinas redondeadas: aquí el fondo va a sangre. */
await sharp(base)
  .flatten({ background: "#0a0e11" })
  .resize(180, 180)
  .png()
  .toFile(join(root, "src", "app", "apple-icon.png"));

console.log("src/app/icon.png, src/app/apple-icon.png");
