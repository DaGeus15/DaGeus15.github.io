import copy from "@/content/copy";
import profileBase from "@/content/profile";
import projectsBase from "@/content/projects";
import skillGroups from "@/content/skills";
import experienceBase from "@/content/experience";
import navBase from "@/content/navigation";
import social from "@/content/social";
import { DEFAULT_LANG } from "./locales";

/**
 * Une el texto de un idioma (`content/copy.js`) con los datos estructurales
 * que no se traducen (rutas, stack, repos, cifras, diagramas).
 *
 * Es el ÚNICO sitio donde se hace ese cruce, y siempre POR CLAVE (`id`),
 * nunca por posición: reordenar una lista no descoloca las traducciones.
 *
 * Módulo neutro: lo usan las páginas y los metadatos (servidor). Los
 * componentes de cliente usan `useContent()`, que le pasa el idioma de la ruta.
 */
const cache = new Map();

export function getContent(lang) {
  if (cache.has(lang)) return cache.get(lang);

  const c = copy[lang] ?? copy[DEFAULT_LANG];

  const projects = projectsBase.map((p) => {
    const t = c.projects[p.id];
    // Una métrica es { key, value } aquí y su etiqueta en copy.js; si la
    // cifra es una frase, copy.js la trae entera como { value, label }.
    const metrics = (p.metrics ?? []).map((m) => {
      const entry = t.metrics?.[m.key];
      return typeof entry === "object"
        ? { key: m.key, value: entry.value, label: entry.label }
        : { key: m.key, value: m.value, label: entry };
    });
    return { ...p, ...t, metrics, nodes: t.nodes ?? {} };
  });

  const content = {
    lang,
    meta: c.meta,
    ui: c.ui,
    profile: { ...profileBase, ...c.profile },
    social,
    nav: navBase.map((s) => ({ ...s, label: c.nav[s.id] })),
    sections: c.sections,
    experience: c.experience.map((role) => ({
      ...experienceBase.find((e) => e.id === role.id),
      ...role,
    })),
    projects,
    skills: skillGroups.map((g) => ({ ...g, ...c.skills[g.id] })),
    education: c.education,
    certifications: c.certifications,
    languages: c.languages,
  };

  cache.set(lang, content);
  return content;
}

export default getContent;
