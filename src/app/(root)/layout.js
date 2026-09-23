import { SITE_URL } from "@/lib/locales";
import "../globals.css";

/**
 * Layout raíz sólo para `/`, que no tiene contenido propio: redirige a `/es/` o
 * `/en/`. Es un segundo layout raíz (ver route-groups.md, "multiple root
 * layouts") porque el de `[lang]` necesita el idioma para su `<html lang>`.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daylé García Fernández",
  robots: { index: false, follow: true },
  alternates: { languages: { es: "/es/", en: "/en/" } },
};

export default function RootRedirectLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
