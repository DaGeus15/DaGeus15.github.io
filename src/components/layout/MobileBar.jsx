import Link from "next/link";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { homePath } from "@/lib/locales";

/**
 * Barra fija de móvil (<1024px): nombre, idioma y tema siempre a mano. Es el
 * único cristal que queda en el sitio, porque es lo único que se desplaza por
 * encima de contenido. En escritorio no se renderiza visible (ver layout.css).
 */
export default function MobileBar({ t, langHref }) {
  const { profile, ui, lang } = t;

  return (
    <div className="mobile-bar">
      <Link href={homePath(lang)} className="mobile-bar__name">
        {profile.name}
      </Link>
      <div className="mobile-bar__prefs">
        <LangSwitch lang={lang} href={langHref} label={ui.switchLang} />
        <ThemeToggle />
      </div>
    </div>
  );
}
