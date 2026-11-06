"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { VIEW, slabShape, RIM_GRADIENT } from "./stackGeometry";
import { MOBILE_BREAKPOINT } from "@/lib/breakpoints";

/**
 * La pila de la sección Stack: las cuatro capas de un sistema (cliente, API,
 * datos, infraestructura) como losas de cristal con un núcleo luminoso dentro.
 * Es la pieza propia del sitio: cuenta en una imagen en qué capas trabajo, y
 * la de la API, que es la mía, va en latón.
 * Además es un índice: cada losa lleva a su grupo principal.
 *
 * Dos capas con el mismo dibujo:
 *
 *   1. Un SVG isométrico, en el HTML desde el build. Es el primer pintado, la
 *      entrada (las losas caen y se apilan, en CSS) y el respaldo sin WebGL.
 *   2. Una escena OGL que se descarga a dos pantallas de distancia y se monta
 *      en cuanto el scroll descansa, o a una pantalla si no descansa. Si llega
 *      a tiempo, la caída es suya y el SVG no se ve. Si llega tarde, sigue la caída desde el progreso del CSS. Gira
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
 * foco), la propia losa (puntero sobre el SVG, o el rayo de la escena) y, en
 * escritorio, la fila del stack que cruza la línea del 40%. El puntero tiene
 * prioridad mientras está encima; al salir vuelve la de la lectura. Un clic
 * o toque en una losa sigue el enlace de su etiqueta.
 *
 * El árbol es idéntico en servidor y cliente: la escena y el hover sólo tocan
 * atributos `data-*` desde efectos y manejadores.
 */
/** Sin eventos de scroll durante este tiempo, el scroll descansa. */
const SCROLL_REST_MS = 160;

