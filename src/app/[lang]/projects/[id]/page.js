import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiLock } from "react-icons/fi";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram";
import Metrics from "@/components/project/Metrics";
import ShotStage from "@/components/project/ShotStage";
import Gallery from "@/components/project/Gallery";
import Frame from "@/components/project/Frame";
import RichText from "@/lib/RichText";
import { getContent } from "@/lib/content";
import { LANGS, OG_IMAGE, homePath, otherLang, projectPath } from "@/lib/locales";
import { projectIds } from "@/content/projects";

/**
 * Caso de estudio: una página por proyecto y por idioma, con URL propia para
 * enlazarla desde LinkedIn o un CV, e indexable. Estructura de informe
 * técnico: qué es y para quién, cómo está hecho, qué hace, un problema real y
 * cómo se resolvió, las capturas, qué hice yo y con qué.
 *
 * Aquí está TODO el contenido de cada proyecto; la portada sólo resume.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const project = getContent(lang).projects.find((p) => p.id === id);

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: projectPath(lang, id),
      languages: Object.fromEntries(LANGS.map((l) => [l, projectPath(l, id)])),
    },
    // `openGraph` de una página REEMPLAZA al del layout (no se fusiona): hay
    // que repetir la imagen o el enlace de un proyecto sale sin vista previa.
    openGraph: {
      title: project.title,
      description: project.summary,
      url: projectPath(lang, id),
      images: [OG_IMAGE],
    },
  };
}

/** Bloque del informe: el rótulo a la izquierda (fijo al desplazar) y el
    contenido a la derecha; `wide` pone el contenido a todo el ancho. */
function CaseSection({ title, wide = false, children }) {
  return (
    <section className="case-section reveal" data-wide={wide || undefined}>
      <h2 className="case-section__title">{title}</h2>
      <div className="case-section__body">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }) {
  const { lang, id } = await params;
  const t = getContent(lang);
  const { ui } = t;
  const index = t.projects.findIndex((p) => p.id === id);
  const project = t.projects[index];
  const next = t.projects[(index + 1) % t.projects.length];
  const langHref = projectPath(otherLang(lang), id);

  const shots = project.gallery.map((s) => ({ ...s, openLabel: ui.openShot(s.caption) }));

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteNav
        variant="case"
        labels={{ mainNav: ui.mainNav, switchLang: ui.switchLang, back: ui.backHome }}
        name={t.profile.name}
        homeHref={homePath(lang)}
        backHref={`${homePath(lang)}#projects`}
        lang={lang}
        langHref={langHref}
      />

      <main id="main" className="page case">
        <header className="case-hero">
          <p className="case-hero__meta mono enter" style={{ "--i": 0 }}>
            <span>{project.year}</span>
            {project.status === "production" && <span className="case-hero__live">{ui.inProduction}</span>}
            {project.context && <span>{project.context}</span>}
          </p>
          <h1 className="case-hero__title enter" style={{ "--i": 1 }}>
            {project.title}
          </h1>
          <p className="case-hero__subtitle enter" style={{ "--i": 2 }}>
            {project.subtitle}
          </p>
        </header>

        <div className="case-cover enter" style={{ "--i": 3 }} data-tone={project.tone}>
          <ShotStage cover={project.cover} inset={project.inset} eager />
        </div>

        <div className="case-intro enter" style={{ "--i": 4 }}>
          <p className="case-intro__lead">{project.summary}</p>
          <dl className="case-facts">
            <div>
              <dt>{ui.year}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>{ui.context}</dt>
              <dd>{project.client}</dd>
            </div>
            {project.team && (
              <div>
                <dt>{ui.team}</dt>
                <dd>{ui.teamOf(project.team)}</dd>
              </div>
            )}
            <div>
              <dt>{ui.code}</dt>
              <dd>
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                    GitHub
                    <FiArrowUpRight className="inline-icon" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="case-facts__private">
                    <FiLock aria-hidden="true" />
                    {ui.privateCode}
                  </span>
                )}
              </dd>
            </div>
            {project.live && (
              <div>
                <dt>{ui.live}</dt>
                <dd>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link">
                    {new URL(project.live).host}
                    <FiArrowUpRight className="inline-icon" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="reveal">
          <Metrics metrics={project.metrics} large />
        </div>

        <CaseSection title={ui.theSystem}>
          <p className="prose">
            <RichText>{project.description[0]}</RichText>
          </p>
        </CaseSection>

        {project.diagram && (
          <CaseSection title={ui.architecture} wide>
            <ArchitectureDiagram
              diagram={project.diagram}
              labels={project.nodes}
              title={`${ui.architecture}: ${project.title}`}
              legend={{ sync: ui.sync, async: ui.async }}
            />
          </CaseSection>
        )}

        {project.description[1] && (
          <CaseSection title={ui.decisions}>
            <p className="prose">
            <RichText>{project.description[1]}</RichText>
          </p>
          </CaseSection>
        )}

        {project.features?.length > 0 && (
          <CaseSection title={ui.features}>
            <ul className="feature-list">
              {project.features.map((f) => (
                <li key={f}>
                  <RichText>{f}</RichText>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        {project.challenge && (
          <CaseSection title={ui.challenge}>
            <h3 className="challenge__title">{project.challenge.title}</h3>
            <p className="prose">
              <RichText>{project.challenge.body}</RichText>
            </p>
          </CaseSection>
        )}

        {shots.length > 0 && (
          <CaseSection title={ui.gallery} wide>
            <Gallery shots={shots} labels={{ prev: ui.prevShot, next: ui.nextShot, close: ui.closeShot }} />
          </CaseSection>
        )}

        <CaseSection title={ui.myRole}>
          <p className="prose">{project.role}</p>
          {project.scope && (
            <p className="scope-note">
              <span className="scope-note__label">{ui.scope}</span>
              {project.scope}
            </p>
          )}
        </CaseSection>

        <CaseSection title={ui.stack}>
          <ul className="tech-grid">
            {project.tech.map((tech) => (
              <li key={tech} className="mono">
                {tech}
              </li>
            ))}
          </ul>
        </CaseSection>

        <Link href={projectPath(lang, next.id)} className="next-project reveal">
          <span className="next-project__text">
            <span className="next-project__label">{ui.nextProject}</span>
            <span className="next-project__title">
              {next.title}
              <FiArrowRight aria-hidden="true" />
            </span>
            <span className="next-project__line">{next.subtitle}</span>
          </span>
          <span className="next-project__media" aria-hidden="true">
            <Frame shot={next.cover} />
          </span>
        </Link>
      </main>
      <div className="page">
        <Footer t={t} />
      </div>
    </>
  );
}
