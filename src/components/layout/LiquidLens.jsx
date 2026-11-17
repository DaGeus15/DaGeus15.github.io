"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { spring, tween } from "@/lib/motion";

/**
 * La lente de la sección activa en la píldora: una gota de cristal elevada
 * (degradado, filo de luz, borde y sombra) que se estira al cambiar de
 * sección y se recoge al llegar.
 *
 * Sus dos bordes son motion values independientes. El que va delante (hacia
 * donde se mueve) llega rápido y el de detrás lo sigue más lento: durante el
 * trayecto la lente cubre las dos secciones y después se contrae. Sin rebote
 * (ver `lib/motion.js`): se estira y se asienta.
 *
 * Se mueve con `translateX` y cambia de `width`. Es la única excepción a
 * "sólo transform y opacity": va en posición absoluta, así que su ancho no
 * mueve nada más, y un `clip-path` (lo que había antes) recortaba también su
 * borde y su sombra, que es lo que la hace leerse como cristal elevado.
 *
 * `listRef` es la `<ul>` de enlaces; cada enlace lleva `data-id`.
 */
export default function LiquidLens({ listRef, active }) {
  const left = useMotionValue(0);
  const right = useMotionValue(0);
  const opacity = useMotionValue(0);
  const glint = useMotionValue(1);
  const restingWidth = useMotionValue(0);
  const placed = useRef(false);

  const width = useTransform([left, right], ([l, r]) => Math.max(r - l, 0));
  const scaleY = useTransform([width, restingWidth], ([current, resting]) =>
    1 - Math.min(Math.max(current - resting, 0) / 280, 0.16),
  );
  const glintSlide = useTransform(glint, [0, 1], ["translateX(-38%)", "translateX(38%)"]);
  const glintOpacity = useTransform(glint, [0, 0.34, 0.66, 1], [0, 0.95, 0.95, 0]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const link = active ? list.querySelector(`[data-id="${active}"]`) : null;
    let lastLeft;
    let lastRight;

    const measure = (resized) => {
      const linkWidth = link?.offsetWidth ?? 0;
      if (!linkWidth) {
        // Al dejar la sección activa, el cristal se apaga en su sitio.
        if (lastRight === 0) return;
        lastRight = 0;
        left.stop();
        right.stop();
        animate(opacity, 0, tween.fast);
        return;
      }
      const l = link.offsetLeft;
      const r = l + linkWidth;
      // La notificación inicial del observer mide el mismo destino. Con un
      // salto ahí, los springs recién iniciados nunca llegan a estirarla.
      if (l === lastLeft && r === lastRight) return;
      lastLeft = l;
      lastRight = r;

      const forward = l >= left.get();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      restingWidth.jump(linkWidth);
      animate(opacity, 1, tween.fast);
      if (!resized && !reduced) {
        glint.jump(forward ? 0 : 1);
        animate(glint, forward ? 1 : 0, tween.glint);
      }

      if (resized || !placed.current || reduced) {
        // `jump` coloca y además detiene cualquier animación en curso.
        left.jump(l);
        right.jump(r);
        placed.current = true;
        return;
      }
      animate(left, l, forward ? spring.trail : spring.lead);
      animate(right, r, forward ? spring.lead : spring.trail);
    };

    measure(false);
    const ro = new ResizeObserver(() => measure(true));
    ro.observe(list);
    list.querySelectorAll("[data-id]").forEach((link) => ro.observe(link));
    return () => ro.disconnect();
  }, [active, listRef, left, right, opacity, glint, restingWidth]);

  return (
    <motion.span className="site-nav__active" aria-hidden="true" style={{ x: left, width, opacity, scaleY }}>
      <motion.span className="site-nav__glint" style={{ transform: glintSlide, opacity: glintOpacity }} />
    </motion.span>
  );
}
