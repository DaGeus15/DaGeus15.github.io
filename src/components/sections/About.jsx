"use client";

import { FiCpu, FiBookOpen } from "react-icons/fi";
import Section from "./Section";
import RichText from "@/lib/RichText";
import useContent from "@/lib/useContent";

function Bio({ paragraphs, profile, ui }) {
  return (
    <>
      {paragraphs.map((text, i) => (
        <p className="section-text" key={i}>
          <RichText>{text}</RichText>
        </p>
      ))}
      <p className="section-text">
        <strong>{ui.residence}</strong> {profile.location}{" "}
        {ui.nationality(profile.nationality)}
      </p>
    </>
  );
}

export default function About({ isExpanded, onExpand }) {
  const { profile, ui, setup, hobbies, sectionCopy } = useContent();
  const copy = sectionCopy.about;

  return (
    <Section
      id="about"
      title={copy.title}
      isExpanded={isExpanded}
      onExpand={onExpand}
      expandLabel={copy.expand}
      summary={<Bio paragraphs={profile.bioShort} profile={profile} ui={ui} />}
      detail={
        <>
          <Bio
            paragraphs={[...profile.bioShort, ...profile.bioExtra]}
            profile={profile}
            ui={ui}
          />

          <h3 className="detail-title">
            <FiCpu size={18} aria-hidden="true" /> {ui.hardwareSetup}
          </h3>
          <div className="setup-grid">
            {setup.map((card) => (
              <article className={`setup-card ${card.wide ? "is-wide" : ""}`} key={card.title}>
                <h4>{card.title}</h4>
                <dl className="spec-sheet">
                  {card.specs.map(([label, value]) => (
                    <div className="spec-sheet__row" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                {card.note && <p className="setup-note">{card.note}</p>}
              </article>
            ))}
          </div>

          <h3 className="detail-title">
            <FiBookOpen size={18} aria-hidden="true" /> {ui.hobbies}
          </h3>
          <div className="cards-grid cards-grid--sm">
            {hobbies.map((h) => (
              <article className="hobby-card" key={h.title}>
                <h4>{h.title}</h4>
                <p>
                  <RichText>{h.detail}</RichText>
                </p>
              </article>
            ))}
          </div>
        </>
      }
    />
  );
}
