import { Fragment } from "react";

/**
 * Renderiza `**texto**` como <strong> y `` `texto` `` como <code> dentro de
 * una cadena plana.
 *
 * Permite que los archivos de `src/content/` sigan siendo datos puros
 * (sin JSX ni `dangerouslySetInnerHTML`) pero admitan énfasis y nombres de
 * código (columnas, archivos, tipos).
 */
export function RichText({ children }) {
  if (typeof children !== "string") return children;

  // El grupo capturado queda en los índices impares; la marca, en su texto.
  const parts = children.split(/(\*\*.+?\*\*|`.+?`)/g);

  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <code key={i}>{part.slice(1, -1)}</code>;
  });
}

export default RichText;
