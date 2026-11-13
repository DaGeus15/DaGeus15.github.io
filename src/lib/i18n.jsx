"use client";

import { createContext, useContext } from "react";

/**
 * Cadenas de los controles que se repiten en todas las rutas. El layout las
 * resuelve en el servidor para evitar llevar el catálogo al navegador.
 */
const ControlsContext = createContext(null);

export function ControlsProvider({ controls, children }) {
  return <ControlsContext.Provider value={controls}>{children}</ControlsContext.Provider>;
}

export function useControls() {
  return useContext(ControlsContext);
}
