import { pageIds } from "@/content/navigation";
import { projectIds } from "@/content/projects";
import { notes } from "@/content/notes";
import {
  LANGS,
  SITE_URL,
  homePath,
  notePath,
  pagePath,
  projectPath,
} from "@/lib/locales";

/**
 * `sitemap.xml`: todas las páginas en los dos idiomas, cada una con su
 * versión en el otro (`hreflang`), igual que los metadatos de cada página.
 * La raíz (`/`) no va: sólo redirige y es `noindex`.
 *
 * Sólo las notas llevan `lastModified` (su fecha de publicación). Poner la
 * fecha del build en todo le diría a Google que todo cambió en cada despliegue,
 * y deja de fiarse del dato. `changeFrequency` y `priority` no van: Google los
 * ignora.
 */
// Con `output: 'export'` hay que pedirlo: el archivo se genera en el build.
export const dynamic = "force-static";

const entry = (pathFor, extra = {}) =>
  LANGS.map((lang) => ({
    url: `${SITE_URL}${pathFor(lang)}`,
    alternates: {
      languages: Object.fromEntries(
        LANGS.map((l) => [l, `${SITE_URL}${pathFor(l)}`]),
      ),
    },
    ...extra,
  }));

export default function sitemap() {
  return [
    ...entry(homePath),
    ...pageIds.flatMap((page) => entry((lang) => pagePath(lang, page))),
    ...projectIds.flatMap((id) => entry((lang) => projectPath(lang, id))),
    ...notes.flatMap((note) =>
      entry((lang) => notePath(lang, note.id), { lastModified: note.date }),
    ),
  ];
}
