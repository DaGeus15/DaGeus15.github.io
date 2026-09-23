"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

/**
 * Copia el correo al portapapeles. Un reclutador suele pegarlo en su propio
 * cliente o en un ATS; `mailto:` abre una app que a menudo no usa.
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
    <button type="button" className="icon-btn" onClick={copy} aria-label={copied ? doneLabel : label} title={label}>
      {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? doneLabel : ""}
      </span>
    </button>
  );
}
