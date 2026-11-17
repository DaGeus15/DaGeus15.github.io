"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import GlassBackdrop from "./GlassBackdrop";
import LangSwitch from "./LangSwitch";
import LiquidLens from "./LiquidLens";
import useGlassInk from "./useGlassInk";
import CvDownload from "@/components/ui/CvDownload";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { homePath, notePath, otherLang, pagePath, projectPath } from "@/lib/locales";
import { spring } from "@/lib/motion";
import useScrollSpy from "@/lib/useScrollSpy";

/* En el inicio, la única sección de la píldora es el contacto; la portada
   (`#top`) también se observa para que al volver arriba no quede marcado.
   Constante de módulo: una lista nueva en cada render reconectaría el
   observer. */
const HOME_SPY = ["top", "contact"];
const NO_IDS = [];

/** La barra vive en el layout para que la lente conserve su posición entre páginas. */
export default function SiteNav({ items, labels, name, mobilePortrait, lang }) {
  const [section, id] = useSelectedLayoutSegments();
  const isDetail = Boolean(id);
  const onHomePage = !section;
  const spied = useScrollSpy(onHomePage ? HOME_SPY : NO_IDS);
  const active = onHomePage ? (spied === "contact" ? "contact" : null) : section;
  const homeHref = homePath(lang);
  const alternate = otherLang(lang);
  const langHref = isDetail
    ? (section === "projects" ? projectPath(alternate, id) : notePath(alternate, id))
    : section ? pagePath(alternate, section) : homePath(alternate);
  const navRef = useRef(null);
  const routeKey = `${section ?? ""}/${id ?? ""}`;
  useGlassInk(navRef, routeKey);
  const listRef = useRef(null);
  const reflectionCenter = useRef(null);
  const reflectionX = useMotionValue(0);
  const reflectionSpring = useSpring(reflectionX, spring.snappy);
  const reflectionTransform = useTransform(reflectionSpring, (x) => `translateX(${x}px)`);

  function startReflection(event) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce), (prefers-contrast: more)").matches) {
      reflectionCenter.current = null;
      return;
    }
    const { left, width } = event.currentTarget.getBoundingClientRect();
    reflectionCenter.current = left + width / 2;
    const x = event.clientX - reflectionCenter.current;
    reflectionX.jump(x);
    reflectionSpring.jump(x);
  }

  function moveReflection(event) {
    if (event.pointerType !== "mouse" || reflectionCenter.current === null) return;
    reflectionX.set(event.clientX - reflectionCenter.current);
  }

  const mobileHome = !isDetail && (
    <>
      <span className="site-nav__avatar">
        <Image src={mobilePortrait} alt="" width={40} height={40} />
      </span>
      <span className="site-nav__label">{labels.home}</span>
    </>
  );

  return (
    <header className="site-nav" data-variant={isDetail ? "case" : "home"}>
      <nav
        className="site-nav__pill"
        ref={navRef}
        aria-label={labels.mainNav}
        onPointerEnter={startReflection}
        onPointerMove={moveReflection}
      >
        {/* El cristal va en su propia capa, detrás del contenido: así la
            píldora no es un "backdrop root" y el menú del CV, que vive dentro,
            puede ser cristal de verdad. El filtro óptico sólo toma muestras
            dentro de la forma de la barra. */}
        <span className="site-nav__glass" aria-hidden="true">
          <GlassBackdrop className="site-nav__glass-blur" />
          <motion.span className="site-nav__reflection" style={{ transform: reflectionTransform }} />
        </span>
        {isDetail && (
          <Link href={pagePath(lang, section)} className="site-nav__back">
            <FiArrowLeft aria-hidden="true" />
            <span className="site-nav__label">{labels.back}</span>
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

        {!isDetail && (
          <ul className="site-nav__links" ref={listRef}>
            {/* La lente vive en la lista (posicionada respecto a ella), en un
                `li` sin caja ni semántica para que la lista siga siendo válida. */}
            <li className="site-nav__lens" role="presentation" aria-hidden="true">
              <LiquidLens listRef={listRef} active={active} />
            </li>
            {items.map((item) => {
              const isActive = item.id === active;
              const props = {
                href: item.anchor
                  ? `${onHomePage ? "" : homeHref}#${item.id}`
                  : pagePath(lang, item.id),
                "data-id": item.id,
                className: "site-nav__link",
                "aria-current": isActive ? (item.anchor ? "location" : "page") : undefined,
              };
              const label = <span className="site-nav__label">{item.label}</span>;
              return (
                <li key={item.id}>
                  {/* Un ancla del propio inicio es un `<a>`; una página, un
                      `Link` (navegación en el cliente y precarga). */}
                  {props.href.startsWith("#") ? <a {...props}>{label}</a> : <Link {...props}>{label}</Link>}
                </li>
              );
            })}
          </ul>
        )}

        <div className="site-nav__prefs">
          {!isDetail && (onHomePage ? (
            <a href="#top" className="site-nav__mobile-home" aria-current={active ? undefined : "page"}>
              {mobileHome}
            </a>
          ) : (
            <Link href={homeHref} className="site-nav__mobile-home">
              {mobileHome}
            </Link>
          ))}
          <div className="site-nav__cv">
            <CvDownload key={routeKey} compact placement="down" />
          </div>
          <LangSwitch lang={lang} href={langHref} label={labels.switchLang} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
