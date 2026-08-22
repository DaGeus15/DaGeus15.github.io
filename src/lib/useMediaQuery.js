"use client";

import { useSyncExternalStore } from "react";

/**
 * Suscribe un componente a una media query sin causar renders en cascada.
 *
 * Usa `useSyncExternalStore` en vez de `useEffect` + `setState` porque el
 * segundo dispara un render extra en el montaje (y ESLint lo marca como
 * `react-hooks/set-state-in-effect`). El snapshot del servidor siempre
 * devuelve `false` para que el HTML estático sea consistente.
 */
export function useMediaQuery(query) {
  const subscribe = (callback) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
