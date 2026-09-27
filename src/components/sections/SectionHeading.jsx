/**
 * Encabezado de sección: el título grande y, si la hay, una frase de
 * contexto al lado. Sin rótulos encima ni índices numerados: el título se
 * sostiene solo.
 */
export default function SectionHeading({ id, title, intro }) {
  return (
    <header className="section-head reveal">
      <h2 className="section-head__title" id={`${id}-title`}>
        {title}
      </h2>
      {intro && <p className="section-head__intro">{intro}</p>}
    </header>
  );
}
