"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { spring } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Órbitas alrededor del panel de contenido, como los anillos de Saturno.
 *
 * Cada anillo está en un plano tumbado con perspectiva y PARTIDO EN DOS
 * mitades que se pintan en capas distintas:
 *   - la mitad lejana (arriba en el plano) va DETRÁS de las tarjetas;
 *   - la cercana (abajo) va DELANTE, por encima del contenido.
 * Como las dos comparten transformaciones, se ven como un único anillo que
 * rodea las tarjetas. Detrás de todo, en el fondo, las tarjetas las tapaban.
 *
 * Por qué así y no con Three.js: three son ~155 KB gzip y un canvas WebGL.
 * Aquí la profundidad es `perspective` + `rotateX` de CSS, cada anillo es un
 * SVG pintado una vez y lo único que cambia es su `transform`, que mueve el
 * compositor sin tocar el hilo principal. La mitad delantera, además, no
 * obliga a recalcular ningún `backdrop-filter`: el cristal sólo muestrea lo
 * que tiene DETRÁS.
 *
 * Qué las mueve:
 *   - el progreso de la escena (scroll o sección abierta): cada anillo gira a
 *     su velocidad y en su sentido, y un cometa de luz recorre cada uno;
 *   - el puntero, en punteros finos: el plano se inclina unos grados, con la
 *     misma pereza que el halo del cursor.
 * Nunca solas: un giro perpetuo mantendría recalculando los desenfoques que
 * tiene delante la mitad trasera, para siempre.
 *
 * Con movimiento reducido todo queda quieto (amplitudes a 0) sin cambiar el
 * árbol. Los valores de reposo son idénticos en servidor y cliente.
 */

/* Tamaño relativo al ancho de las tarjetas, sentido de giro y vueltas por
   recorrido completo. Sentidos alternos: los anillos se cruzan en vez de
   girar como un bloque, que es lo que da la sensación de mecanismo. */
const RINGS = [
  { id: "inner", turn: 320 },
  { id: "mid", turn: -230 },
  { id: "outer", turn: 170, warm: true },
];

/** Inclinación del plano en reposo: casi de canto, para que la elipse abrace. */
const PLANE_TILT = 72;

export default function Orbits({ progress, scrollRef }) {
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const backRef = useRef(null);
  const frontRef = useRef(null);

  // Puntero normalizado a -1…1 desde el centro de la pantalla.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, spring.ambient);
  const py = useSpring(pointerY, spring.ambient);

  useEffect(() => {
    if (!window.matchMedia(HOVER_QUERY).matches) return;
    const onMove = (e) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerX, pointerY]);

  // Geometría: el sistema se centra en las tarjetas, no en la pantalla, y
  // escala con su ancho. Se escribe en variables CSS fuera del render (no
  // cambia por fotograma: sólo al redimensionar o cambiar de vista).
  useEffect(() => {
    const pane = scrollRef?.current;
    if (!pane) return;

    let frame = 0;
    const medir = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = pane.getBoundingClientRect();
        const cs = getComputedStyle(pane);
        const padL = parseFloat(cs.paddingLeft) || 0;
        const padR = parseFloat(cs.paddingRight) || 0;
        const ancho = Math.max(0, r.width - padL - padR);
        const vars = {
          "--orbit-cx": `${r.left + padL + ancho / 2}px`,
          "--orbit-cy": `${r.top + r.height / 2}px`,
          // Tope: en la vista detallada el panel es casi toda la pantalla y
          // la mitad cercana se saldría entera por abajo.
          "--orbit-w": `${Math.min(ancho, 1000)}px`,
        };
        for (const el of [backRef.current, frontRef.current]) {
          if (!el) continue;
          for (const [name, value] of Object.entries(vars)) el.style.setProperty(name, value);
        }
      });
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pane);
    window.addEventListener("resize", medir);
    // El armazón cambia `left`/`right` al cambiar de vista; con el mismo ancho
    // el ResizeObserver no se entera, pero la transición sí termina.
    pane.addEventListener("transitionend", medir);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", medir);
      pane.removeEventListener("transitionend", medir);
    };
  }, [scrollRef]);

  const tiltX = useTransform(py, (v) => PLANE_TILT - v * 5 * k);
  const tiltY = useTransform(px, (v) => v * 7 * k);

  const inner = useTransform(progress, [0, 1], [0, RINGS[0].turn * k]);
  const mid = useTransform(progress, [0, 1], [0, RINGS[1].turn * k]);
  const outer = useTransform(progress, [0, 1], [0, RINGS[2].turn * k]);
  const rotations = [inner, mid, outer];

  const layer = (half, ref) => (
    <div ref={ref} className={`orbits orbits--${half}`} aria-hidden="true">
      <motion.div className="orbits__plane" style={{ rotateX: tiltX, rotateY: tiltY }}>
        {RINGS.map((ring, i) => (
          <div key={ring.id} className={`orbits__half orbits__half--${half} orbits__half--${ring.id}`}>
            <motion.div className="orbits__ring" style={{ rotate: rotations[i] }}>
              <Ring warm={ring.warm} reverse={ring.turn < 0} />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <>
      {layer("back", backRef)}
      {layer("front", frontRef)}
    </>
  );
}

/**
 * Un anillo: pista tenue, estela y cabeza del cometa.
 *
 * `pathLength="100"` hace que los guiones se midan en porcentaje del
 * perímetro, así que el cometa mide lo mismo en cualquier tamaño de anillo.
 * El trazo de un círculo SVG empieza a las 3 y avanza en sentido horario, que
 * es también el sentido de un `rotate` positivo; en los anillos que giran al
 * revés la cabeza se pone al principio de la estela para que vaya delante.
 */
function Ring({ warm = false, reverse = false }) {
  return (
    <svg className="orbits__svg">
      <circle cx="50%" cy="50%" r="49.6%" pathLength="100" className="orbits__track" />
      <circle
        cx="50%"
        cy="50%"
        r="49.6%"
        pathLength="100"
        className={`orbits__tail ${warm ? "is-warm" : ""}`}
      />
      <circle
        cx="50%"
        cy="50%"
        r="49.6%"
        pathLength="100"
        className={`orbits__head ${warm ? "is-warm" : ""} ${reverse ? "is-reverse" : ""}`}
      />
    </svg>
  );
}
