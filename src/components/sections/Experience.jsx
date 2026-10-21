import SectionHeading from "./SectionHeading";
import { FiArrowUpRight } from "react-icons/fi";
import RichText from "@/lib/RichText";

/**
 * Experiencia: cada puesto a dos columnas, quién y cuándo a la izquierda, qué
 * hice a la derecha. Todo a la vista, sin desplegables: con un solo puesto,
 * esconder los logros detrás de un clic sólo resta.
 *
 * Debajo de la empresa, sus webs públicas (el producto y lo que publiqué), con
 * una nota que dice qué es cada una: un enlace a la portada de la empresa no
 * dice nada de mi trabajo si no se aclara qué parte es mía.
 */
export default function Experience({ t }) {
  const { ui } = t;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience" title={t.sections.experience.title} />

      <ol className="roles">
        {t.experience.map((role) => (
          <li className="role reveal" key={role.id}>
            <div className="role__who">
              <h3 className="role__company">{role.company}</h3>
              <p className="role__title">{role.role}</p>
              <p className="role__when mono">
                {role.date}
                {role.current && <span className="role__current">{ui.currentRole}</span>}
              </p>
              <p className="role__where">{role.location}</p>
              {role.links?.length > 0 && (
                <ul className="role__links" aria-label={ui.roleLinks}>
                  {role.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="role-link">
                        <span className="role-link__label">
                          {role.linkText[link.id].label}
                          <FiArrowUpRight className="role-link__arrow" aria-hidden="true" />
                        </span>
                        <span className="role-link__note">{role.linkText[link.id].note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="role__what">
              <ul className="role__bullets">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>
                    <RichText>{bullet}</RichText>
                  </li>
                ))}
              </ul>
              {role.stack?.length > 0 && (
                <div className="role__stack">
                  <span className="role__stack-label">{ui.roleStack}</span>
                  <ul className="role__chips">
                    {role.stack.map((s) => (
                      <li key={s.name} className="role__chip mono">
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
