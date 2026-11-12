/**
 * Encabezado de sección: el título grande y, si la hay, una frase de
 * contexto al lado. Sin rótulos encima ni índices numerados: el título se
 * sostiene solo.
 *
 * `pageTitle`: es la primera sección de su página y su título es el `<h1>`
 * (cada página necesita uno); se ve igual.
 */
export default function SectionHeading({ id, title, intro, pageTitle = false }) {
  const Title = pageTitle ? "h1" : "h2";
  return (
    <header className="section-head reveal">
      <Title className="section-head__title" id={`${id}-title`}>
        {title}
      </Title>
      {intro && <p className="section-head__intro">{intro}</p>}
    </header>
  );
}
