import { FiArrowDown, FiGlobe, FiMapPin } from "react-icons/fi";
import CvDownload from "@/components/ui/CvDownload";
import SystemStack from "./SystemStack";

/**
 * Portada dividida: quién soy y la prueba a la izquierda, la pila 3D a la
 * derecha. Cuatro piezas de texto como mucho (nombre, rol, frase y la línea de
 * datos) y dos acciones: lo que un reclutador necesita en los primeros
 * segundos, sin navegación que aprender.
 *
 * El nombre se parte a mano en dos líneas (nombre + apellidos) para que el
 * corte no dependa del ancho.
 */
export default function Hero({ t }) {
  const { profile, ui } = t;
  const words = profile.name.split(" ");
  const first = words.slice(0, 2).join(" ");
  const last = words.slice(2).join(" ");

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__text">
        <h1 id="hero-title" className="hero__name enter" style={{ "--i": 0 }}>
          <span>{first}</span> <span>{last}</span>
        </h1>
        <p className="hero__role enter" style={{ "--i": 1 }}>
          {profile.role}
        </p>
        <p className="hero__pitch enter" style={{ "--i": 2 }}>
          {profile.pitch}
        </p>

        <div className="hero__actions enter" style={{ "--i": 3 }}>
          <CvDownload placement="down" />
          <a href="#contact" className="btn btn--ghost">
            {ui.contactCta}
            <FiArrowDown aria-hidden="true" />
          </a>
        </div>

        <ul className="hero__facts enter" style={{ "--i": 4 }}>
          <li>
            <FiMapPin aria-hidden="true" />
            {profile.location}
          </li>
          <li>
            <FiGlobe aria-hidden="true" />
            {profile.citizenship}
          </li>
        </ul>
      </div>

      <div className="hero__visual">
        <SystemStack layers={t.hero.layers} />
      </div>
    </section>
  );
}
