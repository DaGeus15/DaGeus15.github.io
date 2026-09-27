import SectionHeading from "./SectionHeading";
import WorkCard from "@/components/project/WorkCard";
import { projectPath } from "@/lib/locales";

/**
 * Trabajo seleccionado: primero de la página, porque con un año de
 * experiencia los sistemas construidos son la prueba más fuerte. Rejilla
 * asimétrica: KAPHIY (en producción) a todo el ancho y los otros cuatro en
 * 7 + 5 / 5 + 7. Todos llevan a su caso de estudio.
 */
const SIZES = ["wide", "large", "small", "small", "large"];

export default function Projects({ t }) {
  const { ui, lang } = t;
  const labels = { caseStudy: ui.caseStudy, inProduction: ui.inProduction };

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
    </section>
  );
}
