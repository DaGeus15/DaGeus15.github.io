/**
 * Convierte las capturas extraídas de los documentos en WebP para la web.
 *
 *   node scripts/projects/build-shots.mjs
 *
 * Web: ancho máximo 1600px. Móvil: alto máximo 1400px. Calidad 82.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SOURCE_ROOT } from "./source-map.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// [proyecto, origen (relativo a SOURCE_ROOT), salida, "web" | "mobile", opciones]
// opciones.cropTop: px de barra del navegador a quitar (en px de origen).
// opciones.blur: zonas [left, top, width, height] a difuminar (correos y nombres de compañeros).
// opciones.face: tapa una cámara con una persona. Difumina el recuadro del video
//   (`rect` [left, top, width, height], esquinas `radius`) hasta que no se
//   reconozca a nadie y vuelve a dibujar encima el óvalo guía (`oval`
//   [cx, cy, rx, ry]) con su anillo de progreso, que es lo que explica la captura.
// opciones.crop: recorte final [left, top, width, height] (en px de origen), para
//   una portada que enseñe lo importante y no la cabecera de la página.
const SHOTS = [
  ["kaphiy", "kaphiy/p13_205_739x1600.jpeg", "pwa-chat", "mobile"],
  ["kaphiy", "kaphiy/p14_213_594x841.png", "kitchen-display", "mobile"],
  ["kaphiy", "kaphiy/p15_220_1115x517.png", "tests", "web"],

  ["gasoline", "gasoline/p22_131_1126x652.png", "vehicles", "web", { blur: [[8, 490, 200, 36]] }],
  ["gasoline", "gasoline/p23_137_1126x664.jpeg", "routes", "web", { blur: [[8, 492, 200, 36]] }],
  ["gasoline", "gasoline/p25_145_1129x926.jpeg", "fuel", "web", { blur: [[8, 458, 200, 36]] }],
  ["gasoline", "gasoline/p19_113_1126x539.jpeg", "login", "web"],

  ["contable", "contable/p19_94_940x450.png", "journal-entries", "web"],
  ["contable", "contable/p20_97_790x517.png", "entry-detail", "web", { blur: [[4, 428, 260, 30]] }],
  ["contable", "contable/p20_98_942x797.png", "new-entry", "web"],
  ["contable", "contable/p21_104_946x490.png", "period-detail", "web"],
  ["contable", "contable/p22_107_942x442.jpeg", "general-journal", "web"],
  ["contable", "contable/p24_116_852x426.jpeg", "general-ledger", "web"],
  ["contable", "contable/p25_120_1097x528.jpeg", "trial-balance", "web"],
  ["contable", "contable/p26_126_907x455.jpeg", "income-statement", "web"],
  ["contable", "contable/p28_134_937x542.png", "chart-of-accounts", "web"],
  ["contable", "contable/p28_135_652x627.png", "new-account", "web"],
  ["contable", "contable/p29_139_617x630.png", "receivable-detail", "web"],

  ["booking", "booking/p10_76_944x494.jpeg", "home", "web", { cropTop: 22 }],
  ["booking", "booking/p09_62_944x496.jpeg", "property", "web", { cropTop: 22 }],
  ["booking", "booking/p13_108_944x496.jpeg", "admin-dashboard", "web", { cropTop: 22 }],
  ["booking", "booking/p17_138_340x755.jpeg", "mobile-booking", "mobile"],
  ["booking", "booking/p18_160_341x757.jpeg", "mobile-payment", "mobile"],

  // Fiado: sólo el flujo biométrico. El nombre del compañero en la barra, difuminado.
  ["fiado", "fiado/p20_157_866x758.jpeg", "liveness", "web", {
    blur: [[762, 24, 66, 22]],
    face: { rect: [249, 359, 373, 257], radius: 18, oval: [433, 488, 80, 88] },
  }],
  ["fiado", "fiado/p20_157_866x758.jpeg", "liveness-focus", "web", {
    face: { rect: [249, 359, 373, 257], radius: 18, oval: [433, 488, 80, 88] },
    crop: [229, 236, 413, 400],
  }],
  ["fiado", "fiado/p20_154_866x646.jpeg", "identity-document", "web", { blur: [[762, 24, 66, 22]] }],
  ["fiado", "fiado/p21_167_865x508.jpeg", "identity-confirmed", "web", { blur: [[756, 23, 64, 22]] }],
  ["fiado", "fiado/p03_51_944x475.jpeg", "home", "web", { cropTop: 28 }],
  ["fiado", "fiado/p11_102_787x800.png", "biometric-step", "web", { blur: [[668, 21, 84, 22]] }],
  ["fiado", "fiado/p13_110_865x613.png", "biometric-verified", "web", { blur: [[734, 21, 94, 22]] }],

  ["safetrade", "techstore/word/media/image19.png", "home", "web", { cropTop: 40 }],
  ["safetrade", "techstore/word/media/image20.png", "catalog", "web", { cropTop: 40 }],
  ["safetrade", "techstore/word/media/image22.jpeg", "mobile-product", "mobile"],
  ["safetrade", "techstore/word/media/image17.png", "azure-resources", "web"],
];

/** El recuadro de la cámara, difuminado, con el óvalo guía y su anillo redibujados. */
async function faceCover(path, { rect: [left, top, width, height], radius, oval: [ox, oy, rx, ry] }) {
  const cx = ox - left;
  const cy = oy - top;
  const point = (a) => [cx + (rx + 12) * Math.cos((a * Math.PI) / 180), cy + (ry + 12) * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = point(-75);
  const [x1, y1] = point(105);
  const guide = Buffer.from(
    `<svg width="${width}" height="${height}">` +
      `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="rgb(40,96,92)" stroke-opacity=".9" stroke-width="4"/>` +
      `<path d="M${x0} ${y0} A${rx + 12} ${ry + 12} 0 0 1 ${x1} ${y1}" fill="none" stroke="rgb(38,178,140)" stroke-width="4" stroke-linecap="round"/>` +
      `</svg>`,
  );
  const corners = Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`);
  const input = await sharp(path)
    .extract({ left, top, width, height })
    .blur(32)
    .composite([{ input: guide }, { input: corners, blend: "dest-in" }])
    .png()
    .toBuffer();
  return { input, left, top };
}

for (const [project, src, name, kind, opts = {}] of SHOTS) {
  const outDir = join(root, "public", "assets", "projects", project);
  mkdirSync(outDir, { recursive: true });
  const path = join(SOURCE_ROOT, src);
  const meta = await sharp(path).metadata();
  const blurs = [];
  for (const [left, top, width, height] of opts.blur ?? []) {
    const input = await sharp(path).extract({ left, top, width, height }).blur(12).toBuffer();
    blurs.push({ input, left, top });
  }
  if (opts.face) blurs.push(await faceCover(path, opts.face));
  let base = await sharp(path).composite(blurs).toBuffer();
  if (opts.cropTop) {
    base = await sharp(base).extract({ left: 0, top: opts.cropTop, width: meta.width, height: meta.height - opts.cropTop }).toBuffer();
  }
  if (opts.crop) {
    const [left, top, width, height] = opts.crop;
    base = await sharp(base).extract({ left, top: top - (opts.cropTop ?? 0), width, height }).toBuffer();
  }
  const img = sharp(base);
  const resized = kind === "mobile"
    ? img.resize({ height: 1400, withoutEnlargement: true })
    : img.resize({ width: 1600, withoutEnlargement: true });
  const info = await resized.webp({ quality: 82 }).toFile(join(outDir, `${name}.webp`));
  console.log(`${project}/${name}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
