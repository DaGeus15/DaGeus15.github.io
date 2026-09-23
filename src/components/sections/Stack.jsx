import Image from "next/image";
import SectionHeading from "./SectionHeading";
import BentoTile from "@/components/bento/BentoTile";

/**
 * Stack en rejilla bento, agrupado como en el CV. Cada grupo lleva una frase
 * de evidencia —dónde se usó de verdad—: una lista de tecnologías sin
 * contexto no le dice nada a un reclutador; "95% de cobertura con Mockito", sí.
 *
 * Todo el contenido se ve sin hover (en táctil y con teclado no lo hay); el
 * hover sólo enciende el color de la capa.
 */
export default function Stack({ t }) {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <SectionHeading
        id="stack"
        title={t.sections.stack.title}
        intro={t.sections.stack.intro}
      />

      <div className="bento">
        <ul className="bento__grid bento__grid--stack">
          {t.skills.map((group) => (
            <li className="bento__item reveal" data-span={group.span} key={group.id}>
              <BentoTile layer={group.layer} className="stack-tile">
                <h3 className="layer-label">{group.title}</h3>

                <ul className="stack-tile__primary">
                  {group.primary.map((tech) => (
                    <li key={tech.name}>
                      <span className="tech-icon">
                        <Image src={tech.icon} alt="" width={28} height={28} />
                      </span>
                      {tech.name}
                    </li>
                  ))}
                </ul>

                <p className="stack-tile__proof">{group.proof}</p>

                <ul className="tag-list">
                  {group.tools.map((tool) => (
                    <li className="tag" key={tool}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </BentoTile>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
