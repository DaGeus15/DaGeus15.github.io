import { ViewTransition } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Frame from "./Frame";

/**
 * Tarjeta de proyecto de la portada: título, una línea, dos cifras y sus
 * capturas en marco. Nada más: el stack, la arquitectura y el detalle están
 * en el caso de estudio, a un clic. Así la portada no repite lo mismo cinco
 * veces.
 *
 * Toda la tarjeta lleva al caso con el enlace estirado (el `<a>` es el
 * título). Con ratón responde con UN gesto: su filo atrapa la luz donde está
 * el puntero (`data-rim`, ver SpecularRim.jsx). Antes además se inclinaba y
 * la captura pequeña se movía aparte: cuatro efectos a la vez en la misma
 * tarjeta se leían como demo, no como respuesta. Sin estado ni efectos, es
 * un componente de servidor.
 */
/** Lo que mide cada captura en la tarjeta: con esto el navegador elige
    archivo antes de maquetar. Medido a 390 y a 1440. */
const SIZES = {
  window: "(min-width: 1024px) 42rem, 92vw",
  phone: "15rem",
  inset: "9.5rem",
};

export default function WorkCard({ project, href, size, labels, headingLevel = 3 }) {
  const Title = `h${headingLevel}`;
  const { cover, inset, metrics = [] } = project;
  const layout = cover.mobile ? "phones" : "window";

  return (
    <article className="work-card" data-rim data-size={size} data-tone={project.tone} data-layout={layout}>
      <div className="work-card__body">
        <p className="work-card__meta mono">
          <span>{project.year}</span>
          {project.status === "production" && <span className="work-card__live">{labels.inProduction}</span>}
          {project.context && <span>{project.context}</span>}
        </p>
        <Title className="work-card__title">
          <Link href={href} className="stretched-link">
            {project.title}
          </Link>
        </Title>
        <p className="work-card__line">{project.subtitle}</p>

        {metrics.length > 0 && (
          <dl className="work-card__metrics">
            {metrics.slice(0, 2).map((m) => (
              <div className="work-card__metric" key={m.key}>
                <dt>{m.label}</dt>
                <dd className="mono">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <span className="work-card__cta" aria-hidden="true">
          {labels.caseStudy}
          <FiArrowRight />
        </span>
      </div>

      <div className="work-card__media" aria-hidden="true">
        <div className="work-card__stage">
          {/* Mismo nombre que la portada del caso: al abrirlo, la captura
              crece desde aquí (ShotStage.jsx). */}
          <ViewTransition name={`cover-${project.id}`} share="morph">
            <Frame shot={cover} className="work-card__cover" sizes={cover.mobile ? SIZES.phone : SIZES.window} />
          </ViewTransition>
          {inset && (
            <span className="work-card__inset">
              <Frame shot={inset} sizes={SIZES.inset} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
