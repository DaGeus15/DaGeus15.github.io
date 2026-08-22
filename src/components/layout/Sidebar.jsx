"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import Dock from "@/components/ui/Dock";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ProfileCard from "./ProfileCard";
import navIcons from "./icons";
import sections from "@/content/navigation";
import { cardEnter, cardExit } from "@/lib/motion";

/**
 * Barra lateral de escritorio.
 *
 * Dos disposiciones:
 *   - resumida  → perfil completo + dock horizontal + controles pequeños
 *   - detallada → columna estrecha fija: foto arriba, dock vertical al
 *                 centro, controles abajo
 */
export default function Sidebar({ activeSection, onNavigate, isExpanded, onToggleExpand }) {
  const navItems = sections.map((section) => {
    const Icon = navIcons[section.icon];
    const isActive = activeSection === section.id;
    return {
      id: section.id,
      label: section.label,
      isActive,
      className: isActive ? "is-active" : "",
      icon: <Icon size={20} aria-hidden="true" />,
      onClick: () => onNavigate(section.id),
    };
  });

  // Las dos variantes se funden entre sí mientras el raíl cambia de tamaño
  // por CSS. Sin esto, los hijos compactos aparecían de golpe dentro de un
  // contenedor que todavía medía 360px de ancho.
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {isExpanded ? (
        <motion.div
          key="compact"
          className="sidebar-inner is-compact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: cardEnter }}
          exit={{ opacity: 0, transition: cardExit }}
        >
          <div className="sidebar-top">
            <ProfileCard isCompact />
          </div>
          <div className="sidebar-center">
            <Dock items={navItems} direction="vertical" magnification={54} />
          </div>
          <div className="sidebar-bottom">
            <ThemeToggle className="is-small" size={17} />
            <button
              className="icon-button"
              onClick={onToggleExpand}
              aria-label="Volver a vista resumida"
              title="Vista resumida"
            >
              <FiMinimize2 size={17} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="full"
          className="sidebar-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: cardEnter }}
          exit={{ opacity: 0, transition: cardExit }}
        >
          <ProfileCard />
          <Dock items={navItems} direction="horizontal" />
          <div className="sidebar-actions">
            <ThemeToggle className="is-small" size={17} />
            <button
              className="icon-button"
              onClick={onToggleExpand}
              aria-label="Ver vista detallada"
              title="Vista detallada"
            >
              <FiMaximize2 size={17} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
