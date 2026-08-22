import localFont from "next/font/local";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
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
  description: `Portafolio personal de ${profile.name}, ${profile.role}. Desarrollo full-stack, arquitectura cloud e Inteligencia Artificial.`,
  keywords: ["Dayle Garcia", "Software Engineer", "Next.js", "NestJS", "Spring Boot", "Portafolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: `${profile.name} — Portafolio`,
    title: `${profile.name} | ${profile.role}`,
    description: `Portafolio personal de ${profile.name}. Desarrollo full-stack, arquitectura cloud e IA.`,
    images: [{ url: profile.avatar, width: 1200, height: 630, alt: profile.name }],
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
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Aplica el tema antes del primer paint para que no haya flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={monaSans.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
