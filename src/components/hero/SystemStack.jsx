"use client";

import { useEffect, useRef } from "react";
import { VIEW, slabShape } from "./stackGeometry";

/**
 * La pila de la portada: las cuatro capas de un sistema (cliente, API, datos,
 * infraestructura) como losas mate. Es la pieza propia del sitio: cuenta en
 * una imagen en qué capas trabajo, y la de la API, que es la mía, va en latón.
 * Además es un índice: cada losa lleva a su grupo en la sección Stack.
 *
 * Dos capas con el mismo dibujo:
 *
 *   1. Un SVG isométrico, en el HTML desde el build. Es el primer pintado, la
 *      entrada (las losas caen y se apilan, en CSS) y el respaldo sin WebGL.
 *   2. Una escena OGL que se carga DESPUÉS de esa entrada, en un fragmento
 *      aparte (~15 KB comprimidos), y sustituye al SVG en la misma pose. Gira
 *      con el puntero, las losas se separan al desplazarse y la que está bajo
 *      el cursor se levanta. Pinta bajo demanda y se para fuera de pantalla.
 *
 * Las etiquetas son ENLACES HTML (texto nítido, la fuente real, alcanzables
 * con teclado y lector de pantalla). En reposo las coloca el CSS en la misma
 * esquina que el SVG; con la escena activa se desplazan con `transform`
 * siguiendo a su losa.
 *
 * Hover: una sola fuente, `hover()`, que marca la losa y su etiqueta con
 * `data-active` y se lo pasa a la escena. La disparan la etiqueta (puntero y
 * foco) y la propia losa (puntero sobre el SVG, o el rayo de la escena). Un
 * clic o toque en una losa sigue el enlace de su etiqueta.
 *
 * El árbol es idéntico en servidor y cliente: la escena y el hover sólo tocan
 * atributos `data-*` desde efectos y manejadores.
 */
export default function SystemStack({ layers }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);
  const linkRefs = useRef([]);
  const slabRefs = useRef([]);
  const sceneRef = useRef(null);
  const activeRef = useRef(-1);

  const hover = (index) => {
    if (activeRef.current === index) return;
    activeRef.current = index;
    const wrap = wrapRef.current;
    if (index >= 0) wrap.dataset.hover = "";
    else delete wrap.dataset.hover;
    [labelRefs.current, slabRefs.current].forEach((els) =>
      els.forEach((el, i) => {
        if (!el) return;
        if (i === index) el.dataset.active = "";
        else delete el.dataset.active;
      }),
    );
    sceneRef.current?.setHover(index);
  };

  /** La losa bajo el puntero: el rayo de la escena si está activa; si no (o
      si perdió el contexto y volvió el SVG), el polígono del SVG. */
  const pick = (e) => {
    const hit = sceneRef.current?.pick(e.clientX, e.clientY);
    if (hit != null) return hit;
    const g = e.target.closest?.("[data-index]");
    return g ? Number(g.dataset.index) : -1;
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    let disposed = false;

    // Después de la entrada CSS y cuando el hilo esté libre: la escena no
    // compite con el primer pintado ni con la animación de llegada.
    const start = async () => {
      const { mountStack } = await import("./stackScene");
      if (disposed) return;
      sceneRef.current = mountStack({
        wrap,
        canvas,
        labels: labelRefs.current,
        accentIndex: layers.findIndex((l) => l.id === "api"),
        count: layers.length,
      });
      if (activeRef.current >= 0) sceneRef.current?.setHover(activeRef.current);
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
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [layers]);

  const shapes = layers.map((_, i) => slabShape(i, layers.length));

  return (
    <div
      className="stack3d"
      ref={wrapRef}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" && !e.target.closest(".stack3d__label")) hover(pick(e));
      }}
      onPointerLeave={() => hover(-1)}
      onClick={(e) => {
        if (e.target.closest(".stack3d__label")) return;
        const index = pick(e);
        if (index >= 0) linkRefs.current[index]?.click();
      }}
    >
      <svg className="stack3d__svg" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} aria-hidden="true">
        {/* De abajo arriba: la de encima tapa a la de debajo. */}
        {layers
          .map((layer, i) => ({ layer, i, shape: shapes[i] }))
          .reverse()
          .map(({ layer, i, shape }) => (
            <g
              key={layer.id}
              ref={(el) => {
                slabRefs.current[i] = el;
              }}
              className="stack3d__slab"
              data-index={i}
              data-accent={layer.id === "api" || undefined}
              style={{ "--i": layers.length - 1 - i }}
            >
              <g className="stack3d__lift">
                <polygon points={shape.left} className="stack3d__face is-left" />
                <polygon points={shape.right} className="stack3d__face is-right" />
                <polygon points={shape.top} className="stack3d__face is-top" />
              </g>
            </g>
          ))}
      </svg>

      <canvas ref={canvasRef} className="stack3d__canvas" aria-hidden="true" />

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
            <a
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              href={`#stack-${layer.skill}`}
              className="stack3d__label-text"
              aria-label={layer.label}
              onPointerEnter={() => hover(i)}
              onPointerLeave={() => hover(-1)}
              onFocus={() => hover(i)}
              onBlur={() => hover(-1)}
            >
              <span className="stack3d__name">{layer.name}</span>
              {/* Una pieza por tecnología: con sitio van en línea con su
                  separador; en móvil, una debajo de otra, sin "·" colgando. */}
              <span className="stack3d__tech mono">
                {layer.tech.split(" · ").map((part) => (
                  <span key={part} className="stack3d__tech-part">
                    {part}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
