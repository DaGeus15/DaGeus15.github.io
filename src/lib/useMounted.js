"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * `true` una vez que el componente vive en el cliente, `false` durante SSR.
 * Equivalente a `useEffect(() => setMounted(true), [])` pero sin el render
 * extra ni el error de lint `react-hooks/set-state-in-effect`.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default useMounted;
