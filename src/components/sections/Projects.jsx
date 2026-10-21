import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import WorkCard from "@/components/project/WorkCard";
import { projectPath } from "@/lib/locales";

/**
 * Trabajo seleccionado: primero de la página, porque con un año de
 * experiencia los sistemas construidos son la prueba más fuerte. Rejilla
 * asimétrica: KAPHIY (en producción) a todo el ancho, cuatro en 7 + 5 / 5 + 7
 * y el sexto cierra otra vez a todo el ancho. Con un número impar en medio
 * quedaría una tarjeta de 5 columnas sola. Todos llevan a su caso de estudio.
 * Al final, el resto del código en GitHub, para quien quiera más que seis.
 */
const SIZES = ["wide", "large", "small", "small", "large", "wide"];

export default function Projects({ t }) {
  const { ui, lang } = t;
  const labels = { caseStudy: ui.caseStudy, inProduction: ui.inProduction };
  const github = t.social.find((s) => s.id === "github");

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <SectionHeading id="projects" title={t.sections.projects.title} intro={t.sections.projects.intro} />

      <ul className="work-grid">
        {t.projects.map((p, i) => (
          <li className="work-grid__item reveal" data-size={SIZES[i] ?? "small"} key={p.id}>
            <WorkCard
              size={SIZES[i] ?? "small"}
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

      {github && (
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
