"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import LangSwitch from "./LangSwitch";
import CvDownload from "@/components/ui/CvDownload";
import ThemeToggle from "@/components/ui/ThemeToggle";
import useScrollSpy from "@/lib/useScrollSpy";
import { spring } from "@/lib/motion";
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
 * En la portada lleva las secciones con un indicador que se desliza a la
 * activa (`layoutId`: se anima con transform). En un caso de estudio, la
 * vuelta al portafolio. En los dos, el CV, el idioma y el tema.
 *
 * `labels` son sólo las cadenas que usa: el objeto `ui` entero lleva funciones
 * y no puede cruzar a un componente de cliente.
 */
export default function SiteNav({ variant = "home", items = [], labels, name, homeHref, backHref, lang, langHref }) {
  const isHome = variant === "home";
  const [active] = useScrollSpy(isHome ? SPY_IDS : NO_IDS);

  return (
    <header className="site-nav" data-variant={variant}>
      <nav className="site-nav__pill" aria-label={labels.mainNav}>
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
          <ul className="site-nav__links">
            {items.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id} data-mobile={item.mobile || undefined}>
                  <a
                    href={`#${item.id}`}
                    className="site-nav__link"
                    aria-current={isActive ? "location" : undefined}
                  >
                    {isActive && (
                      <motion.span layoutId="site-nav-active" className="site-nav__active" transition={spring.snappy} />
                    )}
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
