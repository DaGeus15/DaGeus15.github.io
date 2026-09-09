"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGlobe, FiBookOpen } from "react-icons/fi";
import Section from "./Section";
import RichText from "@/lib/RichText";
import skills from "@/content/skills";
import useContent from "@/lib/useContent";
import { staggerContainer, staggerItem } from "@/lib/motion";

function Timeline({ experience }) {
  return (
    <ol className="timeline">
      {experience.map((role) => (
        <li className="timeline-item" key={`${role.role}-${role.date}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-header">
            <h3 className="role-title">{role.role}</h3>
            <span className="role-date">{role.date}</span>
          </div>
          <p className="role-desc">
            <RichText>{role.description}</RichText>
          </p>
        </li>
      ))}
    </ol>
  );
}

function SkillsGrid() {
  return (
    <motion.ul
      className="skills-grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {skills.map((skill) => (
        <motion.li className="skill-item" key={skill.name} variants={staggerItem}>
          <span className="skill-icon">
            <Image src={skill.icon} alt="" width={40} height={40} aria-hidden="true" />
          </span>
          <span className="skill-name">{skill.name}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function TechStack({ ui }) {
  return (
    <>
      <h3 className="subsection-title">{ui.techStack}</h3>
      <SkillsGrid />
    </>
  );
}

export default function Experience({ isExpanded, onExpand }) {
  const { experience, languages, certifications, ui, sectionCopy } = useContent();
  const copy = sectionCopy.experience;

  return (
    <Section
      id="experience"
      title={copy.title}
      isExpanded={isExpanded}
      onExpand={onExpand}
      expandLabel={copy.expand}
      summary={
        <>
          <Timeline experience={experience} />
          <TechStack ui={ui} />
        </>
      }
      detail={
        <>
          <Timeline experience={experience} />
          <TechStack ui={ui} />

          <h3 className="detail-title">
            <FiGlobe size={18} aria-hidden="true" /> {ui.languagesTitle}
          </h3>
          <div className="cards-grid cards-grid--sm">
            {languages.map((lang) => (
              <article className="lang-card" key={lang.name}>
                <div className="lang-header">
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-level">{lang.label}</span>
                </div>
                <div
                  className="lang-bar"
                  role="meter"
                  aria-valuenow={lang.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={lang.name}
                >
                  <motion.span
                    className="lang-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </article>
            ))}
          </div>

          <h3 className="detail-title">
            <FiBookOpen size={18} aria-hidden="true" /> {ui.certifications}
          </h3>
          <div className="cards-grid">
            {certifications.map((cert) => (
              <article className="cert-card" key={cert.title}>
                <h4>{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-detail">{cert.detail}</p>
              </article>
            ))}
          </div>
        </>
      }
    />
  );
}
