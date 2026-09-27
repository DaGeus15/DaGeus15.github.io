/** Pie discreto: quién lo hizo y con qué. Un detalle que los técnicos leen. */
export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <p>{t.ui.footer}</p>
      <p className="mono">© {new Date().getFullYear()} {t.profile.name}</p>
    </footer>
  );
}
