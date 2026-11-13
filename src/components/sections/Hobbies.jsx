import { FiArrowUpRight, FiBookOpen, FiTrendingUp } from "react-icons/fi";
import { LuGamepad2 } from "react-icons/lu";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

/* Feather no tiene mando de juego; el de Lucide es del mismo trazo. */
const ICONS = { trend: FiTrendingUp, book: FiBookOpen, gamepad: LuGamepad2 };

/**
 * Fuera del código: lo que está aprendiendo y lo que hace por gusto, con su
 * perfil público si lo quiere enlazar. Pocas fichas y cortas: es para
 * conocerla, no compite con el trabajo.
 *
 * Fichas iguales en una rejilla que llena el ancho: el icono arriba, el
 * texto, y el enlace siempre al pie con el logo de su web (Goodreads,
 * Steam). La ficha no es un enlace; el enlace va aparte. El icono va en la
 * misma pastilla de cristal imitado que los logotipos del stack (`--tile-*`).
 */
export default function Hobbies({ t }) {
  return (
    <section id="hobbies" className="section" aria-labelledby="hobbies-title">
      <SectionHeading id="hobbies" title={t.sections.hobbies.title} />

      <ul className="hobbies">
        {t.hobbies.map((h, i) => {
          const Icon = ICONS[h.icon];
          return (
            <li className="hobby reveal" key={h.id} style={{ "--i": i }}>
              <span className="hobby__icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="hobby__title">{h.title}</h3>
              {h.text && <p className="hobby__text">{h.text}</p>}
              {h.url && (
                <a href={h.url} target="_blank" rel="noopener noreferrer" className="role-link hobby__link">
                  <span className="role-link__label">
                    {h.siteLogo && <Image className="role-link__logo" src={h.siteLogo} alt="" width={40} height={40} />}
                    {h.link}
                    <FiArrowUpRight className="role-link__arrow" aria-hidden="true" />
                  </span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
