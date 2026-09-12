import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { LanguageProvider, langInitScript } from "@/lib/i18n";
import profile from "@/content/profile";
import "./globals.css";

const monaSans = localFont({
  src: "../../public/assets/fonts/Mona-Sans.woff2",
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://dageus15.github.io";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} | ${profile.role}`,
  description: `Portafolio personal de ${profile.name}, ${profile.role}. Desarrollo backend y full-stack con Spring Boot, NestJS e infraestructura cloud.`,
  keywords: ["Dayle Garcia", "Software Engineer", "Next.js", "NestJS", "Spring Boot", "Portafolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: `${profile.name} — Portafolio`,
    title: `${profile.name} | ${profile.role}`,
    description: `Portafolio personal de ${profile.name}. Desarrollo backend y full-stack con Spring Boot, NestJS e infraestructura cloud.`,
    // Dimensiones reales de la foto. Es un retrato, no el 1200x630 apaisado
    // que prefieren las redes: la vista previa saldrá recortada o en pequeño.
    // Para un enlace más vistoso habría que crear una imagen OG dedicada.
    images: [{ url: profile.avatar, width: 480, height: 660, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: `Portafolio personal de ${profile.name}.`,
    images: [profile.avatar],
  },
};

/**
 * `themeColor` se declara aquí y no en `metadata`: Next lo movió al export
 * `viewport` (ver node_modules/next/dist/docs/.../generate-viewport.md).
 * `viewportFit: "cover"` habilita las variables env(safe-area-inset-*) que
 * usa el layout móvil para no meterse debajo del notch.
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#080e11" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Aplica el tema antes del primer paint para que no haya flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Y el idioma: deja `lang` y `data-lang` puestos antes de hidratar. */}
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className={monaSans.variable}>
        {/* `reducedMotion="never"`: el movimiento reducido NO se aplica en
            bloque. Con "user" se apagaban todos los transform de framer —hover,
            pulsación, dock, entradas, magnetismo— y, con "Efectos de animación"
            desactivado en Windows (muy común, y que el navegador traduce a
            `prefers-reduced-motion`), la página entera quedaba muerta mientras
            cualquier otro sitio seguía animando.

            Movimiento reducido pide quitar el movimiento GRANDE, el que
            desplaza la escena (fondo que gira, rueda 3D, paralaje), no la
            respuesta pequeña de un botón. Así que se decide efecto a efecto:
            los que mueven la escena leen `useReducedMotion()` y cambian a su
            versión suave (Aurora, Orbits, WheelItem); los pequeños animan
            siempre. Si añadís un efecto que mueva media pantalla, que lea
            `useReducedMotion()` también. */}
        <MotionConfig reducedMotion="never">
          <LanguageProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
