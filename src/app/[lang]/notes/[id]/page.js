import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import RichText from "@/lib/RichText";
import { getContent } from "@/lib/content";
import { LANGS, OG_IMAGE, formatDate, homePath, notePath, otherLang, projectPath } from "@/lib/locales";
import { noteIds } from "@/content/notes";

/**
 * Nota técnica: una página por nota y por idioma, con URL propia para
 * compartirla. Se lee como un artículo: fecha, proyecto y minutos arriba, el
 * título, el resumen como entradilla y el cuerpo en una sola columna de
 * lectura, con los fragmentos de código reales intercalados. Al final, el
 * caso de estudio del que sale y la siguiente nota.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return noteIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { lang, id } = await params;
  const note = getContent(lang).notes.find((n) => n.id === id);

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: notePath(lang, id),
      languages: Object.fromEntries(LANGS.map((l) => [l, notePath(l, id)])),
    },
    // Como en los casos: el `openGraph` de la página reemplaza al del layout.
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      url: notePath(lang, id),
      publishedTime: note.date,
      images: [OG_IMAGE],
    },
  };
}

/** Un bloque del cuerpo: párrafo, subtítulo o fragmento de código. */
function Block({ block, code }) {
  if (typeof block === "string") {
    return (
      <p>
        <RichText>{block}</RichText>
      </p>
    );
  }
  if (block.h) return <h2>{block.h}</h2>;

  const snippet = code[block.code];
  return (
    <figure className="note-code">
      <figcaption className="note-code__file mono">{snippet.file}</figcaption>
      {/* Desplazable de lado en pantallas estrechas: el código no se parte. */}
      <pre tabIndex={0}>
        <code>{snippet.source}</code>
      </pre>
    </figure>
  );
}

export default async function NotePage({ params }) {
  const { lang, id } = await params;
  const t = getContent(lang);
  const { ui } = t;
  const index = t.notes.findIndex((n) => n.id === id);
  const note = t.notes[index];
  const next = t.notes.length > 1 ? t.notes[(index + 1) % t.notes.length] : null;

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteNav
        variant="case"
        labels={{ mainNav: ui.mainNav, switchLang: ui.switchLang, back: ui.backHome }}
        name={t.profile.name}
        homeHref={homePath(lang)}
        backHref={`${homePath(lang)}#notes`}
        lang={lang}
        langHref={notePath(otherLang(lang), id)}
      />

      <main id="main" className="page note">
        <header className="note-hero">
          <p className="note-hero__meta mono enter" style={{ "--i": 0 }}>
            <time dateTime={note.date}>{formatDate(lang, note.date)}</time>
            <span>{ui.readMinutes(note.minutes)}</span>
            {note.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
          <h1 className="note-hero__title enter" style={{ "--i": 1 }}>
            {note.title}
          </h1>
          <p className="note-hero__lead enter" style={{ "--i": 2 }}>
            {note.summary}
          </p>
        </header>

        <article className="note-body enter" style={{ "--i": 3 }}>
          {note.body.map((block, i) => (
            <Block key={i} block={block} code={note.code} />
          ))}
        </article>

        <footer className="note-end reveal">
          <p className="note-end__project">
            <span className="note-end__label">{ui.fromProject}</span>
            <Link href={projectPath(lang, note.project)} className="text-link">
              {ui.seeCaseStudy(note.projectTitle)}
              <FiArrowRight className="inline-icon" aria-hidden="true" />
            </Link>
          </p>

          {next && (
            <Link href={notePath(lang, next.id)} className="next-note" data-rim>
              <span className="next-note__label">{ui.nextNote}</span>
              <span className="next-note__title">
                {next.title}
                <FiArrowRight aria-hidden="true" />
              </span>
              <span className="next-note__line">{next.summary}</span>
            </Link>
          )}
        </footer>
      </main>
      <div className="page">
        <Footer t={t} />
      </div>
    </>
  );
}
