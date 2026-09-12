"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { sectionIds } from "@/content/navigation";
import { backdropSpring } from "@/lib/motion";

/**
 * Progreso 0→1 que mueve la escena de fondo (colores y órbitas).
 *
 * En la vista resumida es el scroll del panel. En la detallada no hay un
 * scroll común, así que es la posición de la sección abierta en el menú:
 * cambiar de sección también mueve la escena.
 *
 * Un solo muelle para todos los que lo leen, para que colores y órbitas no se
 * desfasen entre sí. Arranca en 0 en servidor y cliente.
 */
export default function useBackdropProgress(scrollRef, expandedSection) {
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, backdropSpring);

  useEffect(() => {
    if (expandedSection !== null) {
      const i = sectionIds.indexOf(expandedSection);
      progress.set(i < 0 ? 0 : i / Math.max(1, sectionIds.length - 1));
      return;
    }

    const el = scrollRef?.current;
    if (!el) return;

    const medir = () => {
      const recorrido = el.scrollHeight - el.clientHeight;
      progress.set(recorrido > 0 ? el.scrollTop / recorrido : 0);
    };

    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [expandedSection, scrollRef, progress]);

  return smooth;
}
