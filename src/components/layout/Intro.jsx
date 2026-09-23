import Image from "next/image";
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import SideNav from "./SideNav";
import LangSwitch from "./LangSwitch";
import CvDownload from "@/components/ui/CvDownload";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { homePath, otherLang } from "@/lib/locales";

const ICONS = { github: FiGithub, linkedin: FiLinkedin };

/**
 * Columna izquierda: quién soy, qué hago y cómo contactarme, en lo que un
 * reclutador lee en los primeros segundos. En escritorio queda fija mientras
 * la derecha se desplaza; en móvil es la cabecera de la página.
 *
 * Entra en cascada con `.enter` (CSS, antes de hidratar). `--i` es el orden.
 */
export default function Intro({ t }) {
  const { profile, ui, lang } = t;
  const current = t.experience.find((e) => e.current);

  return (
    <header className="intro">
      <div className="intro__top">
        <div className="intro__id enter" style={{ "--i": 0 }}>
          <Image
            src={profile.avatarSquare}
            alt={profile.name}
            width={176}
            height={176}
            className="intro__avatar"
            priority
          />
          {current && (
            <span className="intro__status">
              <span className="live-dot" aria-hidden="true" />
              {current.role} · {current.company}
            </span>
          )}
        </div>

        <h1 className="intro__name enter" style={{ "--i": 1 }}>
          {profile.name}
        </h1>
        <p className="intro__role enter" style={{ "--i": 2 }}>
          {profile.role}
        </p>
        <p className="intro__pitch enter" style={{ "--i": 3 }}>
          {profile.pitch}
        </p>

        <ul className="intro__facts enter" style={{ "--i": 4 }}>
          <li>
            <FiMapPin aria-hidden="true" />
            {profile.location}
          </li>
          <li>
            <FiGlobe aria-hidden="true" />
            {profile.citizenship}
          </li>
        </ul>

        <div className="intro__nav enter" style={{ "--i": 5 }}>
          <SideNav items={t.nav} label={ui.mainNav} />
        </div>
      </div>

      <div className="intro__actions enter" style={{ "--i": 6 }}>
        <CvDownload />
        <div className="intro__links">
          {t.social.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={s.name}
                title={s.name}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label={profile.email} title={profile.email}>
            <FiMail aria-hidden="true" />
          </a>
        </div>
        <div className="intro__prefs">
          <LangSwitch lang={lang} href={homePath(otherLang(lang))} label={ui.switchLang} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
