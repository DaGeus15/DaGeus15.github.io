import SectionHeading from "./SectionHeading";

/**
 * Stack como una banda de filas: el grupo, lo que uso (con icono monocromo) y
 * el resto en texto, y la prueba de dónde lo usé de verdad. Una lista de
 * tecnologías sin contexto no le dice nada a un reclutador; "95% de cobertura
 * con Mockito", sí.
 *
 * Los iconos son máscaras en el color del texto: los logotipos a todo color
 * convertían la sección en un muestrario de marcas.
 *
 * Cada fila tiene id (`stack-<grupo>`): la pila de la portada enlaza aquí, y
 * la fila a la que se llega se marca un momento (`:target`).
 */
export default function Stack({ t }) {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <SectionHeading id="stack" title={t.sections.stack.title} intro={t.sections.stack.intro} />

      <ul className="stack-list">
        {t.skills.map((group) => (
          <li className="stack-row reveal" id={`stack-${group.id}`} key={group.id}>
            <h3 className="stack-row__title">{group.title}</h3>
            <div className="stack-row__tech">
              <ul className="stack-row__primary">
                {group.primary.map((tech) => (
                  <li key={tech.name}>
                    <span
                      className="stack-row__icon"
                      style={{ maskImage: `url(${tech.icon})` }}
                      aria-hidden="true"
                    />
                    {tech.name}
                  </li>
                ))}
              </ul>
              <p className="stack-row__tools mono">{group.tools.join(" · ")}</p>
            </div>
            <p className="stack-row__proof">{group.proof}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
