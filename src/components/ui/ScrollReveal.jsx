"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** El HTML ya se ve. Sólo anima las piezas que entran después de montar la página. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const offscreen = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      let order = 0;
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) {
          offscreen.add(target);
          continue;
        }
        observer.unobserve(target);
        if (!offscreen.has(target)) continue;
        target.style.setProperty("--reveal-order", Math.min(order++, 2));
        target.dataset.scrollReveal = "";
      }
    }, { rootMargin: "0px 0px -24px 0px" });

    document.querySelectorAll("#main .reveal:not([data-scroll-reveal])").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
