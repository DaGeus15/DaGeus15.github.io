"use client";

import { FiChevronLeft, FiChevronRight, FiHome } from "react-icons/fi";
import { sectionIds } from "@/content/navigation";
import useContent from "@/lib/useContent";

/** Barra prev / inicio / siguiente que aparece en la vista detallada. */
export default function SectionNav({ current, onNavigate, onClose }) {
  const { ui } = useContent();
  const index = sectionIds.indexOf(current);
  const prev = index > 0 ? sectionIds[index - 1] : null;
  const next = index < sectionIds.length - 1 ? sectionIds[index + 1] : null;

  return (
    <nav className="section-nav" aria-label={ui.sectionNav}>
      {prev ? (
        <button className="icon-button" onClick={() => onNavigate(prev)} aria-label={ui.prevSection}>
          <FiChevronLeft size={20} aria-hidden="true" />
        </button>
      ) : (
        <span className="icon-button-placeholder" />
      )}

      <button className="icon-button" onClick={onClose} aria-label={ui.backToSummary}>
        <FiHome size={17} aria-hidden="true" />
      </button>

      {next ? (
        <button className="icon-button" onClick={() => onNavigate(next)} aria-label={ui.nextSection}>
          <FiChevronRight size={20} aria-hidden="true" />
        </button>
      ) : (
        <span className="icon-button-placeholder" />
      )}
    </nav>
  );
}
