"use client";

import { useEffect, useState } from "react";

/**
 * Marca como activa la sección que cruza una línea horizontal al 40% de la
 * altura de la ventana.
 *
 * No se usa "la de mayor proporción visible": una sección más alta que la
 * pantalla (Proyectos) nunca pasa de una proporción baja aunque la ocupe
 * entera, y la navegación se quedaba una sección por detrás. Con una línea,
 * sólo una sección la cruza a la vez y la respuesta no depende de su altura.
 *
 * La línea es una franja del 1% (un `root` de alto cero no da intersecciones
 * fiables). `ids` debe ser estable (una constante de módulo): si cambia, el
 * observer se reconstruye.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    const crossing = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) crossing.add(e.target.id);
          else crossing.delete(e.target.id);
        });
        // Entre dos secciones (en el hueco) no cruza ninguna: se mantiene la
        // última, que es la que se acaba de leer.
        const current = ids.find((id) => crossing.has(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return [activeId];
}

export default useScrollSpy;
