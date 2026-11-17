"use client";

import { useEffect, useState } from "react";

/**
 * Marca como activa la sección que cruza una línea horizontal al 40% de la
 * altura de la ventana.
 *
 * No se usa "la de mayor proporción visible": una sección más alta que la
 * pantalla (Trabajo) nunca pasa de una proporción baja aunque la ocupe
 * entera, y la navegación se quedaba una sección por detrás. Con una línea,
 * sólo una sección la cruza a la vez y la respuesta no depende de su altura.
 *
 * La línea es una franja del 1% (un `root` de alto cero no da intersecciones
 * fiables). `ids` debe ser estable (una constante de módulo): si cambia, el
 * observer se reconstruye. Arranca sin sección activa: la portada no es una.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!ids.length) return;
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    let height;
    let observer;

    const observe = () => {
      const viewportHeight = document.documentElement.clientHeight;
      if (viewportHeight === height) return;
      height = viewportHeight;
      observer?.disconnect();

      // Los porcentajes de rootMargin se calculan sobre el ancho, incluso
      // en vertical. En píxeles la franja sigue la altura de la ventana.
      const top = Math.round(height * 0.4);
      const bottom = Math.round(height * 0.59);
      const crossing = new Set();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) crossing.add(e.target.id);
            else crossing.delete(e.target.id);
          });
          // En el hueco entre secciones queda la última que se leyó.
          const current = ids.find((id) => crossing.has(id));
          if (current) setActiveId(current);
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 },
      );
      sections.forEach((section) => observer.observe(section));
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
      setActiveId(null);
    };
  }, [ids]);

  return activeId;
}

export default useScrollSpy;
