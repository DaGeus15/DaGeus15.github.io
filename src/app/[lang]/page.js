import PageShell from "@/components/layout/PageShell";
import Hero, { HeroIntro } from "@/components/hero/Hero";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import { getContent } from "@/lib/content";
import { personJsonLd } from "@/lib/jsonLd";

/**
 * Inicio: lo que un reclutador con 30 segundos necesita sin hacer clic.
 * Quién es (portada), la prueba (tres proyectos destacados, con el enlace a
 * los siete) y cómo escribirle. Lo demás tiene su página: Proyectos,
 * Experiencia, Sobre mí y Notas, en la píldora.
 *
 * Es un componente de servidor: el HTML sale completo del build y sólo
 * hidratan las piezas interactivas (navegación, tema, CV, tarjetas,
 * formulario).
 */
export default async function Home({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <>
      <HeroIntro profile={t.profile} />
      <PageShell t={t}>
        <Hero t={t} />
        <Projects t={t} featured />
        <Contact t={t} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(t)) }}
        />
      </PageShell>
    </>
  );
}
