"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import useContent from "@/lib/useContent";
import { tween } from "@/lib/motion";

/**
 * CTA principal: el CV, en sus dos versiones. No se elige por el idioma de la
 * página a propósito: quien lee en español puede querer el CV en inglés para
 * mandarlo fuera.
 *
 * El menú se cierra al pulsar fuera y con Escape; `pointerdown` para que se
 * cierre antes de que el gesto termine, como los menús del sistema.
 */
export default function CvDownload() {
  const { profile, ui, lang } = useContent();
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

  const es = { href: profile.cvEs, label: ui.cvSpanish, code: "ES", lang: "es" };
  const en = { href: profile.cvEn, label: ui.cvEnglish, code: "EN", lang: "en" };
  // El del idioma de la página, primero.
  const options = lang === "en" ? [en, es] : [es, en];

  return (
    <div className="cv-download" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn btn--primary cv-button"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <FiDownload aria-hidden="true" />
        {ui.downloadCv}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cv-menu"
            role="menu"
            aria-label={ui.cvChoose}
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={tween.fast}
          >
            {options.map((o) => (
              <a
                key={o.code}
                href={o.href}
                download
                role="menuitem"
                className="cv-menu__item"
                onClick={() => setOpen(false)}
              >
                <span className="cv-menu__code mono" aria-hidden="true">
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
