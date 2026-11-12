import PageShell from "@/components/layout/PageShell";
import Projects from "@/components/sections/Projects";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/pageMeta";

/** Proyectos: los siete, con sus capturas; cada uno lleva a su caso. */
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "projects");
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <PageShell t={t} current="projects">
      <Projects t={t} pageTitle />
    </PageShell>
  );
}
