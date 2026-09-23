import Backdrop from "@/components/backgrounds/Backdrop";
import MobileBar from "@/components/layout/MobileBar";
import Intro from "@/components/layout/Intro";
import Footer from "@/components/layout/Footer";
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
 * Página principal: una sola página, una sola forma de leerla. Columna fija a
 * la izquierda (quién soy, navegación, CV) y las secciones a la derecha, en el
 * orden de `content/navigation.js`.
 *
 * Es un componente de servidor: el HTML sale completo del build y sólo
 * hidratan las piezas interactivas (navegación, tema, CV, formulario,
 * tarjetas con halo, diagramas).
 */
const SECTIONS = { projects: Projects, experience: Experience, stack: Stack, about: About, contact: Contact };

export default async function Home({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <>
      <a href="#main" className="skip-link">
        {t.ui.skipToContent}
      </a>
      <Backdrop />
      <MobileBar t={t} langHref={homePath(otherLang(lang))} />

      <div className="page">
        <Intro t={t} />
        <main id="main" className="page__main">
          {sectionIds.map((id) => {
            const Section = SECTIONS[id];
            return <Section key={id} t={t} />;
          })}
          <Footer t={t} />
        </main>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(t)) }}
      />
    </>
  );
}
