"use client";

import { useRef } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import LangSwitch from "./LangSwitch";
import LiquidLens from "./LiquidLens";
import CvDownload from "@/components/ui/CvDownload";
import ThemeToggle from "@/components/ui/ThemeToggle";
import useScrollSpy from "@/lib/useScrollSpy";
import { sectionIds } from "@/content/navigation";

/* La portada (`#top`) también se observa: al volver arriba no queda marcada
   ninguna sección. Constante de módulo: una lista nueva en cada render
   reconectaría el observer. */
const SPY_IDS = ["top", ...sectionIds];
const NO_IDS = [];

/**
 * Píldora de navegación: arriba y centrada en escritorio, abajo en móvil
 * (donde está el pulgar). Es lo único que se desplaza por encima del
 * contenido, así que es el único cristal del sitio.
 *
 * En la portada lleva las secciones con una lente de cristal que se estira
 * hasta la activa (`LiquidLens`). En un caso de estudio, la vuelta al
 * portafolio. En los dos, el CV, el idioma y el tema.
 *
 * `labels` son sólo las cadenas que usa: el objeto `ui` entero lleva funciones
 * y no puede cruzar a un componente de cliente.
 */
export default function SiteNav({ variant = "home", items = [], labels, name, homeHref, backHref, lang, langHref }) {
  const isHome = variant === "home";
  const [active] = useScrollSpy(isHome ? SPY_IDS : NO_IDS);
  const listRef = useRef(null);

  return (
    <header className="site-nav" data-variant={variant}>
      <nav className="site-nav__pill" aria-label={labels.mainNav}>
        {/* El cristal va en su propia capa, detrás del contenido: así la
            píldora no es un "backdrop root" y el menú del CV, que vive dentro,
            puede ser cristal de verdad. La capa es más alta que la píldora
            (hacia donde llega el contenido) para que el color se acerque
            antes de pasar por debajo; ver `.site-nav__glass` en nav.css. */}
        <span className="site-nav__glass" aria-hidden="true">
          <span className="site-nav__glass-blur" />
        </span>
        {!isHome && (
          <Link href={backHref} className="site-nav__back">
            <FiArrowLeft aria-hidden="true" />
            <span>{labels.back}</span>
          </Link>
        )}

        {isHome ? (
          <a href="#top" className="site-nav__name">
            {name}
          </a>
        ) : (
          <Link href={homeHref} className="site-nav__name">
            {name}
          </Link>
        )}

        {isHome && (
          <ul className="site-nav__links" ref={listRef}>
            {/* La lente vive en la lista (posicionada respecto a ella), en un
                `li` sin caja ni semántica para que la lista siga siendo válida. */}
            <li className="site-nav__lens" role="presentation" aria-hidden="true">
              <LiquidLens listRef={listRef} active={active} />
            </li>
            {items.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id} data-mobile={item.mobile || undefined}>
                  <a
                    href={`#${item.id}`}
                    data-id={item.id}
                    className="site-nav__link"
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span className="site-nav__label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className="site-nav__prefs">
          <div className="site-nav__cv">
            <CvDownload compact placement="down" />
          </div>
          <LangSwitch lang={lang} href={langHref} label={labels.switchLang} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
