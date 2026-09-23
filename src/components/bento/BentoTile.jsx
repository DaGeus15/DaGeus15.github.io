"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";

/**
 * Tarjeta de la rejilla bento: relleno elevado + filo que se enciende donde
 * está el cursor + reflejo estático.
 *
 * El brillo del filo NO reconstruye un degradado por fotograma. Es un círculo
 * pintado una sola vez (`.bento-tile__glow`) dentro de un anillo de 1px
 * recortado con máscara (`.bento-tile__rim`); lo único que cambia al mover el
 * ratón es su `transform`, que lleva el compositor. Es la misma técnica que
 * la cuadrícula encendida de `Backdrop.jsx`, en pequeño.
 *
 * El rectángulo se mide UNA vez al entrar, no en cada `pointermove`: medir en
 * cada evento fuerza un cálculo de layout por movimiento. Si se hace scroll con
 * el cursor encima, la medida caduca y se repite en el siguiente movimiento.
 *
 * Sin `backdrop-filter`: superficie opaca con borde de 1px. El cristal sólo
 * queda en la barra móvil (ver AGENTS.md).
 *
 * `layer` (core | data | cloud) elige el color semántico vía `data-layer`.
 * `hoverScale`: 1.025 en tarjetas pequeñas; en una grande (un proyecto) ese
 * factor son 20px de más y tapa a las vecinas, así que baja a ~1.006.
 */
export default function BentoTile({
  layer,
  className = "",
  hoverScale = 1.025,
  children,
  ...props
}) {
  const rect = useRef(null);
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const gx = useSpring(x, spring.cursor);
  const gy = useSpring(y, spring.cursor);

  return (
    <motion.article
      className={`bento-tile ${className}`}
      data-layer={layer}
      onPointerEnter={(e) => {
        rect.current = e.currentTarget.getBoundingClientRect();
        // Sin esto el halo entraría deslizándose desde la última posición
        // (o desde -999): aparece ya donde está el cursor.
        if (e.pointerType === "mouse") {
          x.jump(e.clientX - rect.current.left);
          y.jump(e.clientY - rect.current.top);
          gx.jump(x.get());
          gy.jump(y.get());
        }
      }}
      onWheel={() => {
        rect.current = null;
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        rect.current ??= e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.current.left);
        y.set(e.clientY - rect.current.top);
      }}
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { scale: 1, y: 0 }, hover: { scale: hoverScale, y: -2 } }}
      transition={spring.snappy}
      {...props}
    >
      <span className="bento-tile__rim" aria-hidden="true">
        <motion.span className="bento-tile__glow" style={{ x: gx, y: gy }} />
      </span>
      <span className="bento-tile__wash" aria-hidden="true">
        <motion.span className="bento-tile__glow" style={{ x: gx, y: gy }} />
      </span>
      <span className="bento-tile__sheen" aria-hidden="true" />
      {children}
    </motion.article>
  );
}
