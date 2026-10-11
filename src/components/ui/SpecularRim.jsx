"use client";

import { useEffect } from "react";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * El filo de las superficies enlazables (`data-rim`: tarjetas de trabajo,
 * siguiente proyecto, el formulario) atrapa la luz donde está el puntero,
 * como el bisel de un cristal. Pinta el CSS (`[data-rim]::after` en
 * light.css); esto sólo mueve `--rim-x`/`--rim-y`.
 *
 * Un solo listener para toda la página y sin estado de React. El rectángulo
 * se mide al entrar en la superficie y al desplazarse, no en cada
 * movimiento. Sin ratón (táctil) no se monta: no hay puntero que seguir.
 */
export default function SpecularRim() {
  useEffect(() => {
    if (!window.matchMedia(HOVER_QUERY).matches) return;
    let el = null;
    let rect = null;

    const onOver = (e) => {
      const next = e.target.closest?.("[data-rim]") ?? null;
      if (next === el) return;
      el = next;
      rect = el ? el.getBoundingClientRect() : null;
    };
    const onMove = (e) => {
      if (!el) return;
      rect ??= el.getBoundingClientRect();
      el.style.setProperty("--rim-x", `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--rim-y", `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    };
    const onScroll = () => {
      rect = null;
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
