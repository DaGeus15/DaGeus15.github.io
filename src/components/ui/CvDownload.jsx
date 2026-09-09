"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Magnetic from "@/components/ui/Magnetic";
import useContent from "@/lib/useContent";
import { spring, tween } from "@/lib/motion";

/**
 * Botón de CV con las DOS versiones, español e inglés.
 *
 * No se elige por el idioma de la interfaz a propósito: quien mira el sitio en
 * español puede querer el CV en inglés para mandarlo fuera, y al revés. Que lo
 * decida quien descarga.
 *
 * El menú se cierra al pulsar fuera y con Escape. `pointerdown` en lugar de
 * `click` para que se cierre antes de que el gesto termine, que es como se
 * comportan los menús del sistema.
 */
export default function CvDownload({ isCompact = false }) {
  const { profile, ui } = useContent();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const opciones = [
    { href: profile.cvEs, label: ui.cvSpanish, code: "ES", lang: "es" },
    { href: profile.cvEn, label: ui.cvEnglish, code: "EN", lang: "en" },
  ];

  return (
    <div className={`cv-download ${isCompact ? "is-compact" : ""}`} ref={wrapRef}>
      <Magnetic range={45} strength={0.3}>
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`cv-button ${isCompact ? "is-compact" : ""}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.snappy}
          aria-label={ui.downloadCv}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <FiDownload size={isCompact ? 18 : 14} aria-hidden="true" />
          {!isCompact && <span>{ui.downloadCv}</span>}
        </motion.button>
      </Magnetic>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cv-menu"
            role="menu"
            aria-label={ui.cvChoose}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={tween.fast}
          >
            {opciones.map((o) => (
              <a
                key={o.code}
                href={o.href}
                download
                role="menuitem"
                className="cv-menu__item"
                onClick={() => setOpen(false)}
              >
                <span className="cv-menu__code" aria-hidden="true">
                  {o.code}
                </span>
                <span lang={o.lang}>{o.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
