/**
 * Genera `public/og.png`: la imagen que muestran LinkedIn, WhatsApp, Slack o
 * el correo al compartir el enlace (Open Graph, 1200×630).
 *
 * El fondo (`background.webp`) es una imagen generada SIN cara ni texto a
 * propósito: los generadores reinventan la cara y escriben mal los acentos.
 * Aquí se compone encima la foto real (`public/dayle-avatar.jpg`) dentro del
 * círculo y el texto exacto.
 *
 *   node scripts/og/build-og.mjs
 *
 * Si cambia el fondo, recolocá CIRCLE: es el centro y el radio del anillo
 * blanco medidos sobre la imagen original.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const W = 1200;
const H = 630;

/* Anillo blanco del fondo original (1733×907). */
const SOURCE = { width: 1733, height: 907 };
const CIRCLE = { x: 317, y: 396, r: 148 };

/* `fit: cover` escala por el lado que más pide y recorta el sobrante. */
const scale = Math.max(W / SOURCE.width, H / SOURCE.height);
const cropX = (SOURCE.width * scale - W) / 2;
const cropY = (SOURCE.height * scale - H) / 2;
const cx = CIRCLE.x * scale - cropX;
const cy = CIRCLE.y * scale - cropY;
/* Un poco por dentro del anillo, para que el trazo blanco quede visible. */
const d = Math.round(CIRCLE.r * scale * 2 - 8);

const avatarMask = Buffer.from(
  `<svg width="${d}" height="${d}"><circle cx="${d / 2}" cy="${d / 2}" r="${d / 2}" fill="#fff"/></svg>`,
);
const avatar = await sharp(join(root, "public", "dayle-avatar.jpg"))
  .resize(d, d)
  .composite([{ input: avatarMask, blend: "dest-in" }])
  .png()
  .toBuffer();

/* Texto: la misma jerarquía que la columna fija del sitio. La fuente es la del
   sistema (librsvg no lee woff2); en Windows sale Segoe UI y Consolas. */
const TEXT_X = 412;
const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name { font: 600 52px "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #e8eef1; letter-spacing: -0.5px; }
    .role { font: 500 28px "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #52a5cd; }
    .mono { font: 400 19px Consolas, "SF Mono", Menlo, monospace; fill: #95a3ab; }
  </style>
  <text x="${TEXT_X}" y="262" class="name">Daylé García Fernández</text>
  <text x="${TEXT_X}" y="308" class="role">Software Engineer</text>
  <text x="${TEXT_X}" y="352" class="mono">Java · Spring Boot · PostgreSQL · NestJS</text>
  <text x="${Math.round(cx - d / 2)}" y="${H - 52}" class="mono">dageus15.github.io</text>
</svg>`);

await sharp(join(root, "scripts", "og", "background.webp"))
  .resize(W, H, { fit: "cover" })
  .composite([
    { input: avatar, left: Math.round(cx - d / 2), top: Math.round(cy - d / 2) },
    { input: text, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9, palette: false })
  .toFile(join(root, "public", "og.png"));

console.log("public/og.png", W, "x", H);
