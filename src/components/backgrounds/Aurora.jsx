"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { sectionIds } from "@/content/navigation";
import { backdropSpring } from "@/lib/motion";

/**
 * Fondo ambiental que se mueve con el scroll.
 *
 * Capas, de atrás hacia delante, ninguna con `filter: blur()`:
 *   1. campo frío  — manchas de acento; gira en un sentido
 *   2. campo cálido — manchas de piel/pared; gira en el contrario y sube
 *   3. órbitas     — anillos en un plano inclinado que giran a distinta
 *                    velocidad; es lo que da la sensación de escena 3D
 *   4. luz cenital, grano y viñeta — estáticos
 *
 * Lo que NO es: una escena de Three.js ni un canvas. Esto está detrás de las
 * superficies con `backdrop-filter`, y un canvas que se redibuja cada fotograma
 * obliga a recalcular todos esos desenfoques para siempre, con la página
 * quieta. Aquí cada capa se pinta UNA vez y sólo cambia su `transform`, que
 * lleva el compositor. Y sólo cambia cuando cambia el scroll: el coste existe
 * mientras el visitante desplaza y un instante después, nunca en reposo.
 *
 * El progreso sale del scroll de la vista resumida (0 arriba, 1 abajo). En la
 * vista detallada no hay un scroll común, así que el progreso es la posición
 * de la sección abierta en el menú: cambiar de sección también hace girar el
 * fondo, como si la cámara se moviera a otro punto de la escena.
 *
 * Progreso 0 = transformaciones a cero. El servidor renderiza con 0 y el
 * cliente hidrata con 0 tenga o no movimiento reducido, así que el atributo
 * `style` coincide; con movimiento reducido las amplitudes son 0 y el fondo se
 * queda quieto sin cambiar la estructura.
 */
export default function Aurora({ scrollRef, expandedSection = null }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const p = useSpring(progress, backdropSpring);

  useEffect(() => {
    if (expandedSection !== null) {
      const i = sectionIds.indexOf(expandedSection);
      progress.set(i < 0 ? 0 : i / Math.max(1, sectionIds.length - 1));
      return;
    }

    const el = scrollRef?.current;
    if (!el) return;

    const medir = () => {
      const recorrido = el.scrollHeight - el.clientHeight;
      progress.set(recorrido > 0 ? el.scrollTop / recorrido : 0);
    };

    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [expandedSection, scrollRef, progress]);

  // Una sola amplitud multiplica todo: con movimiento reducido vale 0.
  const k = reduce ? 0 : 1;

  const coolRotate = useTransform(p, [0, 1], [0, 34 * k]);
  const coolScale = useTransform(p, [0, 1], [1, 1 + 0.1 * k]);
  const warmRotate = useTransform(p, [0, 1], [0, -26 * k]);
  const warmY = useTransform(p, [0, 1], ["0vh", `${-9 * k}vh`]);

  const orbitInner = useTransform(p, [0, 1], [0, 150 * k]);
  const orbitMid = useTransform(p, [0, 1], [0, -95 * k]);
  const orbitOuter = useTransform(p, [0, 1], [0, 55 * k]);
  const orbitsY = useTransform(p, [0, 1], ["0vh", `${-14 * k}vh`]);

  return (
    <div className="aurora" aria-hidden="true">
      <motion.div
        className="aurora__field aurora__field--cool"
        style={{ rotate: coolRotate, scale: coolScale }}
      />
      <motion.div
        className="aurora__field aurora__field--warm"
        style={{ rotate: warmRotate, y: warmY }}
      />

      <motion.div className="aurora__orbits" style={{ y: orbitsY }}>
        <div className="aurora__plane">
          <Ring id="outer" rotate={orbitOuter} warm />
          <Ring id="mid" rotate={orbitMid} dashed />
          <Ring id="inner" rotate={orbitInner} />
        </div>
      </motion.div>

      <div className="aurora__zenith" />
      <div className="aurora__grain" />
      <div className="aurora__vignette" />
    </div>
  );
}

/**
 * Un anillo de órbita. El trazo es un degradado —intenso en una esquina, casi
 * nada en la opuesta—, así que al girar se ve un arco de luz que recorre el
 * anillo. Un círculo liso girando no se ve moverse; y los "planetas" que hubo
 * antes, puntos sólidos, se leían como manchas sueltas sobre las tarjetas.
 */
function Ring({ id, rotate, warm = false, dashed = false }) {
  const grad = `aurora-arc-${id}`;
  return (
    <motion.div className={`aurora__ring aurora__ring--${id}`} style={{ rotate }}>
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className={warm ? "aurora__stop--head-warm" : "aurora__stop--head"} />
            <stop offset="0.55" className="aurora__stop--tail" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="49.5"
          stroke={`url(#${grad})`}
          className={`aurora__track ${dashed ? "aurora__track--dashed" : ""}`}
        />
      </svg>
    </motion.div>
  );
}
