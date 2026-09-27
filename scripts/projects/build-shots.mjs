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

  ["safetrade", "techstore/word/media/image19.png", "home", "web", { cropTop: 40 }],
  ["safetrade", "techstore/word/media/image20.png", "catalog", "web", { cropTop: 40 }],
  ["safetrade", "techstore/word/media/image22.jpeg", "mobile-product", "mobile"],
  ["safetrade", "techstore/word/media/image17.png", "azure-resources", "web"],
];

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
  let base = await sharp(path).composite(blurs).toBuffer();
  if (opts.cropTop) {
    base = await sharp(base).extract({ left: 0, top: opts.cropTop, width: meta.width, height: meta.height - opts.cropTop }).toBuffer();
  }
  const img = sharp(base);
  const resized = kind === "mobile"
    ? img.resize({ height: 1400, withoutEnlargement: true })
    : img.resize({ width: 1600, withoutEnlargement: true });
  const info = await resized.webp({ quality: 82 }).toFile(join(outDir, `${name}.webp`));
  console.log(`${project}/${name}.webp`, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
