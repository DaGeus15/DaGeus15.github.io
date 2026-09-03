"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { scrollSpring } from "@/lib/motion";
import useMediaQuery from "@/lib/useMediaQuery";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Envuelve una tarjeta de la vista resumida y la hace girar como en una rueda
 * a medida que entra y sale por los bordes del área de scroll.
 *
 * El mecanismo de la "rueda" NO es el desenfoque —eso es sólo el remate—, sino
 * la perspectiva: cada tarjeta se inclina en X (el borde superior se aleja),
 * encoge y se atenúa cuanto más lejos está del centro. Todo eso son
 * `transform` + `opacity`, que van al compositor y se sostienen a 60fps.
 *
 * El desenfoque sí es caro sobre una tarjeta con `backdrop-filter` (obliga a
 * recomponer el fondo), así que se limita a ~3px, sólo cerca de los bordes, y
 * SÓLO en dispositivos con puntero fino: en móvil la rueda es puro transform.
 *
 * `offset: ["start end", "end start"]` mide desde que el borde superior de la
 * tarjeta toca el fondo del contenedor (progreso 0, entrando) hasta que su
 * borde inferior toca el techo (progreso 1, saliendo); 0.5 es el centro.
 */
export default function WheelItem({ children, containerRef }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery(HOVER_QUERY);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // El progreso crudo salta con cada muesca de la rueda; el muelle lo alisa.
  const p = useSpring(scrollYProgress, scrollSpring);

  const rotateX = useTransform(p, [0, 0.5, 1], [9, 0, -9]);
  const scale = useTransform(p, [0, 0.5, 1], [0.93, 1, 0.93]);
  const opacity = useTransform(p, [0, 0.16, 0.84, 1], [0.42, 1, 1, 0.42]);
  const blurPx = useTransform(p, [0, 0.2, 0.8, 1], [3, 0, 0, 3]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Reduced-motion: sin rueda. `useScroll` no anima transiciones CSS, así que
  // MotionConfig no lo cubre; hay que apagarlo aquí a mano.
  if (reduce) {
    return <div className="wheel-item">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className="wheel-item"
      style={{
        rotateX,
        scale,
        opacity,
        transformPerspective: 1100,
        transformOrigin: "center center",
        ...(finePointer ? { filter } : null),
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
