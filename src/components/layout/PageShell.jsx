import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import { homePath, otherLang, pagePath } from "@/lib/locales";

/**
 * El marco de cada página de primer nivel: el salto al contenido, la píldora
 * con la página activa, el contenido y el pie. Componente de servidor: los
 * `href` de la píldora se resuelven aquí (una página, o el contacto del
 * inicio) y la píldora sólo los pinta.
 *
 * `current` es la página (`projects`, `about`…) o `null` en el inicio; el
 * enlace de idioma lleva a la misma página en el otro.
 */
export default function PageShell({ t, current = null, children }) {
  const { ui, lang } = t;
  const href = (item, l = lang) => {
    if (!item.anchor) return pagePath(l, item.id);
    return current === null && l === lang ? `#${item.id}` : `${homePath(l)}#${item.id}`;
  };
  const items = t.nav.map((item) => ({ ...item, href: href(item) }));
  const langHref = current === null ? homePath(otherLang(lang)) : pagePath(otherLang(lang), current);

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteNav
        variant="home"
        current={current}
        items={items}
        labels={{ mainNav: ui.mainNav, switchLang: ui.switchLang, home: ui.home }}
        name={t.profile.name}
        mobilePortrait={t.profile.mobilePortrait}
        homeHref={homePath(lang)}
        lang={lang}
        langHref={langHref}
      />

      <main id="main" className="page" data-page={current ?? "home"}>
        {children}
      </main>
      <div className="page">
        <Footer t={t} />
      </div>
    </>
  );
}
