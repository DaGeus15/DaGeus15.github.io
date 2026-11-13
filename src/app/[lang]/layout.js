import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { ControlsProvider } from "@/lib/i18n";
import SpecularRim from "@/components/ui/SpecularRim";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LANGS, SITE_URL, homePath } from "@/lib/locales";
import { getContent } from "@/lib/content";
import { homeIntroScript } from "@/lib/homeIntro";
import profile from "@/content/profile";
import { OG_IMAGE } from "@/lib/locales";
import "../globals.css";

const monaSans = localFont({
  src: "../../../public/assets/fonts/Mona-Sans.woff2",
  variable: "--font-sans",
  display: "swap",
});

/* Export estático: sólo existen los idiomas declarados. Cualquier otro
   segmento es un 404, no una página generada en caliente. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const { meta } = getContent(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: `%s · ${profile.name}` },
    description: meta.description,
    authors: [{ name: profile.name }],
    alternates: {
      canonical: homePath(lang),
      languages: Object.fromEntries(LANGS.map((l) => [l, homePath(l)])),
    },
    openGraph: {
      type: "profile",
      locale: lang === "es" ? "es_ES" : "en_US",
      url: homePath(lang),
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
}

/**
 * `themeColor` va en `viewport`, no en `metadata` (ver
 * node_modules/next/dist/docs/.../generate-viewport.md). `viewportFit: "cover"`
 * habilita env(safe-area-inset-*) para la píldora de móvil, que va abajo.
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f151d" },
  ],
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const { ui } = getContent(lang);
  const cvEs = { href: profile.cvEs, label: ui.cvSpanish, lang: "es" };
  const cvEn = { href: profile.cvEn, label: ui.cvEnglish, lang: "en" };
  const controls = {
    cv: {
      label: ui.downloadCv,
      short: ui.cvShort,
      menu: ui.cvChoose,
      options: lang === "en" ? [cvEn, cvEs] : [cvEs, cvEn],
    },
    theme: {
      dark: {
        toggle: ui.toLightMode,
        system: ui.themeFollows(ui.themeDark),
        pinned: ui.themePinned(ui.themeDark),
      },
      light: {
        toggle: ui.toDarkMode,
        system: ui.themeFollows(ui.themeLight),
        pinned: ui.themePinned(ui.themeLight),
      },
    },
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Aplica el tema antes del primer paint para que no haya flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: homeIntroScript(homePath(lang)) }} />
      </head>
      <body className={monaSans.variable}>
        {/* `reducedMotion="never"`: el movimiento reducido se decide efecto a
            efecto, no en bloque (ver AGENTS.md). Con "user" se apagaba todo
            —hover, entradas, pulsación— para cualquiera con "Efectos de
            animación" desactivado en Windows. */}
        <MotionConfig reducedMotion="never">
          <ControlsProvider controls={controls}>
            <ThemeProvider>{children}</ThemeProvider>
          </ControlsProvider>
        </MotionConfig>
        <ScrollReveal />
        <SpecularRim />
      </body>
    </html>
  );
}
