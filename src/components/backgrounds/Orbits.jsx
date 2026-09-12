"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
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
 * rodea las tarjetas.
 *
 * Los cometas orbitan SIEMPRE, y eso tiene un precio que aquí se acota:
 * la mitad trasera está detrás de superficies con `backdrop-filter`, y todo
 * lo que cambia detrás de un cristal le obliga a recalcular su desenfoque.
 * Si girase el anillo entero —un SVG del tamaño de media pantalla— el daño
 * sería media pantalla por fotograma, para siempre. Por eso:
 *   - las PISTAS están quietas: se pintan una vez y no generan daño;
 *   - lo que se mueve es sólo el COMETA, una capa del tamaño de su arco
 *     (un par de cientos de px) que gira alrededor del centro del anillo.
 *     El daño por fotograma es ese recorte, no el anillo.
 * El arco se construye en px a mano al medir (ver `construirArco`), porque
 * un SVG escalado con viewBox tendría la caja del anillo completo.
 *
 * Qué los mueve:
 *   - el tiempo: cada anillo tiene su velocidad y su sentido;
 *   - el scroll: la velocidad del progreso de la escena los ACELERA y luego
 *     vuelven a su ritmo, como si los empujara el desplazamiento. Así la
 *     vista detallada no "salta" al cambiar de sección: gira siempre, y el
 *     cambio sólo le da un empujón;
 *   - el puntero, en punteros finos: el plano se inclina unos grados.
 *
 * Con movimiento reducido los cometas siguen (son objetos pequeños, como un
 * indicador de carga), pero más despacio, sin empujón del scroll y sin
 * inclinación. Mismo árbol siempre.
 */

/* Diámetro relativo al ancho de las tarjetas (en CSS), velocidad en °/s y
   cometas con su fase inicial. Sentidos alternos: los anillos se cruzan en
   vez de girar como un bloque, que es lo que da la sensación de mecanismo. */
const RINGS = [
  { id: "inner", speed: 16, comets: [{ phase: 20, span: 24 }] },
  {
    id: "mid",
    speed: -10,
    comets: [
      { phase: 200, span: 18 },
      { phase: 20, span: 12 },
    ],
  },
  { id: "outer", speed: 6.5, warm: true, comets: [{ phase: 110, span: 16 }] },
];

/** Inclinación del plano en reposo: casi de canto, para que la elipse abrace. */
const PLANE_TILT = 72;
/** Fracción de la velocidad que se conserva con movimiento reducido. */
const REDUCED_SPEED = 0.4;
/** Grados extra por unidad de velocidad del progreso (progreso/s). */
const SCROLL_PUSH = 900;
/** Grosor del arco del cometa, en px. Debe cuadrar con `.orbits__arc path`. */
const ARC_STROKE = 3;

