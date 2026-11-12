import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiAward, FiMic, FiUsers } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import LogoTile from "@/components/ui/LogoTile";
import { projectPath } from "@/lib/locales";

const KIND_ICON = { competition: FiAward, congress: FiMic, community: FiUsers };

/**
 * Competencias y congresos: lo que hizo por gusto, fuera del trabajo y de las
 * clases. Una fila por evento, como el índice de notas: el año y el tipo a la
 * izquierda (mono, con su icono), el nombre, quién lo organizó y una línea a
 * la derecha.
 *
 * Cada evento con el logo de quien lo organizó (`content/logos.js`).
 *
 * La fila no es un enlace: si de un evento salió un proyecto, el enlace a su
 * caso va aparte, en texto. Al pasar el puntero, el velo de lectura (marca
 * qué se lee, no adónde lleva).
 */
export default function Journey({ t }) {
  const { ui, lang } = t;

  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <SectionHeading id="journey" title={t.sections.journey.title} intro={t.sections.journey.intro} />

      <ol className="journey">
        {t.activities.map((a) => {
          const Icon = KIND_ICON[a.kind];
          return (
            <li className="journey__row reveal" key={a.id}>
              <p className="journey__meta mono">
                <span>{a.year}</span>
                <span className="journey__kind">
                  <Icon aria-hidden="true" />
                  {a.kindLabel}
                </span>
              </p>
              <div className="journey__body">
                <div className="journey__head">
                  <LogoTile src={a.logo} icon={Icon} />
                  <h3 className="journey__title">{a.title}</h3>
                </div>
                <p className="journey__org">{a.org}</p>
                <p className="journey__note">{a.note}</p>
                {a.project && (
                  <Link href={projectPath(lang, a.project)} className="role-link journey__link">
                    <span className="role-link__label">
                      {ui.caseStudy}
                      <FiArrowRight className="role-link__arrow" aria-hidden="true" />
                    </span>
                  </Link>
                )}
                {a.url && (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="role-link journey__link">
                    <span className="role-link__label">
                      {new URL(a.url).hostname.replace(/^www\./, "")}
                      <FiArrowUpRight className="role-link__arrow" aria-hidden="true" />
                    </span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
