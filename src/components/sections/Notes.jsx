import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { formatDate, notePath } from "@/lib/locales";

/**
 * Notas: lo que aprendí resolviendo algo concreto, con el código real. En
 * backend el trabajo no se ve en una captura; una nota enseña cómo pienso un
 * problema, que es lo que una entrevista técnica intenta averiguar.
 *
 * Una fila por nota, como un índice: fecha y proyecto en mono, el título
 * (enlace estirado sobre toda la fila) y una línea de resumen. El texto
 * completo vive en `/[lang]/notes/[id]`.
 */
export default function Notes({ t, pageTitle = false }) {
  /* Con el <h1> de la página, lo de dentro es <h2>; si no, <h3>. */
  const Item = pageTitle ? "h2" : "h3";
  const { ui, lang } = t;

  return (
    <section id="notes" className="section" aria-labelledby="notes-title">
      <SectionHeading id="notes" title={t.sections.notes.title} intro={t.sections.notes.intro} pageTitle={pageTitle} />

      <ol className="notes-list">
        {t.notes.map((note) => (
          <li className="note-row reveal" key={note.id}>
            <p className="note-row__meta mono">
              <time dateTime={note.date}>{formatDate(lang, note.date)}</time>
              <span>{note.projectTitle}</span>
              <span>{ui.readMinutes(note.minutes)}</span>
            </p>
            <Item className="note-row__title">
              <Link href={notePath(lang, note.id)} className="note-row__link">
                {note.title}
                <FiArrowRight className="note-row__arrow" aria-hidden="true" />
              </Link>
            </Item>
            <p className="note-row__summary">{note.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
