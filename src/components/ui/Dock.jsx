"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { spring as springPresets } from "@/lib/motion";

/**
 * Dock estilo macOS: los iconos se agrandan según la distancia al cursor.
 *
 * Ya estaba bien implementado con motion values (sin renders por mousemove),
 * así que se conserva la mecánica. Cambios: usa los presets compartidos, los
 * items llevan `key` estable, y son <button> reales en vez de divs con
 * `role="button"`.
 */
function DockItem({ item, mousePos, distance, magnification, baseItemSize, direction }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mousePos, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return distance;
    return direction === "vertical"
      ? val - rect.y - baseItemSize / 2
      : val - rect.x - baseItemSize / 2;
  });

  /* `scale`, no `width`/`height`. Animar ancho y alto dispara LAYOUT en cada
     fotograma, y con el cursor encima son cuatro elementos recalculándose a
     la vez sobre el hilo principal. `scale` es una transformación: la lleva
     el compositor y no toca el layout.

     A cambio, los vecinos ya no se apartan como en el dock de macOS —el
     hueco de cada icono es fijo—. Con un crecimiento de 44→62 px sobre un
     hueco de 8 px, los iconos apenas se rozan y el efecto se lee igual. */
  const targetScale = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [1, magnification / baseItemSize, 1],
  );
  const scale = useSpring(targetScale, springPresets.dock);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ width: baseItemSize, height: baseItemSize, scale }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={item.onClick}
      className={`dock-item ${item.className || ""}`}
      aria-label={item.label}
      aria-current={item.isActive ? "true" : undefined}
    >
      <span className="dock-icon">{item.icon}</span>
      <DockLabel isHovered={isHovered} direction={direction}>
        {item.label}
      </DockLabel>
    </motion.button>
  );
}

function DockLabel({ children, isHovered, direction }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => isHovered.on("change", (v) => setIsVisible(v === 1)), [isHovered]);

  const props =
    direction === "vertical"
      ? {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -8 },
          style: { left: "100%", top: "50%", y: "-50%", marginLeft: "0.85rem" },
        }
      : {
          initial: { opacity: 0, y: 0 },
          animate: { opacity: 1, y: -8 },
          exit: { opacity: 0, y: 0 },
          style: { x: "-50%", left: "50%", bottom: "100%" },
        };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span {...props} transition={{ duration: 0.16 }} className="dock-label" role="tooltip">
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Dock({
  items,
  className = "",
  magnification = 62,
  distance = 180,
  baseItemSize = 44,
  direction = "horizontal",
}) {
  const mousePos = useMotionValue(Infinity);

  return (
    <div className={`dock-outer dock-${direction}`}>
      <motion.div
        onMouseMove={({ pageX, pageY }) =>
          mousePos.set(direction === "vertical" ? pageY : pageX)
        }
        onMouseLeave={() => mousePos.set(Infinity)}
        className={`dock-panel ${className}`}
        style={{ flexDirection: direction === "vertical" ? "column" : "row" }}
        role="toolbar"
        aria-label="Navegación principal"
      >
        {items.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            mousePos={mousePos}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            direction={direction}
          />
        ))}
      </motion.div>
    </div>
  );
}
