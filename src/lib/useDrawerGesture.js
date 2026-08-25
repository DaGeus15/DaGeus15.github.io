"use client";

import { useCallback, useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform } from "framer-motion";
import { spring, project } from "./motion";
import { DRAWER_WIDTH } from "./breakpoints";

/**
 * Convierte el cajón móvil en un gesto en vez de una transición.
 *
 * Antes era `transform: translateX(-100%)` con una `transition` de CSS: no se
 * podía arrastrar, no se podía agarrar a media animación, no se podía revertir
 * y el velo sólo hacía fundido en lugar de seguir al dedo. La
 * interrumpibilidad es el principio del que dependen todos los demás: hay que
 * poder cambiar de opinión en mitad del movimiento.
 *
 * Tres detalles hacen la diferencia entre "funciona" y "se siente bien":
 *
 *   1. Al soltar se decide por a dónde VA el gesto, no por dónde se soltó
 *      (ver `project` en motion.js). Un toque corto y rápido cierra aunque el
 *      cajón apenas se haya movido.
 *   2. La velocidad de soltado entra al muelle como velocidad inicial, así no
 *      se ve la costura entre arrastrar y animar.
 *   3. El velo se ata a la posición del cajón, así que se oscurece DURANTE el
 *      arrastre en vez de esperar a que termine.
 *
 * @param {boolean}  isOpen        Estado del menú
 * @param {Function} onOpenChange  Lo mueve el gesto cuando decide por su cuenta
 * @param {boolean}  enabled       Sólo en móvil: en escritorio esto es el raíl
 */
export default function useDrawerGesture({ isOpen, onOpenChange, enabled }) {
  const x = useMotionValue(-DRAWER_WIDTH);

  // Cuando el gesto ya ha asentado el cajón por su cuenta, el efecto de abajo
  // no debe volver a animarlo: pisaría la animación que lleva la velocidad.
  const settledByDrag = useRef(false);

  /* El velo arranca donde acaba el cajón y lo acompaña. Se mueve con
     `transform` y no con `left` para que lo lleve el compositor. */
  const scrimX = useTransform(x, (v) => DRAWER_WIDTH + v);
  const scrimOpacity = useTransform(x, [-DRAWER_WIDTH, 0], [0, 1]);

  /* Cambios que NO vienen del gesto: el botón de menú, elegir una sección.
     El `stop()` de la limpieza es lo que lo hace interrumpible — si llega un
     destino nuevo a media animación, la anterior se detiene y la siguiente
     arranca desde donde esté, sin salto. */
  useEffect(() => {
    if (!enabled) return;
    if (settledByDrag.current) {
      settledByDrag.current = false;
      return;
    }
    const controls = animate(x, isOpen ? 0 : -DRAWER_WIDTH, spring.drawer);
    return () => controls.stop();
  }, [isOpen, enabled, x]);

  /* F-07: con el cajón abierto, tabular se escapaba al contenido de debajo del
     velo y no había forma de cerrarlo con teclado. `inert` saca el subárbol
     del foco Y del árbol de accesibilidad de una vez, así que no hace falta
     un paquete de diálogo para veinte líneas. */
  useEffect(() => {
    if (!enabled || !isOpen) return;

    const onKey = (event) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);

    const main = document.querySelector(".portfolio__content");
    main?.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
    };
  }, [enabled, isOpen, onOpenChange]);

  const handleDragEnd = useCallback(
    (_event, info) => {
      const destino = x.get() + project(info.velocity.x);
      const abierto = destino > -DRAWER_WIDTH / 2;

      settledByDrag.current = true;
      animate(x, abierto ? 0 : -DRAWER_WIDTH, {
        ...spring.drawer,
        velocity: info.velocity.x,
      });

      if (abierto !== isOpen) onOpenChange(abierto);
      else settledByDrag.current = false; // el efecto no va a dispararse
    },
    [isOpen, onOpenChange, x],
  );

  /* En escritorio no se devuelve ninguna prop de movimiento: este mismo
     elemento es el raíl, y su geometría la anima CSS (ver AGENTS.md). */
  const drawerProps = enabled
    ? {
        style: { x },
        drag: "x",
        dragConstraints: { left: -DRAWER_WIDTH, right: 0 },
        // Resistencia progresiva en el tope en vez de un frenazo seco.
        dragElastic: 0.06,
        // La inercia la ponemos nosotros con la velocidad de soltado.
        dragMomentum: false,
        onDragEnd: handleDragEnd,
      }
    : {};

  return { drawerProps, scrimX, scrimOpacity };
}