export default function SystemStack({ layers }) {
  const wrapRef = useRef(null);
  const labelRefs = useRef([]);
  const linkRefs = useRef([]);
  const slabRefs = useRef([]);
  const sceneRef = useRef(null);
  const activeRef = useRef(-1);
  const pointerRef = useRef(-1);
  const readRef = useRef(-1);

  /** Puntero (o foco) si está encima; si no, la losa de la fila que se lee. */
  const applyHover = () => {
    const index = pointerRef.current >= 0 ? pointerRef.current : readRef.current;
    if (activeRef.current === index) return;
    activeRef.current = index;
    const wrap = wrapRef.current;
    if (!wrap) return;
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

  const hover = (index) => {
    pointerRef.current = index;
    applyHover();
  };

  /* La lectura entra por la misma `applyHover` que el puntero. El ref se
     actualiza en un efecto: escribirlo durante el render está prohibido. */
  const readHover = useRef(() => {});
  useEffect(() => {
    readHover.current = (index) => {
      readRef.current = index;
      applyHover();
    };
  });

  /** La losa bajo el puntero: el rayo de la escena si está activa; si no (o
      si perdió el contexto y volvió el SVG), el polígono del SVG. */
  const pick = (e) => {
    const hit = sceneRef.current?.pick(e.clientX, e.clientY);
    if (hit != null) return hit;
    const g = e.target.closest?.("[data-index]");
    return g ? Number(g.dataset.index) : -1;
  };

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    let disposed = false;
    let canvas = null;

    let force = null;
    if (process.env.NODE_ENV !== "production") {
      const value = new URLSearchParams(window.location.search).get("stack");
      if (value === "svg" || value === "gl") {
        force = value;
        wrap.dataset.force = value;
      }
    }

    const rect = wrap.getBoundingClientRect();
    const seen = rect.bottom > 0 && rect.top < window.innerHeight;
    let played = seen;
    if (!seen) wrap.dataset.armed = "";

    const play = () => {
      if (played) return;
      played = true;
      wrap.dataset.play = "";
      sceneRef.current?.playDrop();
    };

    // El fragmento se pide a dos pantallas de distancia, no al cargar: OGL y
    // la escena eran una tarea larga en plena carga, aunque el visitante no
    // llegara nunca aquí. La escena se MONTA a una pantalla, para que la
    // caída ocurra en WebGL y el SVG no llegue a verse.
    let scenePromise = null;
    const loadScene = () => (scenePromise ??= import("./stackScene"));

    const readCssDrop = () => {
      let elapsed = 0;
      let any = false;
      let allDone = true;
      for (const el of slabRefs.current) {
        if (!el) continue;
        const anim = [...el.getAnimations()].find((a) => a.animationName === "slab-drop");
        if (!anim) continue;
        any = true;
        const t = Number(anim.currentTime) || 0;
        elapsed = Math.max(elapsed, t);
        const end = anim.effect?.getComputedTiming?.().endTime ?? Infinity;
        if (anim.playState !== "finished" && t < end - 16) allDone = false;
      }
      if (!any) return wrap.dataset.play != null ? { mode: "running", elapsed: 0 } : { mode: "pending", elapsed: 0 };
      if (allDone) return { mode: "done", elapsed };
      return { mode: "running", elapsed };
    };

    let started = false;
    const start = async () => {
      if (started || disposed || force === "svg") return;
      started = true;
      const { mountStack } = await loadScene();
      if (disposed || force === "svg") return;
      // Un fotograma para que, si la caída CSS acaba de arrancar, el navegador
      // ya tenga la animación y se pueda leer su progreso.
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (disposed || force === "svg") return;

      const drop = seen ? { mode: "skip", elapsed: 0 } : readCssDrop();
      const reveal = drop.mode === "pending" ? "gl" : drop.mode === "running" ? "handoff" : "fade";

      // El lienzo se crea aquí, no en el JSX: cada montaje estrena uno con su
      // propio contexto. Reutilizar el del montaje anterior (lo que hace una
      // recarga en caliente) lo daba ya liberado y se quedaba el SVG.
      canvas = document.createElement("canvas");
      canvas.className = "stack3d__canvas";
      canvas.setAttribute("aria-hidden", "true");
      wrap.insertBefore(canvas, wrap.querySelector(".stack3d__labels"));
      canvas.getBoundingClientRect();

      sceneRef.current = mountStack({
        wrap,
        canvas,
        labels: labelRefs.current,
        accentIndex: layers.findIndex((l) => l.id === "api"),
        count: layers.length,
        reveal,
        drop,
      });

      if (!sceneRef.current) {
        canvas.remove();
        canvas = null;
        delete wrap.dataset.gl;
        if (force === "gl") delete wrap.dataset.force;
        return;
      }
      if (activeRef.current >= 0) sceneRef.current.setHover(activeRef.current);
      if (played && drop.mode === "pending") sceneRef.current.playDrop();
    };

    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        near.disconnect();
        stopWaiting();
        start();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    near.observe(wrap);

    // Montar la escena compila sus shaders, y eso para el hilo principal
    // ~140ms: en pleno scroll, un tirón. Con el fragmento ya aquí, se monta
    // cuando el scroll descansa; quien no para llega a `near`, que la monta
    // igual, antes de que se vea.
    let quiet = 0;
    const onScrollDuringWait = () => {
      clearTimeout(quiet);
      quiet = setTimeout(() => {
        stopWaiting();
        start();
      }, SCROLL_REST_MS);
    };
    function stopWaiting() {
      clearTimeout(quiet);
      window.removeEventListener("scroll", onScrollDuringWait);
    }

    const far = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        far.disconnect();
        loadScene().then(() => {
          if (disposed || started) return;
          window.addEventListener("scroll", onScrollDuringWait, { passive: true });
          onScrollDuringWait();
        });
      },
      { rootMargin: "200% 0px 200% 0px" },
    );
    far.observe(wrap);

    let enter = null;
    if (!seen) {
      enter = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          enter.disconnect();
          play();
        },
        { threshold: 0.01 },
      );
      enter.observe(wrap);
    }

    return () => {
      disposed = true;
      near.disconnect();
      far.disconnect();
      enter?.disconnect();
      stopWaiting();
      sceneRef.current?.dispose();
      sceneRef.current = null;
      canvas?.remove();
      delete wrap.dataset.armed;
      delete wrap.dataset.play;
      delete wrap.dataset.gl;
      delete wrap.dataset.handoff;
      delete wrap.dataset.ready;
      delete wrap.dataset.settled;
      delete wrap.dataset.force;
    };
  }, [layers]);

  /* Resaltado de lectura, el mismo criterio que el scroll-spy: la fila que
     cruza una línea al 40% de la altura levanta su losa. Sólo en escritorio;
     en móvil la pila ya no está a la vista cuando se leen las filas. Sin
     estado de React: el observer escribe en la misma fuente que el puntero. */
  useEffect(() => {
    const rows = layers.flatMap((layer, index) =>
      layer.groups.map((group) => ({ index, el: document.getElementById(`stack-${group}`) })).filter((row) => row.el),
    );
    const crossing = new Set();
    let observer = null;
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);

    const showReading = (index) => readHover.current(index);

    const sync = () => {
      if (!mq.matches) {
        crossing.clear();
        showReading(-1);
        return;
      }
      const current = rows.find((row) => crossing.has(row.el));
      showReading(current ? current.index : -1);
    };

    const connect = () => {
      observer?.disconnect();
      crossing.clear();
      if (!mq.matches) {
        showReading(-1);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) crossing.add(entry.target);
            else crossing.delete(entry.target);
          });
          sync();
        },
        { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
      );
      rows.forEach((row) => observer.observe(row.el));
    };

    connect();
    mq.addEventListener("change", connect);
    return () => {
      observer?.disconnect();
      mq.removeEventListener("change", connect);
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
        {/* El cristal en SVG, lo más parecido a la escena para que el relevo
            no se note: cara superior lechosa (más clara arriba a la
            izquierda), cantos con degradado vertical y núcleos con un brillo
            en el centro. Los colores, en home.css (`.stack3d__stop`). Una
            sola pila por página, así que los ids son fijos. */}
        <defs>
          <linearGradient id="stack3d-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="stack3d__stop is-top-hi" />
            <stop offset="1" className="stack3d__stop is-top-lo" />
          </linearGradient>
          <linearGradient id="stack3d-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="stack3d__stop is-body-hi" />
            <stop offset="1" className="stack3d__stop is-body-lo" />
          </linearGradient>
          <linearGradient
            id="stack3d-rim"
            gradientUnits="userSpaceOnUse"
            x1={RIM_GRADIENT.x1}
            y1={RIM_GRADIENT.y1}
            x2={RIM_GRADIENT.x2}
            y2={RIM_GRADIENT.y2}
          >
            <stop offset="0" className="stack3d__stop is-rim" />
            <stop offset="1" className="stack3d__stop is-rim-shade" />
          </linearGradient>
          <radialGradient id="stack3d-halo">
            <stop offset="0" className="stack3d__stop is-halo-in" />
            <stop offset="0.62" className="stack3d__stop is-halo" />
            <stop offset="1" className="stack3d__stop is-halo-out" />
          </radialGradient>
          <radialGradient id="stack3d-halo-accent">
            <stop offset="0" className="stack3d__stop is-halo-accent-in" />
            <stop offset="0.62" className="stack3d__stop is-halo-accent" />
            <stop offset="1" className="stack3d__stop is-halo-out" />
          </radialGradient>
          <radialGradient id="stack3d-core">
            <stop offset="0" className="stack3d__stop is-core-glow" />
            <stop offset="1" className="stack3d__stop is-core" />
          </radialGradient>
          <radialGradient id="stack3d-core-accent">
            <stop offset="0" className="stack3d__stop is-core-accent-glow" />
            <stop offset="1" className="stack3d__stop is-core-accent" />
          </radialGradient>
        </defs>
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
                {/* Cristal: la silueta (los cantos), el núcleo que se ve
                    dentro y la cara superior translúcida encima. */}
                <polygon points={shape.body} className="stack3d__face is-left" />
                <polygon points={shape.halo} className="stack3d__halo" />
                <polygon points={shape.core} className="stack3d__core" />
                <polygon points={shape.top} className="stack3d__face is-top" />
                <path d={shape.inner} className="stack3d__inner" />
                <path d={shape.outline} className="stack3d__rim" />
              </g>
            </g>
          ))}
      </svg>

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
