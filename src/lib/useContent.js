"use client";

import { useMemo } from "react";
import { useLanguage } from "./i18n";
import copy from "@/content/copy";
import profileBase from "@/content/profile";
import { projects as projectsBase } from "@/content/projects";
import languageLevels from "@/content/education";
import navBase from "@/content/navigation";
import { DEFAULT_LANG } from "./i18n";

/**
 * Une el texto del idioma activo (`content/copy.js`) con los datos
 * estructurales que no se traducen (rutas, stack, repos, niveles, iconos).
 *
 * Es el ÚNICO sitio donde se hace ese cruce: los componentes piden
 * `useContent()` y reciben el árbol ya resuelto, sin saber en qué idioma
 * están. Los proyectos y los idiomas se cruzan por clave, nunca por posición,
 * para que reordenar una lista no descoloque las traducciones.
 */
export default function useContent() {
  const { lang } = useLanguage();

  return useMemo(() => {
    const c = copy[lang] ?? copy[DEFAULT_LANG];

    return {
      lang,
      ui: c.ui,
      profile: { ...profileBase, ...c.profile },
      experience: c.experience,
      projects: projectsBase.map((p) => ({ ...p, ...c.projects[p.id] })),
      setup: c.setup,
      hobbies: c.hobbies,
      languages: c.languages.map((l) => ({ ...l, level: languageLevels[l.key] ?? 0 })),
      certifications: c.certifications,
      /** Secciones con su etiqueta traducida, para el dock y el cajón. */
      sections: navBase.map((s) => ({ ...s, label: c.nav[s.id] })),
      /** Títulos y textos de "ver más" de cada sección. */
      sectionCopy: c.sections,
    };
  }, [lang]);
}
