"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import LangSwitch from "./LangSwitch";
import LiquidLens from "./LiquidLens";
import CvDownload from "@/components/ui/CvDownload";
import ThemeToggle from "@/components/ui/ThemeToggle";
import useScrollSpy from "@/lib/useScrollSpy";

/* En el inicio, la única sección de la píldora es el contacto; la portada
   (`#top`) también se observa para que al volver arriba no quede marcado.
   Constante de módulo: una lista nueva en cada render reconectaría el
   observer. */
const HOME_SPY = ["top", "contact"];
const NO_IDS = [];

/**
 * Píldora de navegación: arriba y centrada en escritorio, abajo en móvil
 * (donde está el pulgar). Es lo único que se desplaza por encima del
 * contenido, así que es el único cristal del sitio.
 *
 * En las páginas lleva los enlaces a las demás, con una lente de cristal
 * que se estira hasta la activa (`LiquidLens`): la página en la que se está
 * (`current`) o, en el inicio, el contacto cuando se llega a él. En un caso
 * de estudio o una nota, la vuelta atrás. En todas, el CV, el idioma y el
 * tema.
 *
 * `items` llegan con su `href` resuelto desde el servidor (página o ancla).
 *
 * `labels` son sólo las cadenas que usa: el objeto `ui` entero lleva funciones
 * y no puede cruzar a un componente de cliente.
 */
export default function SiteNav({
  variant = "home",
  current = null,
  items = [],
  labels,
  name,
  mobilePortrait,
  homeHref,
  backHref,
  lang,
  langHref,
}) {
  const isHome = variant === "home";
  const onHomePage = isHome && current === null;
  const [spied] = useScrollSpy(onHomePage ? HOME_SPY : NO_IDS);
  const active = current ?? (spied === "contact" ? "contact" : null);
  const listRef = useRef(null);
  const mobileHome = isHome && (
    <>
      <Image className="site-nav__avatar" src={mobilePortrait} alt="" width={36} height={36} />
      {labels.home}
    </>
  );

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

        {onHomePage ? (
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
              const props = {
                href: item.href,
                "data-id": item.id,
                className: "site-nav__link",
                "aria-current": isActive ? (item.anchor ? "location" : "page") : undefined,
              };
              const label = <span className="site-nav__label">{item.label}</span>;
              return (
                <li key={item.id}>
                  {/* Un ancla del propio inicio es un `<a>`; una página, un
                      `Link` (navegación en el cliente y precarga). */}
                  {item.href.startsWith("#") ? <a {...props}>{label}</a> : <Link {...props}>{label}</Link>}
                </li>
              );
            })}
          </ul>
        )}

        <div className="site-nav__prefs">
          {isHome && (onHomePage ? (
            <a href="#top" className="site-nav__mobile-home" aria-current={active ? undefined : "page"}>
              {mobileHome}
            </a>
          ) : (
            <Link href={homeHref} className="site-nav__mobile-home">
              {mobileHome}
            </Link>
          ))}
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
