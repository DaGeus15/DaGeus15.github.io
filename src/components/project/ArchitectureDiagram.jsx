"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Diagrama de arquitectura de un proyecto, dibujado a partir de los datos de
 * `content/projects.js` (nodos con posición, conexiones con protocolo).
 *
 * Para un perfil backend vale más que una captura: enseña cómo está hecho el
 * sistema, que es lo que un reclutador técnico quiere ver.
 *
 * Los "paquetes" que recorren las conexiones son SMIL (`<animateMotion>`):
 * corren sin JavaScript, empiezan en el primer pintado y no tocan React. Son
 * círculos de 5px, así que pueden ser perpetuos (ver la regla de lo perpetuo
 * en AGENTS.md); aun así se pausan cuando el diagrama sale de la pantalla.
 * Con movimiento reducido van a un 40% de velocidad, no se paran: el flujo
 * es parte de lo que el diagrama explica.
 *
 * El árbol es idéntico en servidor y cliente; la velocidad reducida se aplica
 * a mano en un efecto, no en el render, para no descuadrar la hidratación.
 */

const NODE_W = 132;

function box(node) {
  const w = node.w ?? NODE_W;
  const h = node.h ?? (node.tech ? 46 : 38);
  return {
    ...node,
    w,
    h,
    l: node.x - w / 2,
    r: node.x + w / 2,
    t: node.y - h / 2,
    b: node.y + h / 2,
  };
}

/**
 * Traza ortogonal entre dos cajas. Recta si una cae dentro de la franja de la
 * otra; si no, un codo con esquinas redondeadas a mitad de camino.
 * Devuelve el `d`, la longitud (para la velocidad del paquete) y dónde va la
 * etiqueta del protocolo.
 */
function route(a, b) {
  const dirX = Math.sign(b.x - a.x) || 1;
  const dirY = Math.sign(b.y - a.y) || 1;
  const overlapX = a.r > b.l && b.r > a.l;

  if (overlapX) {
    const x = a.x >= b.l && a.x <= b.r ? a.x : b.x;
    const y1 = dirY > 0 ? a.b : a.t;
    const y2 = dirY > 0 ? b.t : b.b;
    return { d: `M${x} ${y1} V${y2}`, len: Math.abs(y2 - y1), lx: x + 7, ly: (y1 + y2) / 2 + 3, anchor: "start" };
  }

  const x1 = dirX > 0 ? a.r : a.l;
  const x2 = dirX > 0 ? b.l : b.r;
  const straightY = a.y >= b.t && a.y <= b.b ? a.y : b.y >= a.t && b.y <= a.b ? b.y : null;

  if (straightY !== null) {
    return {
      d: `M${x1} ${straightY} H${x2}`,
      len: Math.abs(x2 - x1),
      lx: (x1 + x2) / 2,
      ly: straightY - 7,
      anchor: "middle",
    };
  }

  const mx = (x1 + x2) / 2;
  const r = Math.min(8, Math.abs(b.y - a.y) / 2, Math.abs(mx - x1));
  const d =
    `M${x1} ${a.y} H${mx - dirX * r} Q${mx} ${a.y} ${mx} ${a.y + dirY * r} ` +
    `V${b.y - dirY * r} Q${mx} ${b.y} ${mx + dirX * r} ${b.y} H${x2}`;
  return {
    d,
    len: Math.abs(mx - x1) + Math.abs(b.y - a.y) + Math.abs(x2 - mx),
    lx: (mx + x2) / 2,
    ly: b.y - 7,
    anchor: "middle",
  };
}

export default function ArchitectureDiagram({ diagram, labels, title, legend }) {
  const svgRef = useRef(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const arrowId = `arrow-${uid}`;
  const titleId = `diagram-${uid}`;

  const nodes = Object.fromEntries(diagram.nodes.map((n) => [n.id, box(n)]));
  const edges = diagram.edges.map((e, i) => ({
    ...e,
    key: `${e.from}-${e.to}`,
    index: i,
    layer: nodes[e.to].layer,
    ...route(nodes[e.from], nodes[e.to]),
  }));

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.querySelectorAll("animateMotion, animate").forEach((el) => {
        const dur = parseFloat(el.getAttribute("dur"));
        if (dur) el.setAttribute("dur", `${(dur * 2.5).toFixed(2)}s`);
      });
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="diagram">
      <div className="diagram__frame">
        <svg
          ref={svgRef}
          className="diagram__svg"
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{title}</title>
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 z" className="diagram__arrow" />
            </marker>
          </defs>

          <g className="diagram__edges">
            {edges.map((e) => (
              <g key={e.key} className={e.async ? "diagram__edge is-async" : "diagram__edge"}>
                <path d={e.d} markerEnd={`url(#${arrowId})`} />
                {e.label && (
                  <text x={e.lx} y={e.ly} textAnchor={e.anchor} className="diagram__protocol">
                    {e.label}
                  </text>
                )}
              </g>
            ))}
          </g>

          <g className="diagram__packets">
            {edges.map((e) => {
              const dur = `${Math.max(1.6, e.len / 85).toFixed(2)}s`;
              const begin = `${(e.index * 0.45).toFixed(2)}s`;
              return (
                <circle
                  key={e.key}
                  r={e.async ? 2.2 : 2.6}
                  className={e.async ? "diagram__packet is-async" : "diagram__packet"}
                  data-layer={e.layer}
                  opacity="0"
                >
                  <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={e.d} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={dur}
                    begin={begin}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            })}
          </g>

          <g className="diagram__nodes">
            {Object.values(nodes).map((n) => (
              <g key={n.id} className="diagram__node" data-layer={n.layer}>
                <rect x={n.l} y={n.t} width={n.w} height={n.h} rx="8" />
                <text
                  x={n.x}
                  y={n.tech ? n.y - 3 : n.y + 4}
                  textAnchor="middle"
                  className="diagram__label"
                >
                  {n.label ?? labels[n.id]}
                </text>
                {n.tech && (
                  <text x={n.x} y={n.y + 13} textAnchor="middle" className="diagram__tech">
                    {n.tech}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      {legend && (
        <figcaption className="diagram__legend mono">
          <span className="diagram__key">{legend.sync}</span>
          <span className="diagram__key is-async">{legend.async}</span>
        </figcaption>
      )}
    </figure>
  );
}
