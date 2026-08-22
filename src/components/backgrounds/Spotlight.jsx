"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { spring } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Halo radial suave que sigue al cursor.
 * Usa motion values, así que no provoca renders de React al mover el ratón.
 */
export default function Spotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const x = useSpring(mouseX, spring.soft);
  const y = useSpring(mouseY, spring.soft);

  useEffect(() => {
    // Sólo en dispositivos con puntero fino: en táctil no aporta nada
    // y evitamos suscribirnos a eventos innecesarios.
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, var(--spotlight-color) 0%, transparent 75%)`;

  return <motion.div className="spotlight" style={{ background }} aria-hidden="true" />;
}
