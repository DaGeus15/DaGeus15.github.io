/**
 * Geometría de la pila de la portada, compartida por el SVG (primer pintado,
 * y respaldo sin WebGL) y la escena OGL. Las dos dibujan EXACTAMENTE lo mismo
 * en reposo: la cámara de la escena es ortográfica e isométrica (mira desde
 * (1, 1, 1)), así que cada punto del mundo se proyecta con factores fijos y el
 * SVG puede calcularlos. Por eso el paso del SVG al lienzo no se nota.
 *
 * Cada losa es un rectángulo de esquinas redondeadas extruido (el lenguaje del
 * Liquid Glass: piezas redondeadas, no cajas). El contorno lo genera
 * `roundedOutline`, y lo usan la malla de la escena y los polígonos del SVG.
 *
 * Unidades: el mundo en unidades de la escena; el SVG en las de su viewBox.
 */

/** viewBox del SVG y dónde cae el origen del mundo dentro de él. La pila va
    a la izquierda para que las etiquetas quepan a la derecha. */
export const VIEW = { w: 400, h: 460, cx: 150, cy: 230 };

/** Unidades del viewBox por unidad del mundo. */
export const PX = 60;

/** Losa: lado de la planta, grosor, distancia entre centros y radio de las
    esquinas de la planta. */
export const SLAB = { size: 3.064, thick: 0.38, gap: 1.59, radius: 0.62 };

/** Núcleo: la placa luminosa dentro de cada losa, centrada. Su lado es una
    fracción del de la losa. */
export const CORE = { inset: 0.74, thick: 0.06, radius: 0.4 };

/** Puntos por cuarto de círculo en las esquinas. */
const SEGMENTS = 10;

/* Proyección isométrica: un eje horizontal del mundo mide √(2/3) en pantalla
   y va a 30°; el vertical, √(2/3) hacia arriba. */
const K = Math.sqrt(2 / 3);
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

/** Centro vertical de la losa `i` (0 = la de arriba) en el mundo. */
export function slabY(i, count, gap = SLAB.gap) {
  return ((count - 1) / 2 - i) * gap;
}

/**
 * Contorno de un cuadrado de semilado `half` con esquinas de radio `r`, en el
 * plano XZ: lista de { x, z, nx, nz } (punto y normal hacia fuera), con el
 * ángulo creciendo de una esquina a la siguiente. Cada esquina aporta sus dos
 * extremos, así que entre esquinas el lado queda recto.
 */
export function roundedOutline(half, r, segments = SEGMENTS) {
  const c = half - r;
  const corners = [
    [c, c],
    [-c, c],
    [-c, -c],
    [c, -c],
  ];
  const points = [];
  corners.forEach(([cx, cz], k) => {
    for (let s = 0; s <= segments; s++) {
      const a = ((k + s / segments) * Math.PI) / 2;
      const nx = Math.cos(a);
      const nz = Math.sin(a);
      points.push({ x: cx + r * nx, z: cz + r * nz, nx, nz });
    }
  });
  return points;
}

/** Un punto del mundo en el viewBox, con la misma proyección que la escena. */
export function project(x, y, z) {
  return [VIEW.cx + (x - z) * K * COS30 * PX, VIEW.cy - y * K * PX + (x + z) * K * SIN30 * PX];
}

/** Envolvente convexa (cadena monótona): la silueta de la losa extruida. */
function hull(points) {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list) => {
    const out = [];
    for (const pt of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], pt) <= 0) out.pop();
      out.push(pt);
    }
    out.pop();
    return out;
  };
  return [...half(p), ...half(p.reverse())];
}

const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** Hacia dónde entra la luz en la escena (−x, un poco −z: la izquierda de la
    pantalla). El filo del contorno que mira hacia ella brilla. */
const LIGHT = (() => {
  const l = Math.hypot(1, 0.3);
  return [-1 / l, -0.3 / l];
})();

/** La losa `i` proyectada en el viewBox: su silueta entera (cuerpo), la cara
    superior, el filo de luz (el tramo del contorno superior que mira hacia
    la luz, como en la escena), la cara superior de su núcleo y el punto
    donde se ancla su etiqueta (el punto más a la derecha, a media altura). */
export function slabShape(i, count) {
  const y = slabY(i, count);
  const outline = roundedOutline(SLAB.size / 2, SLAB.radius);
  const core = roundedOutline((SLAB.size * CORE.inset) / 2, CORE.radius);
  const top = outline.map((p) => project(p.x, y + SLAB.thick / 2, p.z));
  const bottom = outline.map((p) => project(p.x, y - SLAB.thick / 2, p.z));
  const [ax, , az] = slabAnchor(i, count);
  const lit = top.filter((_, k) => outline[k].nx * LIGHT[0] + outline[k].nz * LIGHT[1] > 0.25);

  return {
    body: pts(hull([...top, ...bottom])),
    top: pts(top),
    rim: `M${lit.map(([x, sy]) => `${x.toFixed(1)} ${sy.toFixed(1)}`).join(" L")}`,
    core: pts(core.map((p) => project(p.x, y + CORE.thick / 2, p.z))),
    anchor: (([x, sy]) => ({ x, y: sy }))(project(ax, y, az)),
  };
}

/** El punto del mundo que corresponde a `anchor`: el más a la derecha en
    pantalla de la losa, a media altura. Con la cámara en (1, 1, 1) está en la
    esquina redondeada (+x, −z), a 45°. */
export function slabAnchor(i, count, gap) {
  const c = SLAB.size / 2 - SLAB.radius + SLAB.radius * Math.SQRT1_2;
  return [c, slabY(i, count, gap), -c];
}
