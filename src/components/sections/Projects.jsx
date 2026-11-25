import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import WorkCard from "@/components/project/WorkCard";
import { pagePath, projectPath } from "@/lib/locales";

/**
 * Proyectos en dos alturas. Los cuatro destacados (`featured` en
 * projects.js) son tarjetas grandes en 7 + 5 / 5 + 7, en el inicio y en
 * Proyectos: los mismos que el README de GitHub y LinkedIn. En Proyectos, el
 * resto va debajo como lista compacta (título, resumen, stack y enlaces):
 * se ven todos sin que cada uno ocupe una tarjeta con capturas. Todos llevan
 * a su caso de estudio.
 *
 * Con `featured`, el resumen del inicio: sólo las tarjetas y el enlace a la
 * página con todos. Sin él, al final, el resto del código en GitHub.
 */
const SIZES = ["large", "small", "small", "large"];
const LIST_TECH = 4;

export default function Projects({ t, featured = false, pageTitle = false }) {
  const { ui, lang } = t;
  const labels = { caseStudy: ui.caseStudy, inProduction: ui.inProduction };
  const github = t.social.find((s) => s.id === "github");
  const main = t.projects.filter((p) => p.featured);
  const rest = featured ? [] : t.projects.filter((p) => !p.featured);
  const heading = featured ? t.sections.featured : t.sections.projects;
  const id = featured ? "featured" : "projects";
  const level = pageTitle ? 2 : 3;

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <SectionHeading id={id} title={heading.title} intro={heading.intro} pageTitle={pageTitle} />

      <ul className="work-grid">
        {main.map((p, i) => (
          <li className="work-grid__item reveal" data-size={SIZES[i] ?? "small"} key={p.id}>
            <WorkCard
              size={SIZES[i] ?? "small"}
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
                    <Heading className="work-row__name">
                      <Link href={projectPath(lang, p.id)} className="work-row__link">
                        {p.title}
                      </Link>
                    </Heading>
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
