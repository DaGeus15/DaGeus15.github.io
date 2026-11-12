import PageShell from "@/components/layout/PageShell";
import Experience from "@/components/sections/Experience";
import Stack from "@/components/sections/Stack";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/pageMeta";

/** Experiencia: el puesto (con el logo de la empresa) y, debajo, el stack
    por capas con la pila 3D: dónde se usó cada herramienta. */
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "experience");
}

export default async function ExperiencePage({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <PageShell t={t} current="experience">
      <Experience t={t} pageTitle />
      <Stack t={t} />
    </PageShell>
  );
}
