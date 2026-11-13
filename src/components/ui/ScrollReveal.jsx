"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISIBLE_DEPTH = 48;

/** El HTML ya se ve. Sólo anima las piezas que entran después de montar la página. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const pending = new Set(document.querySelectorAll("#main .reveal:not([data-scroll-reveal])"));
    let observer;
    let bottomInset;

    const observe = () => {
      if (!pending.size) return;
      const padding = getComputedStyle(document.documentElement).scrollPaddingBottom;
      const navInset = parseFloat(padding) || 0;
      const inset = navInset + VISIBLE_DEPTH;
      if (inset === bottomInset) return;
      bottomInset = inset;
      observer?.disconnect();
      observer = new IntersectionObserver((entries, activeObserver) => {
        let order = 0;
        for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
          if (!isIntersecting) {
            // Prepara sólo lo que aún queda por debajo de la zona visible.
            if (rootBounds && boundingClientRect.top >= rootBounds.bottom + VISIBLE_DEPTH) {
              target.dataset.scrollPending = "";
            }
            continue;
          }
          pending.delete(target);
          activeObserver.unobserve(target);
          if (!("scrollPending" in target.dataset)) continue;
          delete target.dataset.scrollPending;
          target.style.setProperty("--reveal-order", Math.min(order++, 2));
          target.dataset.scrollReveal = "";
        }
      }, { rootMargin: `0px 0px -${inset}px 0px` });
      pending.forEach((el) => observer.observe(el));
    };

    observe();
    window.addEventListener("resize", observe, { passive: true });
    return () => {
      window.removeEventListener("resize", observe);
      observer?.disconnect();
      for (const target of pending) delete target.dataset.scrollPending;
    };
  }, [pathname]);

  return null;
}
