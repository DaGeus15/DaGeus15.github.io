import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import ProjectCard from "@/components/project/ProjectCard";
import { projectPath } from "@/lib/locales";

/**
 * Proyectos: primero de la página, porque con un año de experiencia son la
 * prueba más fuerte. Los destacados van grandes y en vertical, con su
 * diagrama; el resto, en una lista compacta. Todos llevan a su caso de
 * estudio.
 */
export default function Projects({ t }) {
  const { ui, lang } = t;
  const featured = t.projects.filter((p) => p.featured);
  const others = t.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <SectionHeading
        id="projects"
        title={t.sections.projects.title}
        intro={t.sections.projects.intro}
      />

      <ol className="project-stack">
        {featured.map((project) => (
          <li className="reveal" key={project.id}>
            <ProjectCard project={project} ui={ui} lang={lang} />
          </li>
        ))}
      </ol>

      {others.length > 0 && (
        <div className="project-others reveal">
          <h3 className="subhead">{ui.otherProjects}</h3>
          <ul className="project-list">
            {others.map((p) => (
              <li key={p.id}>
                <Link href={projectPath(lang, p.id)} className="project-row">
                  <span className="project-row__text">
                    <span className="project-row__title">{p.title}</span>
                    <span className="project-row__summary">{p.summary}</span>
                  </span>
                  <span className="project-row__tech mono">{p.tech.slice(0, 3).join(" · ")}</span>
                  <FiArrowUpRight className="project-row__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
