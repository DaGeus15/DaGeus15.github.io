import Image from "next/image";
import { FiArrowDown, FiArrowRight, FiMapPin } from "react-icons/fi";
import CvDownload from "@/components/ui/CvDownload";
import PortraitFocus from "@/components/hero/PortraitFocus";
import { slabShape } from "@/components/hero/stackGeometry";
import portrait from "@/content/portrait";
import stackLayers from "@/content/stackLayers";
import { MOBILE_BREAKPOINT } from "@/lib/breakpoints";

/**
 * Portada: el texto a la izquierda y el retrato a la derecha, sin ficha.
 * En móvil, la barra muestra el recorte circular de este retrato.
 *
 * La ubicación va debajo de las acciones.
 *
 * El nombre se parte a mano en dos líneas (nombre + apellidos) para que el
 * corte no dependa del ancho.
 */
// El ancho en escritorio sigue el bloque de texto, con estos topes.
const portraitSizes = "min(44vw, 36rem)";
const portraitSrcSet = portrait.photo.map(({ src, w }) => `${src} ${w}w`).join(", ");
const portraitFallback = portrait.photo.find(({ w }) => w >= 640) ?? portrait.photo.at(-1);
const letters = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const signatureSlabs = stackLayers
  .map(({ id }, index) => ({ id, ...slabShape(index, stackLayers.length, 3) }))
  .reverse();

function NameLine({ line, offset = 0 }) {
  return (
    <span className="hero-intro__line">
      {Array.from(letters.segment(line), ({ segment, index }) =>
        <span key={index} className="hero-intro__letter" style={{ "--letter": offset + index }}>
          {segment}
        </span>,
      )}
    </span>
  );
}

function HeroSignature() {
  return (
    <svg className="hero-intro__stack" viewBox="28 24 244 412" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hero-intro-top" x2="0.3" y2="1">
          <stop className="hero-intro__slab-light" />
          <stop offset="1" className="hero-intro__slab-shade" />
        </linearGradient>
      </defs>
      {signatureSlabs.map(({ id, body, top }, index) => (
        <g key={id} className="hero-intro__slab" data-layer={id} style={{ "--layer": index }}>
          <polygon className="hero-intro__slab-body" points={body} />
          <polygon className="hero-intro__slab-top" points={top} />
        </g>
      ))}
    </svg>
  );
}

function nameLines(name) {
  const words = name.split(" ");
  return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
}

/** Firma visual de la primera carga del documento. */
export function HeroIntro({ profile }) {
  const [first, last] = nameLines(profile.name);
  return (
    <div className="hero-intro" aria-hidden="true" suppressHydrationWarning>
      <div className="hero-intro__identity">
        <div className="hero-intro__name">
          <NameLine line={first} /> <NameLine line={last} offset={first.length + 1} />
        </div>
        <HeroSignature />
      </div>
    </div>
  );
}

export default function Hero({ t }) {
  const { profile, ui } = t;
  const [first, last] = nameLines(profile.name);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
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

        <p className="hero__location enter" style={{ "--i": 5 }}>
          <FiMapPin aria-hidden="true" />
          {profile.location}
        </p>
      </div>

      <div
        className="hero__portrait enter"
        style={{
          "--i": 1,
          "--portrait-ratio": portrait.h / portrait.w,
          "--portrait-rim": `url("${portrait.rim}")`,
          aspectRatio: `${portrait.w} / ${portrait.h}`,
        }}
      >
        <picture>
          <source media={`(width < ${MOBILE_BREAKPOINT}px)`} srcSet={profile.mobilePortrait} />
          <source srcSet={portraitSrcSet} sizes={portraitSizes} />
          <Image
            className="hero__photo"
            src={portraitFallback.src}
            width={portrait.w}
            height={portrait.h}
            loading="eager"
            fetchPriority="high"
            alt={profile.name}
          />
        </picture>
        <PortraitFocus />
      </div>
    </section>
  );
}
