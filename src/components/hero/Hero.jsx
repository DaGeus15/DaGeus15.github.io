import Image from "next/image";
import { FiArrowDown, FiArrowRight, FiGlobe, FiMapPin } from "react-icons/fi";
import CvDownload from "@/components/ui/CvDownload";
import portrait from "@/content/portrait";

/**
 * Portada: quién soy a la izquierda y el retrato a la derecha. Cuatro piezas
 * de texto (nombre, rol, frase) y dos acciones. La ubicación y la ciudadanía
 * son el pie de la foto.
 *
 * En móvil no entra el retrato entero: el recorte de cara y hombros va en la
 * misma fila que la disponibilidad, y los datos quedan bajo las acciones.
 * Las dos piezas están siempre en el árbol; cuál se ve lo decide el CSS.
 *
 * El nombre se parte a mano en dos líneas (nombre + apellidos) para que el
 * corte no dependa del ancho.
 */
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
  const avatar = portrait.avatar[portrait.avatar.length - 1];

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__text">
        <div className="hero__lead">
          <div
            className="hero__avatar enter"
            style={{ "--i": 0, "--portrait-blur": `url("${portrait.avatarBlur.src}")` }}
          >
            <Image
              src={avatar.src}
              alt={profile.name}
              width={avatar.w}
              height={avatar.h}
              sizes="4.5rem"
              loading="eager"
            />
          </div>
          {profile.availability && (
            <a href="#contact" className="availability enter" style={{ "--i": 0 }}>
              <span className="availability__dot" aria-hidden="true" />
              {profile.availability}
              <FiArrowRight className="availability__arrow" aria-hidden="true" />
            </a>
          )}
        </div>
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

      <figure className="hero__portrait enter" style={{ "--i": 1 }}>
        <div className="hero__shot" style={{ "--portrait-blur": `url("${portrait.blur.src}")` }}>
          <Image
            src={portrait.full.src}
            alt={profile.name}
            width={portrait.full.w}
            height={portrait.full.h}
            sizes="(min-width: 1024px) min(25rem, 36vw), 25rem"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <HeroFacts profile={profile} />
        </figcaption>
      </figure>
    </section>
  );
}
