import { getContent } from "@/lib/content";
import { LANGS, OG_IMAGE, pagePath } from "@/lib/locales";

/**
 * Metadatos de una página de primer nivel: título, descripción, `canonical`,
 * la misma página en el otro idioma (`hreflang`) y la vista previa. Módulo
 * neutro: lo usan los `generateMetadata` del servidor.
 *
 * `openGraph` de una página REEMPLAZA al del layout (no se fusiona): hay que
 * repetir la imagen o el enlace sale sin vista previa.
 */
export function pageMetadata(lang, page) {
  const { title, description } = getContent(lang).pages[page];
  return {
    title,
    description,
    alternates: {
      canonical: pagePath(lang, page),
      languages: Object.fromEntries(LANGS.map((l) => [l, pagePath(l, page)])),
    },
    openGraph: { title, description, url: pagePath(lang, page), images: [OG_IMAGE] },
  };
}

export default pageMetadata;
