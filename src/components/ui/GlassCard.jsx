"use client";

import { motion } from "framer-motion";

/**
 * Tarjeta de vidrio esmerilado (liquid glass).
 *
 * Reemplaza al antiguo `LiquidGlassCard`, que por cada instancia:
 *   - inyectaba un <svg> con `filter id="glass-blur"` — 4 tarjetas producían
 *     4 IDs duplicados en el DOM (HTML inválido);
 *   - aplicaba `feDisplacementMap scale="200"` sobre una capa que ya tenía
 *     `backdrop-filter`, una de las operaciones más caras de pintar;
 *   - y ese filtro había que desactivarlo en modo claro porque generaba una
 *     sombra negra.
 *
 * El look de macOS no viene de la distorsión sino del blur + saturación alta
 * + un borde superior claro de 1px. Todo eso vive ahora en `cards.css` y no
 * cuesta nada en rendimiento.
 */
export default function GlassCard({ children, className = "", ...props }) {
  return (
    <motion.section className={`glass-card ${className}`} {...props}>
      {children}
    </motion.section>
  );
}
