"use client";

import { useEffect } from "react";

const SAMPLE_SIZE = 20;
const CONTROLS = ".site-nav__name, .site-nav__link, .site-nav__back, .site-nav__mobile-home, .pref-btn";
const FRAMES = ".work-card, .case-cover";
const DARK_FRAME_VALUE = 0.12;

function containsPoint(rect, x, y) {
  return x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
}

/** Toma muestras pequeñas de las capturas locales, sin copiar el DOM ni
 * leer el canvas en cada scroll. Éstas son las superficies que cruzan el
 * cristal con cambios grandes de luminosidad. */
export default function useGlassInk(navRef, route) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const captures = Array.from(document.querySelectorAll("#main .frame__img"), (image) => ({
      image,
      clip: image.closest(FRAMES),
      cover: Boolean(image.closest(".shot-stage__cover.is-tall")),
    }));
    const darkFrames = Array.from(document.querySelectorAll("#main :is(.work-card, .case-cover)[data-tone='dark']"));
    if (!captures.length && !darkFrames.length) return;

    const controls = nav.querySelectorAll(CONTROLS);
    const visible = new Set();
    const samples = new WeakMap();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SAMPLE_SIZE;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let frame = 0;
    let targets = [];

    function readLuminance(image, u, v, pageValue) {
      if (image.naturalWidth === 0) return pageValue;
      let sample = samples.get(image);
      if (sample?.src !== image.currentSrc) {
        ctx.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        ctx.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        sample = { src: image.currentSrc, data };
        samples.set(image, sample);
      }
      const x = Math.min(Math.floor(u * SAMPLE_SIZE), SAMPLE_SIZE - 1);
      const y = Math.min(Math.floor(v * SAMPLE_SIZE), SAMPLE_SIZE - 1);
      const i = (y * SAMPLE_SIZE + x) * 4;
      const { data } = sample;
      const alpha = data[i + 3] / 255;
      const luminance = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      return luminance * alpha + pageValue * (1 - alpha);
    }

    function update() {
      frame = 0;
      if (!nav.querySelector("[data-refractive]")) return;
      const isDark = document.documentElement.dataset.theme !== "light";
      const pageValue = isDark ? 0.08 : 0.94;
      const tint = isDark ? 0.24 : 0.19;
      const darkRects = darkFrames
        .filter((frame) => visible.has(frame))
        .map((frame) => frame.getBoundingClientRect());
      const rects = captures
        .filter(({ image }) => visible.has(image))
        .map(({ image, clip, cover }) => {
          const rect = image.getBoundingClientRect();
          const renderedHeight = cover && image.naturalWidth
            ? Math.max(rect.height, rect.width * image.naturalHeight / image.naturalWidth)
            : rect.height;
          return { image, rect, renderedHeight, bounds: clip?.getBoundingClientRect() ?? rect };
        });

      for (const { control, x, y, width } of targets) {
        const lightness = [0.25, 0.5, 0.75].reduce((total, position) => {
          const point = x + width * position;
          const surface = darkRects.some((rect) => containsPoint(rect, point, y)) ? DARK_FRAME_VALUE : pageValue;
          const capture = rects.findLast(({ rect, bounds }) =>
            containsPoint(rect, point, y) && containsPoint(bounds, point, y),
          );
          if (!capture) return total + surface;
          const { image, rect, renderedHeight } = capture;
          return total + readLuminance(image, (point - rect.left) / rect.width, (y - rect.top) / renderedHeight, surface);
        }, 0) / 3;

        const underGlass = lightness * (1 - tint) + pageValue * tint;
        const previous = control.dataset.glassInk;
        // Un margen pequeño en ambos sentidos amortigua el cambio de tinta
        // cuando una línea clara oscila justo bajo el borde de una etiqueta.
        const next = underGlass >= (previous === "dark" ? 0.48 : 0.52) ? "dark" : "light";
        if (previous !== next) control.dataset.glassInk = next;
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      targets = Array.from(controls).flatMap((control) => {
        const label = control.querySelector(".site-nav__label") ?? control;
        const { left, top, width, height } = label.getBoundingClientRect();
        return width ? [{ control, x: left, y: top + height / 2, width }] : [];
      });
      schedule();
    }

    const intersection = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      }
      schedule();
    });
    for (const { image } of captures) {
      intersection.observe(image);
      image.addEventListener("load", schedule);
    }
    for (const surface of darkFrames) intersection.observe(surface);
    const resize = new ResizeObserver(measure);
    resize.observe(nav);
    for (const control of controls) resize.observe(control);
    const theme = new MutationObserver(schedule);
    theme.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    measure();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      intersection.disconnect();
      resize.disconnect();
      theme.disconnect();
      for (const { image } of captures) image.removeEventListener("load", schedule);
      for (const control of controls) delete control.dataset.glassInk;
    };
  }, [navRef, route]);
}
