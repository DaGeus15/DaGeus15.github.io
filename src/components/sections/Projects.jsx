"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiFolder, FiGithub } from "react-icons/fi";
import Section from "./Section";
import projects, { getLanguageColor } from "@/content/projects";
import { staggerContainer, staggerItem, spring } from "@/lib/motion";

const slug = (i) => `project-${i}`;

/** En la tarjeta sólo caben unas pocas insignias; el stack completo va en la ficha. */
const CARD_TECH_COUNT = 4;

function TechBadges({ items, size }) {
  return (
    <ul className={`tech-badges ${size === "lg" ? "tech-badges--lg" : ""}`}>
      {items.map((t) => (
        <li className="tech-badge" key={t}>
          {t}
        </li>
      ))}
    </ul>
  );
}

function LangIndicator({ lang }) {
  return (
    <span className="lang-indicator">
      <span
        className="lang-dot"
        style={{ backgroundColor: getLanguageColor(lang) }}
        aria-hidden="true"
      />
      {lang}
    </span>
  );
}

function ProjectCard({ project }) {
  const shown = project.tech.slice(0, CARD_TECH_COUNT);
  const rest = project.tech.length - shown.length;

  return (
    <motion.article
      className="project-card"
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={spring.snappy}
    >
      <header className="project-card__header">
        <FiFolder size={18} className="repo-icon" aria-hidden="true" />
        <div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__subtitle">{project.subtitle}</p>
        </div>
      </header>

      <p className="project-card__desc">{project.summary}</p>

      <footer className="project-card__footer">
        <LangIndicator lang={project.lang} />
        <div className="tech-badges-row">
          <TechBadges items={shown} />
          {rest > 0 && <span className="tech-more">+{rest}</span>}
        </div>
      </footer>
    </motion.article>
  );
}

/**
 * Ficha detallada de un proyecto.
 *
 * El layout de escritorio (contenido a la izquierda, captura a la derecha)
 * lo define `.project-showcase__body` en `sections.css`.
 */
function ProjectShowcase({ project, index }) {
  return (
    <article className="project-showcase" id={slug(index)}>
      <header className="project-showcase__header">
        <div className="project-showcase__title-row">
          <span className="project-showcase__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <FiFolder size={20} className="repo-icon" aria-hidden="true" />
          <div>
            <h3>{project.title}</h3>
            <p className="project-showcase__subtitle">{project.subtitle}</p>
          </div>
        </div>
        <TechBadges items={project.tech} size="lg" />
      </header>

      <div className={`project-showcase__body ${project.image ? "has-media" : ""}`}>
        <div className="project-showcase__cols">
          <div className="details-col">
            <h4>Descripción del Sistema</h4>
            {project.description.map((para, i) => (
              <p className="section-text" key={i}>
                {para}
              </p>
            ))}
          </div>

          <div className="details-col">
            <h4>Ficha Técnica</h4>
            <dl className="spec-list">
              <dt>Lenguaje principal</dt>
              <dd>
                <LangIndicator lang={project.lang} />
              </dd>
              <dt>Mi rol</dt>
              <dd>{project.role}</dd>
              {project.repo && (
                <>
                  <dt>Repositorio</dt>
                  <dd>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-link"
                    >
                      <FiGithub size={15} aria-hidden="true" />
                      {project.repo.replace("https://github.com/", "")}
                    </a>
                  </dd>
                </>
              )}
            </dl>
          </div>
        </div>

        {/* Sin imagen no se pinta nada: un recuadro punteado vacío se lee como
            una promesa incumplida, y el texto aprovecha mejor todo el ancho.
            Basta con rellenar `image` en content/projects.js para recuperarla. */}
        {project.image && (
          <figure className="project-showcase__media">
            <Image
              src={project.image}
              alt={`Captura de ${project.title}`}
              width={720}
              height={450}
              className="project-shot"
            />
          </figure>
        )}
      </div>
    </article>
  );
}

export default function Projects({ isExpanded, onExpand }) {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section
      id="projects"
      title="Proyectos Destacados"
      isExpanded={isExpanded}
      onExpand={onExpand}
      expandLabel="Ver fichas técnicas completas"
      summary={
        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {projects.map((p) => (
            <ProjectCard project={p} key={p.title} />
          ))}
        </motion.div>
      }
      detail={
        <>
          <p className="section-text">
            Fichas técnicas de los proyectos desarrollados, con su arquitectura, el
            stack empleado y mi aportación en cada uno.
          </p>

          <nav className="quick-nav" aria-label="Ir a un proyecto">
            {projects.map((p, i) => (
              <a
                href={`#${slug(i)}`}
                key={p.title}
                className="quick-nav__link"
                onClick={(e) => scrollTo(e, slug(i))}
              >
                <span className="quick-nav__num">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.short}</span>
              </a>
            ))}
          </nav>

          <div className="showcase-stack">
            {projects.map((p, i) => (
              <ProjectShowcase project={p} index={i} key={p.title} />
            ))}
          </div>
        </>
      }
    />
  );
}
