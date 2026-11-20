import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import WorkCard from "@/components/project/WorkCard";
import { pagePath, projectPath } from "@/lib/locales";

/**
 * Trabajo seleccionado: primero de la página, porque con un año de
 * experiencia los sistemas construidos son la prueba más fuerte. Rejilla
 * asimétrica con ocho: KAPHIY (en producción) a todo el ancho, 7 + 5, 5 + 7,
 * otra a todo el ancho y 7 + 5. Si cambia el número, que las filas sigan
 * cerrando: con siete en esta lista, la octava quedaba sola en 5 columnas,
 * pequeña en una esquina. Todos llevan a su caso de estudio. Al final, el
 * resto del código en GitHub.
 *
 * Con `featured`, el resumen del inicio: sólo los destacados (`featured` en
 * projects.js), uno a todo el ancho y dos en 7 + 5, y al final el enlace a la
 * página con todos.
 */
const SIZES = ["wide", "large", "small", "small", "large", "wide", "large", "small"];
const FEATURED_SIZES = ["wide", "large", "small"];

export default function Projects({ t, featured = false, pageTitle = false }) {
  const { ui, lang } = t;
  const labels = { caseStudy: ui.caseStudy, inProduction: ui.inProduction };
  const github = t.social.find((s) => s.id === "github");
  const items = featured ? t.projects.filter((p) => p.featured) : t.projects;
  const sizes = featured ? FEATURED_SIZES : SIZES;
  const heading = featured ? t.sections.featured : t.sections.projects;
  const id = featured ? "featured" : "projects";

  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <SectionHeading id={id} title={heading.title} intro={heading.intro} pageTitle={pageTitle} />

      <ul className="work-grid">
        {items.map((p, i) => (
          <li className="work-grid__item reveal" data-size={sizes[i] ?? "small"} key={p.id}>
            <WorkCard
              size={sizes[i] ?? "small"}
              headingLevel={pageTitle ? 2 : 3}
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
