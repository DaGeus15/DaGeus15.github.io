"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { spring } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Fondo: papel de ingeniería. Una cuadrícula de puntos estática, dos
 * resplandores estáticos (frío arriba, cálido abajo) y, con ratón, una zona
 * de la cuadrícula que se enciende en el color del acento bajo el cursor.
 *
 * Nada de esto repinta al mover el ratón. La zona encendida es un círculo
 * (`.backdrop__lit`) que se desplaza con `transform`; dentro lleva una
 * cuadrícula del tamaño de la pantalla desplazada en sentido CONTRARIO
 * (`.backdrop__lit-grid`), de modo que sus puntos quedan exactamente encima de
 * los de la base. Dos transforms opuestos: el compositor hace todo el trabajo.
 *
 * El árbol es siempre el mismo en servidor y cliente; en táctil el círculo
 * simplemente no se mueve de fuera de la pantalla.
 */
export default function Backdrop() {
  const mouseX = useMotionValue(-2000);
  const mouseY = useMotionValue(-2000);
  const x = useSpring(mouseX, spring.cursor);
  const y = useSpring(mouseY, spring.cursor);
  const innerX = useTransform(x, (v) => -v);
  const innerY = useTransform(y, (v) => -v);

  useEffect(() => {
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__glow" />
      <div className="backdrop__grid" />
      <motion.div className="backdrop__lit" style={{ x, y }}>
        <motion.div className="backdrop__lit-grid" style={{ x: innerX, y: innerY }} />
      </motion.div>
    </div>
  );
}
