"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

/**
 * Copia el correo al portapapeles. Un reclutador suele pegarlo en su propio
 * cliente o en un ATS; `mailto:` abre una app que a menudo no usa.
 *
 * Los dos iconos están siempre en el árbol, superpuestos, y el CSS funde uno
 * en otro con `data-copied` (transiciones, no keyframes: un doble clic
 * reencamina el movimiento en vez de reiniciarlo). Es la única confirmación de
 * "hecho" de la portada; antes el icono cambiaba de golpe.
 */
export default function CopyEmail({ email, label, doneLabel }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* Sin permiso de portapapeles: el correo sigue visible para copiarlo. */
    }
  };

  return (
    <button
      type="button"
      className="icon-btn copy-email"
      data-copied={copied || undefined}
      onClick={copy}
      aria-label={copied ? doneLabel : label}
      title={label}
    >
      <span className="copy-email__icons" aria-hidden="true">
        <FiCopy className="copy-email__copy" />
        <FiCheck className="copy-email__done" />
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? doneLabel : ""}
      </span>
    </button>
  );
}
