"use client";

import useScrollSpy from "@/lib/useScrollSpy";
import { sectionIds } from "@/content/navigation";

/**
 * Navegación de la columna fija. Anclas normales (funcionan sin JavaScript y
 * con el scroll suave de `base.css`); el scroll-spy sólo marca la activa.
 *
 * La sección activa alarga su línea (`scaleX`, no `width`) y aclara el texto:
 * es la única pista de "dónde estoy" en una página larga, así que se mueve.
 */
export default function SideNav({ items, label }) {
  // `sectionIds` es una constante de módulo: una lista nueva en cada render
  // reconectaría el observer cada vez.
  const [active] = useScrollSpy(sectionIds);

  return (
    <nav className="side-nav" aria-label={label}>
      <ol>
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`side-nav__link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="side-nav__line" aria-hidden="true" />
                <span className="side-nav__label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
