import { FiArrowUpRight, FiGithub, FiLinkedin } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import CopyEmail from "@/components/ui/CopyEmail";
import ContactForm from "@/components/ui/ContactForm";

const ICONS = { github: FiGithub, linkedin: FiLinkedin };

/**
 * Contacto: el correo a la vista y copiable, los perfiles, y el formulario
 * como segunda opción. Esconder el correo detrás de un formulario obliga al
 * reclutador a escribir en una caja en vez de en su propio correo.
 */
export default function Contact({ t }) {
  const { ui, profile } = t;

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <SectionHeading
        id="contact"
        title={t.sections.contact.title}
        intro={t.sections.contact.intro}
      />

      <div className="contact-direct reveal">
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

      <div className="contact-form-wrap reveal">
        <p className="subhead">{ui.orForm}</p>
        <ContactForm />
      </div>
    </section>
  );
}
