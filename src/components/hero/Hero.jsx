import { FiArrowDown, FiArrowRight, FiGlobe, FiMapPin } from "react-icons/fi";
import CvDownload from "@/components/ui/CvDownload";
import PortraitFocus from "@/components/hero/PortraitFocus";
import portrait from "@/content/portrait";

/**
 * Portada: el texto a la izquierda y el retrato a la derecha, sin ficha.
 * El lienzo es más ancho que su columna (la pared se apaga hacia la página)
 * y el texto va por encima. En móvil el retrato va arriba, a sangre, y se
 * disuelve hacia el texto.
 *
 * La ubicación y la ciudadanía van debajo de las acciones, en todos los
 * anchos: una sola lista.
 *
 * El nombre se parte a mano en dos líneas (nombre + apellidos) para que el
 * corte no dependa del ancho.
 */
function imageSet(variants) {
  const [lo, hi] = [...variants].sort((a, b) => a.w - b.w);
  return `image-set(url("${lo.src}") 1x, url("${hi.src}") 2x)`;
}

/** Variables del tema. Sin `data-theme` (sin JS) queda el oscuro, el de serie. */
function portraitVars() {
  const block = (theme) => {
    const photo = imageSet(portrait.photo[theme]);
    const rim = imageSet(portrait.rim[theme]);
    return `--portrait-photo:${photo};--portrait-rim:${rim};`;
  };
  return `.hero__portrait{${block("dark")}}
[data-theme="dark"] .hero__portrait{${block("dark")}}
[data-theme="light"] .hero__portrait{${block("light")}}`;
}

/** La foto es un fondo CSS y el navegador la descubría tarde, aunque es lo
    primero que tiene que verse. El tema sólo se sabe en el navegador: el
    script del layout ya lo fijó, y aquí se pide la del tema aplicado, con las
    mismas densidades que `image-set()`. */
function portraitPreload() {
  const set = (theme) => {
    const [lo, hi] = [...portrait.photo[theme]].sort((a, b) => a.w - b.w);
    return `${lo.src} 1x, ${hi.src} 2x`;
  };
  const sets = JSON.stringify({ dark: set("dark"), light: set("light") });
  return `(function(){var s=${sets};var t=document.documentElement.getAttribute("data-theme");var l=document.createElement("link");l.rel="preload";l.as="image";l.fetchPriority="high";l.imageSrcset=s[t]||s.dark;document.head.appendChild(l);})();`;
}

function HeroFacts({ profile, className = "hero__facts", style }) {
  return (
    <ul className={className} style={style}>
      <li>
        <FiMapPin aria-hidden="true" />
        {profile.location}
      </li>
      <li>
        <FiGlobe aria-hidden="true" />
        {profile.citizenship}
      </li>
    </ul>
  );
}

export default function Hero({ t }) {
  const { profile, ui } = t;
  const words = profile.name.split(" ");
  const first = words.slice(0, 2).join(" ");
  const last = words.slice(2).join(" ");

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <style href="portrait-theme" precedence="default">{portraitVars()}</style>
      <script dangerouslySetInnerHTML={{ __html: portraitPreload() }} />
      <div className="hero__text">
        {profile.availability && (
          <a href="#contact" className="availability enter" style={{ "--i": 0 }}>
            <span className="availability__dot" aria-hidden="true" />
            {profile.availability}
            <FiArrowRight className="availability__arrow" aria-hidden="true" />
          </a>
        )}
        <h1 id="hero-title" className="hero__name enter" style={{ "--i": 1 }}>
          <span>{first}</span> <span>{last}</span>
        </h1>
        <p className="hero__role enter" style={{ "--i": 2 }}>
          {profile.role}
        </p>
        <p className="hero__pitch enter" style={{ "--i": 3 }}>
          {profile.pitch}
        </p>

        <div className="hero__actions enter" style={{ "--i": 4 }}>
          <CvDownload placement="down" />
          <a href="#contact" className="btn btn--ghost">
            {ui.contactCta}
            <FiArrowDown aria-hidden="true" />
          </a>
        </div>

        <HeroFacts profile={profile} className="hero__facts enter" style={{ "--i": 5 }} />
      </div>

      <div
        className="hero__portrait enter"
        role="img"
        aria-label={profile.name}
        style={{
          "--i": 1,
          "--portrait-ratio": (portrait.h / portrait.w).toFixed(4),
          aspectRatio: `${portrait.w} / ${portrait.h}`,
        }}
      >
        <div className="hero__photo" />
        <div className="hero__rim hero__rim--rest" />
        <PortraitFocus />
      </div>
    </section>
  );
}
