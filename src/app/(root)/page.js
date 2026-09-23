/**
 * `/` → `/es/` o `/en/` según el navegador. El export estático no admite
 * `redirect()` en la configuración (static-exports.md, "Unsupported
 * Features"), así que se hace con un script inline que corre antes de pintar
 * nada. Sin JavaScript, `<noscript>` refresca al español y deja los enlaces.
 */
import Link from "next/link";

const redirectScript = `(function(){var l=(navigator.language||'').toLowerCase().indexOf('es')===0?'es':'en';location.replace('/'+l+'/'+location.hash);})();`;

export default function RootRedirect() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/es/" />
      </noscript>
      <p style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <Link href="/es/">Español</Link> · <Link href="/en/">English</Link>
      </p>
    </>
  );
}
