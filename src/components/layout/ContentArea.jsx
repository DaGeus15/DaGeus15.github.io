"use client";

import { motion, AnimatePresence } from "framer-motion";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import SectionNav from "./SectionNav";
import { cardVariants } from "@/lib/motion";

/**
 * Registro de secciones.
 * Para añadir una nueva: creá su componente, agregalo aquí y sumá la entrada
 * correspondiente en `src/content/navigation.js`. Nada más.
 */
const SECTION_COMPONENTS = {
  about: About,
  experience: Experience,
  projects: Projects,
  contact: Contact,
};

/**
 * Área de contenido.
 *
 * AnimatePresence recibe SIEMPRE un único hijo: o la pila resumida completa,
 * o la sección expandida. Todos ellos caen en la misma celda de grid
 * (`.content-view`), así que entrante y saliente se superponen exactamente y
 * el cambio es un fundido cruzado limpio.
 *
 * Antes se le pasaba una lista de tarjetas con `mode="popLayout"`, contando
 * con que Framer sacara la saliente del flujo. No lo hacía: las dos quedaban
 * en `position: relative` dentro de la misma columna flex, se repartían el
 * `flex: 1` a mitad de altura cada una y la entrante aparecía debajo de la
 * saliente antes de saltar a su sitio.
 */
export default function ContentArea({ expandedSection, onExpand, onCollapse }) {
  const isExpanded = expandedSection !== null;
  const ExpandedSection = isExpanded ? SECTION_COMPONENTS[expandedSection] : null;

  return (
    <div className={`content-stack ${isExpanded ? "is-expanded" : ""}`}>
      {isExpanded && (
        <SectionNav current={expandedSection} onNavigate={onExpand} onClose={onCollapse} />
      )}

      <div className="content-view">
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <ExpandedSection
              key={expandedSection}
              isExpanded
              onExpand={() => onExpand(expandedSection)}
            />
          ) : (
            <motion.div
              key="summary"
              className="summary-stack"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {Object.entries(SECTION_COMPONENTS).map(([id, SectionComponent]) => (
                <SectionComponent key={id} isExpanded={false} onExpand={() => onExpand(id)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
