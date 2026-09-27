import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import RichText from "@/lib/RichText";

/**
 * Sobre mí: el retrato, la bio breve y la ficha de formación,
 * certificaciones e idiomas. Sin hobbies ni hardware: no le dicen nada a
 * quien contrata.
 */
export default function About({ t }) {
  const { ui, education, profile } = t;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionHeading id="about" title={t.sections.about.title} />

      <div className="about">
        <figure className="about__portrait reveal">
          <Image src={profile.avatar} alt={profile.name} width={480} height={660} sizes="(min-width: 1024px) 26rem, 90vw" />
        </figure>

        <div className="about__text">
          <div className="reveal">
            {profile.summary.map((text) => (
              <p className="prose about__lead" key={text}>
                <RichText>{text}</RichText>
              </p>
            ))}
          </div>

          <div className="facts reveal">
            <div className="fact">
              <h3 className="fact__head">{ui.education}</h3>
              <p className="fact__title">{education.degree}</p>
              <p className="fact__meta">{education.school}</p>
              <p className="fact__note">
                {ui.coursework}: {education.coursework}
              </p>
            </div>

            <div className="fact">
              <h3 className="fact__head">{ui.languages}</h3>
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
              <h3 className="fact__head">{ui.certifications}</h3>
              <ul className="fact-list fact-list--grid">
                {t.certifications.map((cert) => (
                  <li key={cert.title}>
                    <p className="fact__title">
                      {cert.url ? (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-link">
                          {cert.title}
                          <FiArrowUpRight className="inline-icon" aria-hidden="true" />
                        </a>
                      ) : (
                        cert.title
                      )}
                    </p>
                    <p className="fact__meta mono">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
