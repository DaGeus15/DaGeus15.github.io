import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Backdrop from "@/components/backgrounds/Backdrop";
import MobileBar from "@/components/layout/MobileBar";
import LangSwitch from "@/components/layout/LangSwitch";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ArchitectureDiagram from "@/components/project/ArchitectureDiagram";
import ProjectMeta from "@/components/project/ProjectMeta";
import Metrics from "@/components/project/Metrics";
import { getContent } from "@/lib/content";
import { LANGS, OG_IMAGE, homePath, otherLang, projectPath } from "@/lib/locales";
import { projectIds } from "@/content/projects";

/**
 * Caso de estudio: una página por proyecto y por idioma, con URL propia para
 * enlazarla desde LinkedIn o un CV, e indexable. Estructura de informe
 * técnico: qué es, qué se decidió y por qué, qué hice yo, con qué.
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

export default async function CaseStudy({ params }) {
  const { lang, id } = await params;
  const t = getContent(lang);
  const { ui } = t;
  const index = t.projects.findIndex((p) => p.id === id);
  const project = t.projects[index];
  const next = t.projects[(index + 1) % t.projects.length];
  const langHref = projectPath(otherLang(lang), id);

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <Backdrop />
      <MobileBar t={t} langHref={langHref} />

      <main id="main" className="case">
        <nav className="case__bar enter" style={{ "--i": 0 }}>
          <Link href={`${homePath(lang)}#projects`} className="back-link">
            <FiArrowLeft aria-hidden="true" />
            {ui.backHome}
          </Link>
          <div className="case__prefs">
            <LangSwitch lang={lang} href={langHref} label={ui.switchLang} />
            <ThemeToggle />
          </div>
        </nav>

        <header className="case__head">
          <div className="enter" style={{ "--i": 1 }}>
            <ProjectMeta project={project} ui={ui} />
          </div>
          <h1 className="case__title enter" style={{ "--i": 2 }}>
            {project.title}
          </h1>
          <p className="case__subtitle enter" style={{ "--i": 3 }}>
            {project.subtitle}
          </p>
        </header>

        {project.diagram && (
          <section className="case__figure enter" style={{ "--i": 4 }} aria-label={ui.architecture}>
            <ArchitectureDiagram
              diagram={project.diagram}
              labels={project.nodes}
              title={`${ui.architecture}: ${project.title}`}
              legend={{ sync: ui.sync, async: ui.async }}
            />
          </section>
        )}

        <div className="enter" style={{ "--i": 5 }}>
          <Metrics metrics={project.metrics} large />
        </div>

        <section className="case__section reveal">
          <h2 className="subhead">{ui.theSystem}</h2>
          <p className="prose">{project.description[0]}</p>
        </section>

        {project.description[1] && (
          <section className="case__section reveal">
            <h2 className="subhead">{ui.decisions}</h2>
            <p className="prose">{project.description[1]}</p>
          </section>
        )}

        <section className="case__section reveal">
          <h2 className="subhead">{ui.myRole}</h2>
          <p className="prose">{project.role}</p>
        </section>

        <section className="case__section reveal">
          <h2 className="subhead">{ui.stack}</h2>
          <ul className="tag-list">
            {project.tech.map((tech) => (
              <li className="tag" key={tech}>
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <Link href={projectPath(lang, next.id)} className="next-project reveal">
          <span className="mono">{ui.nextProject}</span>
          <span className="next-project__title">
            {next.title}
            <FiArrowRight aria-hidden="true" />
          </span>
        </Link>

        <Footer t={t} />
      </main>
    </>
  );
}
