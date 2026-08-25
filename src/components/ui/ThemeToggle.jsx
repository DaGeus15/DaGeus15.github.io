"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/lib/theme";
import { tween } from "@/lib/motion";

/** Botón de cambio de tema con el icono animado. */
export default function ThemeToggle({ className = "", size = 18 }) {
  const { theme, toggleTheme, isDark, followsSystem } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={
        followsSystem
          ? `Modo ${isDark ? "oscuro" : "claro"}, siguiendo al navegador`
          : `Modo ${isDark ? "oscuro" : "claro"} fijado — volvé a cambiarlo para seguir al navegador`
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -40, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ y: 8, opacity: 0, rotate: 40, scale: 0.9 }}
          transition={tween.fast}
          className="theme-toggle-icon"
        >
          {isDark ? (
            <FiSun size={size} className="theme-toggle-sun" />
          ) : (
            <FiMoon size={size} className="theme-toggle-moon" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
