import Image from "next/image";
import SectionHeading from "./SectionHeading";
import LogoTile from "@/components/ui/LogoTile";
import { FiArrowUpRight } from "react-icons/fi";
import RichText from "@/lib/RichText";

/**
 * Experiencia: cada puesto en una ficha a todo el ancho. Arriba, quién y
 * cuándo en una línea (logo, empresa, rol, fechas); debajo, qué hice y, al
 * lado, sus webs y el stack. Todo a la vista, sin desplegables: con un solo puesto,
 * esconder los logros detrás de un clic sólo resta.
 *
 * Debajo de la empresa, sus webs públicas (el producto y lo que publiqué), con
 * una nota que dice qué es cada una: un enlace a la portada de la empresa no
 * dice nada de mi trabajo si no se aclara qué parte es mía.
 *
 * El logo de la empresa (y el del producto en su enlace) va en una pastilla
 * clara, igual en los dos temas; es decorativo (`alt` vacío): el nombre ya
 * está escrito al lado.
 */
export default function Experience({ t, pageTitle = false }) {
  /* Con el <h1> de la página, lo de dentro es <h2>; si no, <h3>. */
  const Item = pageTitle ? "h2" : "h3";
  const { ui } = t;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience" title={t.sections.experience.title} pageTitle={pageTitle} />

      <ol className="roles">
        {t.experience.map((role) => (
          <li className="role reveal" key={role.id}>
            {/* Cabecera a todo el ancho: quién y cuándo, en una línea. */}
            <header className="role__head">
              {role.logo && <LogoTile src={role.logo} size="lg" />}
              <div className="role__id">
                <Item className="role__company">{role.company}</Item>
                <p className="role__title">{role.role}</p>
              </div>
              <div className="role__meta">
                <p className="role__when mono">
                  {role.current && <span className="role__current">{ui.currentRole}</span>}
                  {role.date}
                </p>
                <p className="role__where">{role.location}</p>
              </div>
            </header>

            {/* Qué hice, y al lado sus webs públicas y el stack del puesto. */}
            <div className="role__body">
              <ul className="role__bullets">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>
                    <RichText>{bullet}</RichText>
                  </li>
                ))}
              </ul>

              <aside className="role__side">
                {role.links?.length > 0 && (
                  <ul className="role__links" aria-label={ui.roleLinks}>
                    {role.links.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="role-link">
                          <span className="role-link__label">
                            {link.logo && (
                              <Image className="role-link__logo" src={link.logo} alt="" width={40} height={40} />
                            )}
                            {role.linkText[link.id].label}
                            <FiArrowUpRight className="role-link__arrow" aria-hidden="true" />
                          </span>
                          <span className="role-link__note">{role.linkText[link.id].note}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
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
              </aside>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
