import { OG_IMAGE, SITE_URL } from "@/lib/locales";
import { getContent } from "@/lib/content";
import profile from "@/content/profile";
import "../globals.css";

/**
 * Layout raíz sólo para `/`, que no tiene contenido propio: redirige a `/es/` o
 * `/en/`. Es un segundo layout raíz (ver route-groups.md, "multiple root
 * layouts") porque el de `[lang]` necesita el idioma para su `<html lang>`.
 *
 * Aun así lleva los metadatos de vista previa COMPLETOS: LinkedIn, WhatsApp y
 * compañía no ejecutan JavaScript, así que no siguen la redirección y leen
 * esta página tal cual. Sin esto, el enlace a la raíz (el que suele ponerse
 * en "Destacados" de LinkedIn) salía sin imagen ni descripción. Van en inglés:
 * es la versión que sirve a cualquier reclutador.
 */
const { meta } = getContent("en");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: true },
  alternates: { languages: { es: "/es/", en: "/en/" } },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: meta.title,
    description: meta.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [OG_IMAGE.url],
  },
};

export default function RootRedirectLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
