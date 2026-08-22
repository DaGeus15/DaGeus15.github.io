"use client";

/**
 * Fondo ambiental.
 *
 * Tres capas, ninguna con `filter: blur()`:
 *   1. malla de gradientes radiales — el color de fondo
 *   2. grano — rompe el bandeado de los degradados grandes
 *   3. viñeta — oscurece los bordes y da profundidad
 *
 * La versión anterior apilaba una rejilla de 50px sobre tres círculos con
 * `blur(80px)`. La rejilla daba el aspecto de plantilla genérica, y desenfocar
 * elementos de 46vw es de lo más caro que puede pintar el navegador. Los
 * gradientes radiales dan una caída perfectamente suave sin filtro alguno.
 */
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__mesh" />
      <div className="aurora__grain" />
      <div className="aurora__vignette" />
    </div>
  );
}
