import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import { getContent } from "@/lib/content";
import { personJsonLd } from "@/lib/jsonLd";
import { homePath, otherLang } from "@/lib/locales";
import { sectionIds } from "@/content/navigation";

/**
 * Página principal: una sola página, una sola forma de leerla. Portada
 * dividida y, debajo, las secciones en el orden de `content/navigation.js`.
 * La navegación es una píldora fija.
 *
 * Es un componente de servidor: el HTML sale completo del build y sólo
 * hidratan las piezas interactivas (navegación, tema, CV, pila 3D, tarjetas
 * de proyecto, formulario).
 */
const SECTIONS = { projects: Projects, experience: Experience, stack: Stack, about: About, contact: Contact };

export default async function Home({ params }) {
  const { lang } = await params;
  const t = getContent(lang);
  const { ui } = t;

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteNav
        variant="home"
        items={t.nav}
        labels={{ mainNav: ui.mainNav, switchLang: ui.switchLang }}
        name={t.profile.name}
        lang={lang}
        langHref={homePath(otherLang(lang))}
      />

      <main id="main" className="page">
        <Hero t={t} />
        {sectionIds.map((id) => {
          const Section = SECTIONS[id];
          return <Section key={id} t={t} />;
        })}
      </main>
      <div className="page">
        <Footer t={t} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(t)) }}
      />
    </>
  );
}
