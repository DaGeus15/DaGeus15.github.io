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
export default function Notes({ t }) {
  const { ui, lang } = t;

  return (
    <section id="notes" className="section" aria-labelledby="notes-title">
      <SectionHeading id="notes" title={t.sections.notes.title} intro={t.sections.notes.intro} />

      <ol className="notes-list">
        {t.notes.map((note) => (
          <li className="note-row reveal" key={note.id}>
            <p className="note-row__meta mono">
              <time dateTime={note.date}>{formatDate(lang, note.date)}</time>
              <span>{note.projectTitle}</span>
              <span>{ui.readMinutes(note.minutes)}</span>
            </p>
            <h3 className="note-row__title">
              <Link href={notePath(lang, note.id)} className="note-row__link">
                {note.title}
                <FiArrowRight className="note-row__arrow" aria-hidden="true" />
              </Link>
            </h3>
            <p className="note-row__summary">{note.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
