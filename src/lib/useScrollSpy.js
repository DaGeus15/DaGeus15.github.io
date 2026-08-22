"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marca como activa la sección más cercana al centro del viewport.
 *
 * A diferencia de la versión anterior, el `root` se resuelve dinámicamente
 * (el contenedor de scroll cambia entre escritorio y móvil) y el observer se
 * reconstruye cuando cambian las secciones o el contenedor.
 *
 * @param {string[]} ids            IDs de las secciones a observar
 * @param {object}   options
 * @param {string}   options.rootSelector  Selector del contenedor de scroll
 * @param {boolean}  options.enabled       Desactiva el spy (ej. en modo detallado)
 */
export function useScrollSpy(ids, { rootSelector, enabled = true } = {}) {
  const [activeId, setActiveId] = useState(ids[0] ?? null);
  // Permite fijar la sección manualmente (click en el nav) sin que el
  // observer la pise durante el scroll suave.
  const lockedUntil = useRef(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const root = rootSelector ? document.querySelector(rootSelector) : null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil.current) return;

        // Nos quedamos con la entrada visible de mayor proporción, así el
        // resultado es estable cuando dos secciones se solapan.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { root, rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootSelector, enabled]);

  /** Fija la sección activa e ignora el observer durante `ms`. */
  const lockActive = (id, ms = 700) => {
    lockedUntil.current = Date.now() + ms;
    setActiveId(id);
  };

  return [activeId, lockActive];
}

export default useScrollSpy;
