"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Atrae el elemento hacia el cursor al pasar por encima.
 *
 * La versión anterior guardaba la posición en `useState`, lo que provocaba
 * un render de React en CADA evento de mousemove. Esta usa motion values, que
 * escriben directo al DOM sin pasar por el ciclo de render.
 */
export default function Magnetic({ children, range = 45, strength = 0.32 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring.snappy);
  const springY = useSpring(y, spring.snappy);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    // En pantallas táctiles no hay cursor que seguir.
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const dx = e.clientX - (left + width / 2);
    const dy = e.clientY - (top + height / 2);

    if (Math.hypot(dx, dy) < range) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: "inline-flex" }}
    >
      {children}
    </motion.div>
  );
}
