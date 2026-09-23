import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import BentoTile from "@/components/bento/BentoTile";
import ArchitectureDiagram from "./ArchitectureDiagram";
import ProjectMeta from "./ProjectMeta";
import Metrics from "./Metrics";
import { projectPath } from "@/lib/locales";

/**
 * Proyecto destacado. Toda la tarjeta lleva al caso de estudio con el patrón
 * de enlace estirado: el `<a>` es el título y su `::after` cubre la tarjeta,
 * así el enlace tiene un nombre legible ("KAPHIY") y no hay enlaces anidados.
 * El del repositorio queda por encima (ver `ProjectMeta`).
 */
export default function ProjectCard({ project, ui, lang }) {
  return (
    <BentoTile className="project-card" hoverScale={1.006}>
      <ProjectMeta project={project} ui={ui} />

      <div className="project-card__heading">
        <h3 className="project-card__title">
          <Link href={projectPath(lang, project.id)} className="stretched-link">
            {project.title}
          </Link>
        </h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>

      <p className="project-card__summary">{project.summary}</p>

      {project.diagram && (
        <ArchitectureDiagram
          diagram={project.diagram}
          labels={project.nodes}
          title={`${ui.architecture}: ${project.title}`}
        />
      )}

      <Metrics metrics={project.metrics} />

      <ul className="tag-list" aria-label={ui.stack}>
        {project.tech.map((tech) => (
          <li className="tag" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <span className="project-card__cta" aria-hidden="true">
        {ui.caseStudy}
        <FiArrowRight />
      </span>
    </BentoTile>
  );
}
