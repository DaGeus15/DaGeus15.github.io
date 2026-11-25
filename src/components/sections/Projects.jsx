import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import WorkCard from "@/components/project/WorkCard";
import { pagePath, projectPath } from "@/lib/locales";

/**
 * Proyectos en dos alturas. Arriba, el mosaico: los proyectos con capturas y
 * caso de estudio (projects.js, hasta unos diez), en 7 + 5 / 5 + 7 para que
 * las filas cierren parejas; los cuatro destacados primero. Debajo, una lista
 * compacta con los trabajos pequeños (moreProjects.js): nombre, resumen,
 * stack y enlaces, sin capturas, para que estén sin ocupar lo mismo.
 *
 * Con `featured`, el resumen del inicio: sólo los cuatro destacados
 * (`featured`, los mismos que el README de GitHub y LinkedIn) y el enlace a
 * la página con todos. Sin él, al final, el resto del código en GitHub.
 */
const SIZES = ["large", "small", "small", "large"];
const sizeAt = (i) => SIZES[i % SIZES.length];
const LIST_TECH = 4;

export default function Projects({ t, featured = false, pageTitle = false }) {
  const { ui, lang } = t;
  const labels = { caseStudy: ui.caseStudy, inProduction: ui.inProduction };
  const github = t.social.find((s) => s.id === "github");
  const main = featured ? t.projects.filter((p) => p.featured) : t.projects;
  const rest = featured ? [] : t.moreProjects;
  const heading = featured ? t.sections.featured : t.sections.projects;
  const id = featured ? "featured" : "projects";
  const level = pageTitle ? 2 : 3;

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <SectionHeading id={id} title={heading.title} intro={heading.intro} pageTitle={pageTitle} />

      <ul className="work-grid">
        {main.map((p, i) => (
          <li className="work-grid__item reveal" data-size={sizeAt(i)} key={p.id}>
            <WorkCard
              size={sizeAt(i)}
              headingLevel={level}
              eager={featured}
              href={projectPath(lang, p.id)}
              labels={labels}
              project={{
                id: p.id,
                title: p.title,
                subtitle: p.subtitle,
                year: p.year,
                status: p.status,
                context: p.context,
                tone: p.tone,
                metrics: p.metrics,
                cover: p.cover,
                inset: p.inset,
              }}
            />
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <div className="work-list reveal">
          <h2 className="work-list__title">{t.sections.projects.more}</h2>
          <ul className="work-list__items">
            {rest.map((p) => {
              const Heading = level === 2 ? "h3" : "h4";
              return (
                <li className="work-row" key={p.id}>
                  <div className="work-row__main">
                    <Heading className="work-row__name">{p.title}</Heading>
                    <span className="work-row__year mono">{p.year}</span>
                  </div>
                  <p className="work-row__summary">{p.summary}</p>
                  <p className="work-row__tech mono">{p.tech.slice(0, LIST_TECH).join(" · ")}</p>
                  {(p.live || p.repo) && (
                    <p className="work-row__links">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-link">
                          {ui.demo}
                          <FiArrowUpRight className="inline-icon" aria-hidden="true" />
                        </a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-link">
                          GitHub
                          <FiArrowUpRight className="inline-icon" aria-hidden="true" />
                        </a>
                      )}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {featured && (
        <p className="work-more reveal">
          <Link href={pagePath(lang, "projects")} className="contact-link">
            {heading.more}
            <FiArrowRight className="contact-link__arrow" aria-hidden="true" />
          </Link>
        </p>
      )}

      {!featured && github && (
        <p className="work-more reveal">
          <a href={github.url} target="_blank" rel="noopener noreferrer" className="contact-link">
            {ui.moreOnGithub}
            <span className="contact-link__handle mono">{github.handle}</span>
            <FiArrowUpRight className="contact-link__arrow" aria-hidden="true" />
          </a>
        </p>
      )}
    </section>
  );
}
