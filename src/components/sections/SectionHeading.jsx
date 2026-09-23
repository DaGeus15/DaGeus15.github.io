/**
 * Encabezado de sección: título y una regla fina que llena el resto de la
 * línea. Sin índices numerados ("01 —"): son el sello de las plantillas
 * generadas y no le dicen nada a quien lee.
 */
export default function SectionHeading({ id, title, intro }) {
  return (
    <header className="section-head">
      <div className="section-head__row">
        <h2 className="section-head__title" id={`${id}-title`}>
          {title}
        </h2>
        <span className="section-head__rule" aria-hidden="true" />
      </div>
      {intro && <p className="section-head__intro">{intro}</p>}
    </header>
  );
}
