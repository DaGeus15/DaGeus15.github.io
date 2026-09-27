"use client";

import { useEffect, useRef } from "react";
import { VIEW, slabShape } from "./stackGeometry";

/**
 * La pila de la portada: las cuatro capas de un sistema (cliente, API, datos,
 * infraestructura) como losas mate. Es la pieza propia del sitio: cuenta en
 * una imagen en qué capas trabajo, y la de la API, que es la mía, va en ascua.
 *
 * Dos capas con el mismo dibujo:
 *
 *   1. Un SVG isométrico, en el HTML desde el build. Es el primer pintado, la
 *      entrada (las losas caen y se apilan, en CSS) y el respaldo sin WebGL.
 *   2. Una escena OGL que se carga DESPUÉS de esa entrada, en un fragmento
 *      aparte (~14 KB comprimidos), y sustituye al SVG en la misma pose. Sólo
 *      añade interacción: gira con el puntero y las losas se separan al
 *      desplazarse. Pinta bajo demanda y se para fuera de pantalla.
 *
 * Las etiquetas son HTML (texto nítido, la fuente real, se leen con zoom).
 * En reposo las coloca el CSS en la misma esquina que el SVG; con la escena
 * activa se desplazan con `transform` siguiendo a su losa.
 *
 * El árbol es idéntico en servidor y cliente: la escena sólo marca
 * `data-ready` en el contenedor desde un efecto.
 */
export default function SystemStack({ layers }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    let disposed = false;
    let dispose = null;

    // Después de la entrada CSS y cuando el hilo esté libre: la escena no
    // compite con el primer pintado ni con la animación de llegada.
    const start = async () => {
      const { mountStack } = await import("./stackScene");
      if (disposed) return;
      dispose = mountStack({
        wrap,
        canvas,
        labels: labelRefs.current,
        accentIndex: layers.findIndex((l) => l.id === "api"),
        count: layers.length,
      });
    };

    let idleId = null;
    const timer = setTimeout(() => {
      if (window.requestIdleCallback) idleId = window.requestIdleCallback(start, { timeout: 1500 });
      else start();
    }, 1500);

    return () => {
      disposed = true;
      clearTimeout(timer);
      if (idleId !== null) window.cancelIdleCallback?.(idleId);
      dispose?.();
    };
  }, [layers]);

  const shapes = layers.map((_, i) => slabShape(i, layers.length));

  return (
    <div className="stack3d" ref={wrapRef} aria-hidden="true">
      <svg className="stack3d__svg" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}>
        {/* De abajo arriba: la de encima tapa a la de debajo. */}
        {layers
          .map((layer, i) => ({ layer, i, shape: shapes[i] }))
          .reverse()
          .map(({ layer, i, shape }) => (
            <g
              key={layer.id}
              className="stack3d__slab"
              data-accent={layer.id === "api" || undefined}
              style={{ "--i": layers.length - 1 - i }}
            >
              <polygon points={shape.left} className="stack3d__face is-left" />
              <polygon points={shape.right} className="stack3d__face is-right" />
              <polygon points={shape.top} className="stack3d__face is-top" />
            </g>
          ))}
      </svg>

      <canvas ref={canvasRef} className="stack3d__canvas" />

      <ul className="stack3d__labels">
        {layers.map((layer, i) => (
          <li
            key={layer.id}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="stack3d__label"
            data-accent={layer.id === "api" || undefined}
            style={{
              "--x": `${(shapes[i].anchor.x / VIEW.w) * 100}%`,
              "--y": `${(shapes[i].anchor.y / VIEW.h) * 100}%`,
              "--i": i,
            }}
          >
            <span className="stack3d__label-text">
              <span className="stack3d__name">{layer.name}</span>
              <span className="stack3d__tech mono">{layer.tech}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
