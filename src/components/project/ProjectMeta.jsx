import { FiArrowUpRight, FiLock } from "react-icons/fi";

/**
 * Línea de metadatos de un proyecto: año, distintivos y enlace al código.
 * La comparten la tarjeta y la página del caso de estudio.
 *
 * El enlace al repositorio va por encima del enlace estirado de la tarjeta
 * (`.project-meta__repo` tiene z-index propio), así que se puede pulsar sin
 * abrir el caso de estudio.
 */
export default function ProjectMeta({ project, ui }) {
  return (
    <div className="project-meta mono">
      {project.year && <span className="project-meta__year">{project.year}</span>}
      {project.status === "production" && (
        <span className="badge badge--live">
          <span className="live-dot" aria-hidden="true" />
          {ui.inProduction}
        </span>
      )}
      {project.context && <span className="badge">{project.context}</span>}
      <span className="project-meta__repo">
        {project.repo ? (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="repo-link">
            {ui.sourceCode}
            <FiArrowUpRight aria-hidden="true" />
          </a>
        ) : (
          <span className="repo-private">
            <FiLock aria-hidden="true" />
            {ui.privateCode}
          </span>
        )}
      </span>
    </div>
  );
}
