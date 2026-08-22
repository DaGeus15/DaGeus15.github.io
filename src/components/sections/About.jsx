"use client";

import { FiCpu, FiBookOpen } from "react-icons/fi";
import Section from "./Section";
import RichText from "@/lib/RichText";
import profile from "@/content/profile";
import { setup, hobbies } from "@/content/setup";

function Bio({ paragraphs }) {
  return (
    <>
      {paragraphs.map((text, i) => (
        <p className="section-text" key={i}>
          <RichText>{text}</RichText>
        </p>
      ))}
      <p className="section-text">
        <strong>Residencia:</strong> {profile.location} (Nacionalidad: {profile.nationality})
      </p>
    </>
  );
}

export default function About({ isExpanded, onExpand }) {
  return (
    <Section
      id="about"
      title="Sobre Mí"
      isExpanded={isExpanded}
      onExpand={onExpand}
      expandLabel="Ver más intereses y setup"
      summary={<Bio paragraphs={profile.bioShort} />}
      detail={
        <>
          <Bio paragraphs={[...profile.bioShort, ...profile.bioExtra]} />

          <h3 className="detail-title">
            <FiCpu size={18} aria-hidden="true" /> Mi Setup de Hardware
          </h3>
          <div className="setup-grid">
            {setup.map((card) => (
              <article className={`setup-card ${card.wide ? "is-wide" : ""}`} key={card.title}>
                <h4>{card.title}</h4>
                {card.specs.map(([label, value]) => (
                  <p key={label}>
                    <strong>{label}:</strong> {value}
                  </p>
                ))}
                {card.note && <p className="setup-note">{card.note}</p>}
              </article>
            ))}
          </div>

          <h3 className="detail-title">
            <FiBookOpen size={18} aria-hidden="true" /> Hobbies e Intereses
          </h3>
          <ul className="hobbies-list">
            {hobbies.map((h) => (
              <li key={h.title}>
                <strong>{h.title}:</strong> <RichText>{h.detail}</RichText>
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
}
