"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import SpecularButton from "@/components/ui/SpecularButton";
import { cardVariants, cardEnter, cardExit } from "@/lib/motion";

/**
 * Envoltorio común de todas las secciones.
 *
 * Sólo se monta la vista activa (resumen o detalle), así que no hay contenido
 * duplicado ni botones ocultos alcanzables con Tab.
 *
 * Nota sobre animación: la tarjeta NO lleva `layout`. El tamaño del marco lo
 * gobierna CSS (ver el armazón fijo en `layout.css`); si además Framer
 * proyectara el layout, aplicaría un `scale` inverso encima y el contenido se
 * vería estirado durante la transición.
 *
 * @param {ReactNode} summary   Contenido de la vista resumida
 * @param {ReactNode} detail    Contenido de la vista detallada
 * @param {string}    expandLabel  Texto del botón "ver más"
 */
export default function Section({
  id,
  title,
  isExpanded,
  onExpand,
  summary,
  detail,
  expandLabel,
}) {
  // Sólo la sección expandida es hijo directo de AnimatePresence y necesita
  // variantes propias. En la vista resumida las tarjetas viven dentro de un
  // contenedor que ya se funde, y animarlas otra vez daría un doble fundido.
  const presenceProps = isExpanded
    ? { variants: cardVariants, initial: "initial", animate: "animate", exit: "exit" }
    : { initial: false };

  return (
    <GlassCard
      id={id}
      className={`content-card ${isExpanded ? "is-expanded" : ""}`}
      {...presenceProps}
      aria-labelledby={`${id}-title`}
    >
      <header className="section-header">
        <h2 className="section-title" id={`${id}-title`}>
          {title}
        </h2>
        <span className="section-divider" />
      </header>

      {/* `mode="popLayout"` saca la vista saliente del flujo al instante, así
          la entrante no tiene que esperar a que termine el fundido. Con
          `mode="wait"` la tarjeta quedaba visiblemente vacía entre ambas. */}
      <AnimatePresence mode="popLayout" initial={false}>
        {isExpanded ? (
          <motion.div
            key="detail"
            className="section-body section-body--detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: cardEnter }}
            exit={{ opacity: 0, transition: cardExit }}
          >
            {detail}
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            className="section-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: cardEnter }}
            exit={{ opacity: 0, transition: cardExit }}
          >
            {summary}
            {detail && onExpand && (
              <div className="expand-btn-wrapper">
                <SpecularButton onClick={onExpand}>{expandLabel}</SpecularButton>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
