"use client";

import { useCallback, useState } from "react";
import Aurora from "@/components/backgrounds/Aurora";
import Spotlight from "@/components/backgrounds/Spotlight";
import Sidebar from "@/components/layout/Sidebar";
import { MobileHeader, MobileDrawer } from "@/components/layout/MobileNav";
import ContentArea from "@/components/layout/ContentArea";
import { sectionIds } from "@/content/navigation";
import useMediaQuery from "@/lib/useMediaQuery";
import useMounted from "@/lib/useMounted";
import useScrollSpy from "@/lib/useScrollSpy";
import { MOBILE_QUERY } from "@/lib/breakpoints";
import { SHELL_MS } from "@/lib/motion";

export default function Home() {
  const mounted = useMounted();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const [expandedSection, setExpandedSection] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeSection, lockActive] = useScrollSpy(sectionIds, {
    rootSelector: ".content-pane",
    enabled: expandedSection === null,
  });

  const scrollToSection = useCallback((id, behavior = "smooth") => {
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  }, []);

  /** Click en el nav: en vista resumida hace scroll, en detallada cambia de sección. */
  const handleNavigate = useCallback(
    (id) => {
      lockActive(id);
      setIsMenuOpen(false);

      if (expandedSection !== null) {
        setExpandedSection(id);
      } else {
        scrollToSection(id);
      }
    },
    [expandedSection, lockActive, scrollToSection],
  );

  const handleExpand = useCallback(
    (id) => {
      lockActive(id);
      setExpandedSection(id);
    },
    [lockActive],
  );

  const handleCollapse = useCallback(() => {
    const target = expandedSection;
    setExpandedSection(null);
    if (!target) return;

    // El armazón tarda --dur-shell en volver a su sitio y el ancho del panel
    // cambia durante ese tiempo, así que la posición final de la tarjeta se
    // mueve mientras dura la transición. Se ancla al terminar; el salto es
    // instantáneo (no "smooth") para que no compita con el morfeo.
    requestAnimationFrame(() => scrollToSection(target, "auto"));
    setTimeout(() => scrollToSection(target, "auto"), SHELL_MS + 20);
  }, [expandedSection, scrollToSection]);

  const toggleExpand = useCallback(() => {
    if (expandedSection !== null) {
      handleCollapse();
    } else {
      setExpandedSection(activeSection || sectionIds[0]);
    }
    setIsMenuOpen(false);
  }, [expandedSection, activeSection, handleCollapse]);

  const isDetailed = expandedSection !== null;

  return (
    <>
      <Aurora />
      <Spotlight />

      <MobileHeader isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((o) => !o)} />

      <div
        className={`mobile-scrim ${isMenuOpen ? "is-open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <main className={`portfolio ${isDetailed ? "is-detailed" : ""}`}>
        {/* Sin `layout`: la geometría del raíl la anima CSS. Con proyección
            de Framer, pasar de 360px en flujo a 88px fijo se traducía en un
            `scaleX` que aplastaba la foto y el dock. */}
        <aside
          id="mobile-drawer"
          className={`portfolio__sidebar ${isDetailed ? "is-compact" : ""} ${isMenuOpen ? "is-open" : ""}`}
        >
          {/* Hasta que sabemos el ancho real renderizamos la variante de
              escritorio, que es la que coincide con el HTML estático. */}
          {mounted && isMobile ? (
            <MobileDrawer
              activeSection={activeSection}
              onNavigate={handleNavigate}
              isExpanded={isDetailed}
              onToggleExpand={toggleExpand}
            />
          ) : (
            <Sidebar
              activeSection={activeSection}
              onNavigate={handleNavigate}
              isExpanded={isDetailed}
              onToggleExpand={toggleExpand}
            />
          )}
        </aside>

        <div className={`portfolio__content content-pane ${isDetailed ? "is-detailed" : ""}`}>
          <ContentArea
            expandedSection={expandedSection}
            onExpand={handleExpand}
            onCollapse={handleCollapse}
          />
        </div>
      </main>
    </>
  );
}
