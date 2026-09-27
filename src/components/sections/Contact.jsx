import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import CopyEmail from "@/components/ui/CopyEmail";
import ContactForm from "@/components/ui/ContactForm";

const ICONS = { github: FiGithub, linkedin: FiLinkedin };

/**
 * Contacto: el correo grande, a la vista y copiable, los perfiles, y el
 * formulario al lado como segunda opción. Esconder el correo detrás de un
 * formulario obliga al reclutador a escribir en una caja en vez de en su
 * propio correo.
 */
export default function Contact({ t }) {
  const { ui, profile } = t;

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__direct reveal">
        <h2 className="contact__title" id="contact-title">
          {t.sections.contact.title}
        </h2>
        <p className="contact__intro">{t.sections.contact.intro}</p>

        <div className="contact-email">
          <a href={`mailto:${profile.email}`} className="contact-email__link">
            {profile.email}
          </a>
          <CopyEmail email={profile.email} label={ui.copyEmail} doneLabel={ui.copied} />
        </div>

        <ul className="contact-links">
          {t.social.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="contact-link">
                  {Icon && <Icon aria-hidden="true" />}
                  <span>{s.name}</span>
                  <span className="contact-link__handle mono">{s.handle}</span>
                  <FiArrowUpRight className="contact-link__arrow" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="contact__form reveal">
        <h3 className="contact__form-title">{ui.orForm}</h3>
        <ContactForm />
      </div>
    </section>
  );
}
