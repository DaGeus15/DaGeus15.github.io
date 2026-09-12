"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import Starfield from "@/components/backgrounds/Starfield";

/**
 * Fondo ambiental que se mueve con el scroll.
 *
 * Capas, de atrás hacia delante, ninguna con `filter: blur()`:
 *   1. campo frío   — manchas de acento; gira en un sentido
 *   2. campo cálido — manchas de piel/pared; gira en el contrario y sube
 *   3. luz cenital, grano y viñeta — estáticos
 *
 * Las órbitas NO viven aquí: están en `Orbits.jsx`, partidas en una mitad
 * detrás de las tarjetas y otra delante. Aquí, detrás de todo, las tapaban.
 *
 * Esto está detrás de las superficies con `backdrop-filter`, así que cada capa
 * se pinta UNA vez y sólo cambia su `transform`, y sólo cuando cambia el
 * scroll: el coste de recalcular los desenfoques existe mientras el visitante
 * desplaza, nunca con la página quieta.
 *
 * `progress` = 0 da transformaciones a cero y opacidad 1, así que servidor y
 * cliente hidratan igual tenga o no el visitante movimiento reducido.
 *
 * Con movimiento reducido el fondo no gira ni se desplaza —movimiento a
 * pantalla completa, lo que de verdad marea—, pero tampoco se congela: la
 * temperatura CAMBIA en su sitio. El campo frío se apaga a medida que se
 * baja y el cálido queda solo. Un cambio de color no es movimiento, así que
 * la página sigue respondiendo al scroll para todos.
 */
export default function Aurora({ progress }) {
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const coolRotate = useTransform(progress, [0, 1], [0, 34 * k]);
  const coolScale = useTransform(progress, [0, 1], [1, 1 + 0.1 * k]);
  const coolOpacity = useTransform(progress, [0, 1], [1, reduce ? 0.4 : 1]);
  const warmRotate = useTransform(progress, [0, 1], [0, -26 * k]);
  const warmY = useTransform(progress, [0, 1], ["0vh", `${-9 * k}vh`]);

  return (
    <div className="aurora" aria-hidden="true">
      <motion.div
        className="aurora__field aurora__field--cool"
        style={{ rotate: coolRotate, scale: coolScale, opacity: coolOpacity }}
      />
      <motion.div
        className="aurora__field aurora__field--warm"
        style={{ rotate: warmRotate, y: warmY }}
      />
      <Starfield progress={progress} />
      <div className="aurora__zenith" />
      <div className="aurora__grain" />
      <div className="aurora__vignette" />
    </div>
  );
}
