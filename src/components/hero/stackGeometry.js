/**
 * Geometría de la pila de la portada, compartida por el SVG (primer pintado,
 * y respaldo sin WebGL) y la escena OGL. Las dos dibujan EXACTAMENTE lo mismo
 * en reposo: la cámara de la escena es ortográfica e isométrica (mira desde
 * (1, 1, 1)), así que cada longitud del mundo se proyecta con factores fijos y
 * el SVG puede calcularlos. Por eso el paso del SVG al lienzo no se nota.
 *
 * Unidades: el mundo en unidades de la escena; el SVG en las de su viewBox.
 */

/** viewBox del SVG y dónde cae el origen del mundo dentro de él. La pila va
    a la izquierda para que las etiquetas quepan a la derecha. */
export const VIEW = { w: 400, h: 460, cx: 150, cy: 230 };

/** Unidades del viewBox por unidad del mundo. */
export const PX = 60;

/** Losa: lado de la planta cuadrada, grosor y distancia entre centros. */
export const SLAB = { size: 3.064, thick: 0.45, gap: 1.59 };

/* Proyección isométrica: un eje horizontal del mundo mide √(2/3) en pantalla
   y va a 30°; el vertical, √(2/3) hacia arriba. */
const K = Math.sqrt(2 / 3);
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

/** Centro vertical de la losa `i` (0 = la de arriba) en el mundo. */
export function slabY(i, count, gap = SLAB.gap) {
  return ((count - 1) / 2 - i) * gap;
}

/** La losa `i` proyectada en el viewBox: rombo de la cara superior y las dos
    caras laterales visibles, más el punto donde se ancla su etiqueta (la
    esquina derecha, a media altura). */
export function slabShape(i, count) {
  const half = SLAB.size / 2;
  const hw = half * 2 * K * COS30 * PX; // semiancho del rombo
  const hh = half * 2 * K * SIN30 * PX; // semialto del rombo
  const t = SLAB.thick * K * PX; // grosor en pantalla
  const top = slabY(i, count) + SLAB.thick / 2;
  const cx = VIEW.cx;
  const cy = VIEW.cy - top * K * PX;

  const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  return {
    top: pts([
      [cx, cy - hh],
      [cx + hw, cy],
      [cx, cy + hh],
      [cx - hw, cy],
    ]),
    left: pts([
      [cx - hw, cy],
      [cx, cy + hh],
      [cx, cy + hh + t],
      [cx - hw, cy + t],
    ]),
    right: pts([
      [cx, cy + hh],
      [cx + hw, cy],
      [cx + hw, cy + t],
      [cx, cy + hh + t],
    ]),
    anchor: { x: cx + hw, y: cy + t / 2 },
  };
}

/** El punto del mundo que corresponde a `anchor` (esquina derecha de la losa
    a media altura): con la cámara en (1, 1, 1), la esquina (+x, −z) es la que
    queda más a la derecha. */
export function slabAnchor(i, count, gap) {
  const half = SLAB.size / 2;
  return [half, slabY(i, count, gap), -half];
}
