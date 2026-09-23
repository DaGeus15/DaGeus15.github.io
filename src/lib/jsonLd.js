import { SITE_URL, homePath } from "./locales";

/**
 * Datos estructurados `Person` (schema.org). Le dicen a Google quién es la
 * persona del sitio, su puesto y sus perfiles, y ayudan a que el nombre
 * aparezca con su ficha en los resultados.
 */
export function personJsonLd(t) {
  const current = t.experience.find((e) => e.current);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.profile.name,
    jobTitle: t.profile.role,
    url: `${SITE_URL}${homePath(t.lang)}`,
    image: `${SITE_URL}${t.profile.avatar}`,
    email: `mailto:${t.profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Ambato", addressCountry: "EC" },
    nationality: { "@type": "Country", name: "Spain" },
    worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
    alumniOf: { "@type": "CollegeOrUniversity", name: t.education.school },
    knowsLanguage: ["es", "en"],
    sameAs: t.social.map((s) => s.url),
  };
}
