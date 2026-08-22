import { Fragment } from "react";

/**
 * Renderiza `**texto**` como <strong> dentro de una cadena plana.
 *
 * Permite que los archivos de `src/content/` sigan siendo datos puros
 * (sin JSX ni `dangerouslySetInnerHTML`) pero admitan énfasis.
 */
export function RichText({ children }) {
  if (typeof children !== "string") return children;

  const parts = children.split(/\*\*(.+?)\*\*/g);

  return parts.map((part, i) =>
    // Los índices impares son el contenido capturado entre asteriscos.
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

export default RichText;
