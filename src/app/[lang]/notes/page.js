import PageShell from "@/components/layout/PageShell";
import Notes from "@/components/sections/Notes";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/pageMeta";

/** Notas: el índice; cada nota tiene su página en `/[lang]/notes/[id]`. */
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "notes");
}

export default async function NotesPage({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <PageShell t={t} current="notes">
      <Notes t={t} pageTitle />
    </PageShell>
  );
}
