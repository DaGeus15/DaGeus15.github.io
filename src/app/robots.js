import { SITE_URL } from "@/lib/locales";

// Con `output: 'export'` hay que pedirlo: el archivo se genera en el build.
export const dynamic = "force-static";

/** `robots.txt`: todo el sitio es público; sólo señala el sitemap. */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
