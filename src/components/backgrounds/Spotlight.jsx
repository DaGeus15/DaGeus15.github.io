"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";
import { HOVER_QUERY } from "@/lib/breakpoints";

/**
 * Halo radial suave que sigue al cursor.
 *
 * La versión anterior construía un `radial-gradient` NUEVO en la propiedad
 * `background` de un elemento que ocupa toda la pantalla, en cada fotograma.
 * Los degradados no se pueden componer en GPU: obligaba al navegador a
 * rasterizar 100vw × 100dvh en el hilo principal cada vez que se movía el
 * ratón, y como ese repintado cambia el fondo de todas las superficies con
 * `backdrop-filter`, además forzaba a recalcular el desenfoque de todas.
 *
 * Ahora el degradado es ESTÁTICO y está pintado una sola vez en un círculo de
 * tamaño fijo; lo único que cambia es su `transform`. Eso lo lleva el
 * compositor, sin tocar el hilo principal ni invalidar ningún desenfoque.
 */
export default function Spotlight() {
  const mouseX = useMotionValue(-1500);
  const mouseY = useMotionValue(-1500);
  const x = useSpring(mouseX, spring.ambient);
  const y = useSpring(mouseY, spring.ambient);

  useEffect(() => {
    // Sólo en dispositivos con puntero fino: en táctil no aporta nada
    // y evitamos suscribirnos a eventos innecesarios.
    if (!window.matchMedia(HOVER_QUERY).matches) return;

    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div className="spotlight" aria-hidden="true">
      <motion.div className="spotlight__halo" style={{ x, y }} />
    </div>
  );
}
