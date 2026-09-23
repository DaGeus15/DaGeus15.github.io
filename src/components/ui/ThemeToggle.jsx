"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/lib/theme";
import useContent from "@/lib/useContent";
import { tween } from "@/lib/motion";

/** Cambio de tema. Sigue al navegador salvo que el visitante lo fije. */
export default function ThemeToggle() {
  const { theme, toggleTheme, isDark, followsSystem } = useTheme();
  const { ui } = useContent();
  const mode = isDark ? ui.themeDark : ui.themeLight;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="pref-btn"
      aria-label={isDark ? ui.toLightMode : ui.toDarkMode}
      title={followsSystem ? ui.themeFollows(mode) : ui.themePinned(mode)}
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
