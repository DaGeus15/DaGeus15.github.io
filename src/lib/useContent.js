import { getContent } from "./content";
import { useLanguage } from "./i18n";

/** El contenido en el idioma de la ruta. Ver `content.js`. */
export default function useContent() {
  return getContent(useLanguage());
}
