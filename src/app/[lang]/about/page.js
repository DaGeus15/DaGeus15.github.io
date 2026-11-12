import PageShell from "@/components/layout/PageShell";
import About from "@/components/sections/About";
import Journey from "@/components/sections/Journey";
import Hobbies from "@/components/sections/Hobbies";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/pageMeta";

/** Sobre mí: la bio y la ficha (formación, idiomas, certificaciones), las
    competencias y congresos, y lo que hace fuera del código. */
export async function generateMetadata({ params }) {
  const { lang } = await params;
  return pageMetadata(lang, "about");
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const t = getContent(lang);

  return (
    <PageShell t={t} current="about">
      <About t={t} pageTitle />
      <Journey t={t} />
      <Hobbies t={t} />
    </PageShell>
  );
}
