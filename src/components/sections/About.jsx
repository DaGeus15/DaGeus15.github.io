import { FiArrowUpRight, FiAward, FiBookOpen, FiGlobe } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import RichText from "@/lib/RichText";
import LogoTile from "@/components/ui/LogoTile";

/**
 * Sobre mí: la bio breve y la ficha de formación, certificaciones e idiomas,
 * cada una con su icono (el mismo trazo que el resto). El retrato vive en la
 * portada; repetirlo aquí no aporta. Las competencias y los hobbies tienen su
 * sección debajo, en esta misma página (Journey, Hobbies).
 */
export default function About({ t, pageTitle = false }) {
  const { ui, education, profile } = t;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionHeading
        id="about"
        title={t.sections.about.title}
        pageTitle={pageTitle}
      />

      <div className="about">
        <div className="about__text">
          <div className="reveal">
            {profile.summary.map((text) => (
              <p className="prose about__lead" key={text}>
                <RichText>{text}</RichText>
              </p>
            ))}
          </div>
        </div>

        <div className="facts reveal">
          <div className="fact">
            <h3 className="fact__head">
              <FiBookOpen aria-hidden="true" />
              {ui.education}
            </h3>
            <div className="fact__row">
              <LogoTile src={education.logo} icon={FiBookOpen} />
              <div>
                <p className="fact__title">{education.degree}</p>
                <p className="fact__meta">{education.school}</p>
              </div>
            </div>
            <p className="fact__note">
              {ui.coursework}: {education.coursework}
            </p>
          </div>

          <div className="fact">
            <h3 className="fact__head">
              <FiGlobe aria-hidden="true" />
              {ui.languages}
            </h3>
            <dl className="fact-list">
              {t.languages.map((l) => (
                <div key={l.name}>
                  <dt className="fact__title">{l.name}</dt>
                  <dd className="fact__meta">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="fact fact--wide">
            <h3 className="fact__head">
              <FiAward aria-hidden="true" />
              {ui.certifications}
            </h3>
            <ul className="fact-list fact-list--grid">
              {t.certifications.map((cert) => (
                <li key={cert.id} className="fact__row">
                  <LogoTile src={cert.logo} icon={FiAward} size="sm" />
                  <div>
                    <p className="fact__title">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link"
                        >
                          {cert.title}
                          <FiArrowUpRight
                            className="inline-icon"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </p>
                    <p className="fact__meta mono">{cert.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
