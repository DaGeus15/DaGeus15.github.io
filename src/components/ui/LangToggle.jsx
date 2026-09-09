"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import useContent from "@/lib/useContent";
import { tween } from "@/lib/motion";

/**
 * Botón ES/EN. Muestra el idioma AL QUE se cambia, no el actual: en un botón
 * eso se lee como una acción ("ir a EN") y no como una etiqueta de estado
 * ambigua. El `aria-label` lo dice con todas las letras.
 */
export default function LangToggle({ className = "", withLabel = false }) {
  const { lang, toggleLang, followsBrowser } = useLanguage();
  const { ui } = useContent();

  const target = lang === "es" ? "en" : "es";
  const label = target === "en" ? ui.switchToEnglish : ui.switchToSpanish;

  return (
    <button
      onClick={toggleLang}
      className={`${withLabel ? "mobile-drawer__action" : "icon-button"} lang-toggle ${className}`}
      aria-label={label}
      title={followsBrowser ? `${label} · ${ui.langFollows}` : label}
      lang={target}
    >
      {/* Sin `AnimatePresence`: con `mode="wait"` el código nuevo no se monta
          hasta que termina la salida del anterior, y si esa salida se queda a
          medias el botón muestra el idioma equivocado. Al cambiar la `key`,
          React remonta el span y basta con la entrada. */}
      <motion.span
        key={target}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={tween.fast}
        className="lang-toggle__code"
      >
        {target.toUpperCase()}
      </motion.span>
      {withLabel && <span className="lang-toggle__label">{label}</span>}
    </button>
  );
}