export default function Orbits({ progress, scrollRef }) {
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const backRef = useRef(null);
  const frontRef = useRef(null);
  const angles = useRef(null);
  const comets = useRef(null);

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

  // Geometría: el sistema se centra en las tarjetas y escala con su ancho.
  // Todo se escribe a mano fuera del render y sólo al redimensionar.
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
        for (const layer of [backRef.current, frontRef.current]) {
          if (!layer) continue;
          for (const [name, value] of Object.entries(vars)) layer.style.setProperty(name, value);
          for (const ring of RINGS) {
            const half = layer.querySelector(`.orbits__half--${ring.id}`);
            if (!half) continue;
            const radio = half.offsetWidth / 2;
            half.querySelectorAll(".orbits__comet").forEach((comet, i) => {
              construirArco(comet, radio, ring.comets[i].span, ring.speed < 0);
            });
          }
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

  // Bucle de órbita. `useAnimationFrame` se detiene solo con la pestaña
  // oculta. Escribe `transform` a mano: son capas propias, así que cambiarlo
  // sólo recompone, no repinta.
  useAnimationFrame((_, delta) => {
    const layers = [backRef.current, frontRef.current];
    if (!layers[0] || !layers[1]) return;
    // Un salto largo (volver a la pestaña) no debe teletransportar cometas.
    const dt = Math.min(delta, 64) / 1000;

    if (!angles.current) {
      angles.current = RINGS.map((ring) => ring.comets.map((c) => c.phase));
      // Los nodos no cambian nunca: se buscan una vez, no por fotograma.
      comets.current = RINGS.map((ring) =>
        ring.comets.map((_, ci) =>
          layers.map((l) =>
            l.querySelector(`.orbits__half--${ring.id} .orbits__comet[data-comet="${ci}"]`),
          ),
        ),
      );
    }

    const velocidad = reduce ? 0 : Math.abs(progress.getVelocity());
    const empuje = Math.min(velocidad * SCROLL_PUSH, 240);

    RINGS.forEach((ring, ri) => {
      const sentido = Math.sign(ring.speed);
      const base = Math.abs(ring.speed) * (reduce ? REDUCED_SPEED : 1);
      const paso = (base + empuje) * sentido * dt;
      ring.comets.forEach((_, ci) => {
        const a = (angles.current[ri][ci] + paso) % 360;
        angles.current[ri][ci] = a;
        const t = `rotate(${a.toFixed(2)}deg)`;
        for (const el of comets.current[ri][ci]) {
          if (el) el.style.transform = t;
        }
      });
    });
  });

  const tiltX = useTransform(py, (v) => PLANE_TILT - v * 5 * k);
  const tiltY = useTransform(px, (v) => v * 7 * k);

  const layer = (half, ref) => (
    <div ref={ref} className={`orbits orbits--${half}`} aria-hidden="true">
      <motion.div className="orbits__plane" style={{ rotateX: tiltX, rotateY: tiltY }}>
        {RINGS.map((ring) => (
          <div key={ring.id} className={`orbits__half orbits__half--${half} orbits__half--${ring.id}`}>
            <div className="orbits__ring">
              <svg className="orbits__svg">
                <circle
                  cx="50%"
                  cy="50%"
                  r="49.6%"
                  pathLength="100"
                  className={`orbits__track orbits__track--${ring.id}`}
                />
              </svg>
              {ring.comets.map((comet, ci) => {
                const grad = `orbit-arc-${half}-${ring.id}-${ci}`;
                return (
                  <div
                    key={ci}
                    data-comet={ci}
                    className={`orbits__comet ${ring.warm ? "is-warm" : ""}`}
                    style={{ transform: `rotate(${comet.phase}deg)` }}
                  >
                    <svg className="orbits__arc">
                      <defs>
                        <linearGradient id={grad} gradientUnits="userSpaceOnUse">
                          <stop offset="0" className="orbits__stop--tail" />
                          <stop offset="1" className="orbits__stop--head" />
                        </linearGradient>
                      </defs>
                      <path stroke={`url(#${grad})`} />
                    </svg>
                    <span className="orbits__glow" />
                  </div>
                );
              })}
            </div>
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
 * Coloca el arco de un cometa en px reales.
 *
 * El elemento `.orbits__comet` está en el CENTRO del anillo con tamaño 0 y
 * gira alrededor de ese punto. La cabeza del cometa está a las 3 (ángulo 0,
 * radio R) y la estela se extiende `span` grados hacia atrás. El SVG se
 * dimensiona a la caja del arco, no a la del anillo: esa caja es lo que
 * cuenta como daño cuando el cometa se mueve detrás del cristal.
 */
function construirArco(comet, R, spanDeg, reverse) {
  const svg = comet.querySelector(".orbits__arc");
  const path = svg?.querySelector("path");
  const grad = svg?.querySelector("linearGradient");
  const glow = comet.querySelector(".orbits__glow");
  if (!svg || !path || !grad || R <= 0) return;

  const s = (spanDeg * Math.PI) / 180;
  // En pantalla (y hacia abajo) el sentido horario es el de ángulo creciente:
  // si el cometa avanza horario, la estela queda en ángulos negativos.
  const signo = reverse ? 1 : -1;
  const tx = R * Math.cos(s);
  const ty = signo * R * Math.sin(s);
  const pad = ARC_STROKE * 2;

  const minX = tx - pad;
  const minY = Math.min(ty, 0) - pad;
  const w = R - tx + pad * 2;
  const h = Math.abs(ty) + pad * 2;

  svg.style.left = `${minX}px`;
  svg.style.top = `${minY}px`;
  svg.setAttribute("width", w.toFixed(1));
  svg.setAttribute("height", h.toFixed(1));
  svg.setAttribute("viewBox", `0 0 ${w.toFixed(1)} ${h.toFixed(1)}`);

  const x0 = tx - minX;
  const y0 = ty - minY;
  const x1 = R - minX;
  const y1 = -minY;
  // Barrido horario (1) de la estela a la cabeza si avanza horario.
  path.setAttribute(
    "d",
    `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 ${reverse ? 0 : 1} ${x1.toFixed(1)} ${y1.toFixed(1)}`,
  );
  grad.setAttribute("x1", x0.toFixed(1));
  grad.setAttribute("y1", y0.toFixed(1));
  grad.setAttribute("x2", x1.toFixed(1));
  grad.setAttribute("y2", y1.toFixed(1));

  if (glow) glow.style.left = `${R}px`;
}
