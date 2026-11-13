"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/lib/theme";
import { useControls } from "@/lib/i18n";
import { tween } from "@/lib/motion";

/** Cambio de tema. Sigue al navegador salvo que el visitante lo fije. */
export default function ThemeToggle() {
  const { theme, toggleTheme, isDark, followsSystem } = useTheme();
  const { theme: labels } = useControls();
  const current = labels[theme];

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e.currentTarget)}
      className="pref-btn"
      aria-label={current.toggle}
      title={followsSystem ? current.system : current.pinned}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -6, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 6, opacity: 0, rotate: 30 }}
          transition={tween.fast}
          className="pref-btn__icon"
        >
          {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
