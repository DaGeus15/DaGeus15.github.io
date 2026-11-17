"use client";

import { useEffect, useId, useRef } from "react";

const DISPLACEMENT = 28;
const SOLID_GLASS = "(prefers-reduced-transparency: reduce), (prefers-contrast: more)";

function supportsBackdropRefraction() {
  // La sintaxis url() también se acepta en motores que no refractan el
  // fondo. Sólo habilitamos esta capa en Chromium y conservamos el blur CSS.
  const brands = navigator.userAgentData?.brands;
  const chromium = brands?.length
    ? brands.some(({ brand }) => brand === "Chromium")
    : /\b(?:Headless)?Chrome\/\d/.test(navigator.userAgent);
  return chromium && CSS.supports("backdrop-filter", 'url("#glass")');
}

/**
 * Las normales del rectángulo redondeado forman el bisel. Rojo y verde
 * desplazan la muestra horizontal y vertical. El centro hace un aumento
 * pequeño y el canto curva más el fondo, todo en el mismo mapa.
 */
function buildDisplacementMap(canvas, context, width, height, radius) {
  canvas.width = width;
  canvas.height = height;
  const image = context.createImageData(width, height);
  const bevel = Math.min(radius, 11);
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const flatX = halfWidth - radius;
  const flatY = halfHeight - radius;
  const { data } = image;

  for (let y = 0; y < height; y++) {
    const localY = y + 0.5 - halfHeight;
    const dy = Math.max(Math.abs(localY) - flatY, 0) * Math.sign(localY);
    for (let x = 0; x < width; x++) {
      const localX = x + 0.5 - halfWidth;
      const dx = Math.max(Math.abs(localX) - flatX, 0) * Math.sign(localX);
      const distance = Math.hypot(dx, dy);
      const pixel = (y * width + x) * 4;
      const depth = Math.max(radius - distance, 0);
      // El perfil cae a cero antes del texto. La muestra se desplaza
      // hacia dentro, lo que agranda el fondo a lo largo del canto.
      const bend = depth < bevel && distance > 0 ? (1 - depth / bevel) ** 1.6 / distance : 0;
      const center = Math.min(depth / bevel, 1);
      data[pixel] = 128 - 112 * bend * dx - 18 * center * localX / halfWidth;
      data[pixel + 1] = 128 - 112 * bend * dy - 25 * center * localY / halfHeight;
      data[pixel + 2] = 128;
      data[pixel + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export default function GlassBackdrop({ className = "" }) {
  const filterId = useId();
  const backdropRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!supportsBackdropRefraction()) return;
    const layer = backdropRef.current;
    const image = imageRef.current;
    const shape = layer?.parentElement;
    if (!shape || !image) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    const preference = window.matchMedia(SOLID_GLASS);
    let size = "";

    const update = () => {
      if (preference.matches) {
        layer.removeAttribute("data-refractive");
        return;
      }
      const w = shape.clientWidth;
      const h = shape.clientHeight;
      const radius = Math.min(w / 2, h / 2, parseFloat(getComputedStyle(shape).borderTopLeftRadius));
      if (!w || !h || !radius) return;

      const key = `${w}:${h}:${radius}`;
      if (key !== size) {
        image.setAttribute("width", String(w));
        image.setAttribute("height", String(h));
        image.setAttribute("href", buildDisplacementMap(canvas, context, w, h, radius));
        size = key;
      }
      layer.setAttribute("data-refractive", "");
    };

    const observer = new ResizeObserver(update);
    observer.observe(shape);
    preference.addEventListener("change", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      layer.removeAttribute("data-refractive");
    };
  }, []);

  return (
    <>
      <svg className="glass-backdrop__optics" width="0" height="0" aria-hidden="true">
        <filter id={filterId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.3" result="scene" />
          <feImage ref={imageRef} x="0" y="0" preserveAspectRatio="none" result="normals" />
          <feDisplacementMap in="scene" in2="normals" scale={DISPLACEMENT} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <span className={`glass-backdrop__scene ${className}`} ref={backdropRef} style={{ "--glass-refraction": `url("#${filterId}")` }} />
    </>
  );
}
