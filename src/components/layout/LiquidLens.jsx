"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { spring } from "@/lib/motion";

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
  const placed = useRef(false);

  const width = useTransform([left, right], ([l, r]) => Math.max(r - l, 0));
  const opacity = useTransform(width, (w) => (w > 1 ? 1 : 0));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = (instant) => {
      const link = active ? list.querySelector(`[data-id="${active}"]`) : null;
      // Sin sección (arriba del todo) o con su enlace oculto (móvil): la
      // lente se cierra sobre sí misma donde estaba.
      if (!link || link.offsetWidth === 0) {
        const mid = (left.get() + right.get()) / 2;
        animate(left, mid, spring.snappy);
        animate(right, mid, spring.snappy);
        return;
      }
      const l = link.offsetLeft;
      const r = l + link.offsetWidth;
      if (instant || !placed.current) {
        // `jump` coloca y además detiene cualquier animación en curso.
        left.jump(l);
        right.jump(r);
        placed.current = true;
        return;
      }
      const forward = l > left.get();
      animate(left, l, forward ? spring.trail : spring.lead);
      animate(right, r, forward ? spring.lead : spring.trail);
    };

    measure(false);
    const ro = new ResizeObserver(() => measure(true));
    ro.observe(list);
    return () => ro.disconnect();
  }, [active, listRef, left, right]);

  return <motion.span className="site-nav__active" aria-hidden="true" style={{ x: left, width, opacity }} />;
}
