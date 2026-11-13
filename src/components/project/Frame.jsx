import Image from "next/image";
import cardShots from "@/content/cardShots";

/**
 * Marco de una captura: ventana (web) o teléfono (móvil), según las
 * proporciones del archivo. Un bisel fino y un borde de 1px, sin barra de
 * navegador falsa: la captura es la protagonista.
 *
 * `alt` vacío cuando la captura es decorativa (en una tarjeta cuyo enlace ya
 * nombra el proyecto); en la galería lleva el pie. La cabecera del caso
 * carga de inmediato con prioridad alta. Inicio también solicita de
 * inmediato sus destacados, con prioridad baja para dejar pasar el retrato.
 *
 * `sizes` es para las tarjetas, donde la captura se pinta mucho más chica que
 * el archivo: con él, el navegador elige entre la variante pequeña
 * (`npm run cards`) y el original. Con `images.unoptimized`, `next/image` no
 * genera `srcset`, así que va en un `<source>`. La galería y el visor no lo
 * pasan: ahí se ve el original.
 */
export default function Frame({
  shot,
  alt = "",
  className = "",
  eager = false,
  fetchPriority = eager ? "high" : undefined,
  sizes,
}) {
  const small = sizes ? cardShots[shot.src] : null;
  return (
    <span className={`frame ${shot.mobile ? "frame--phone" : "frame--window"} ${className}`}>
      <picture className="frame__picture">
        {small && <source srcSet={`${small.src} ${small.w}w, ${shot.src} ${shot.w}w`} sizes={sizes} />}
        <Image
          src={shot.src}
          width={shot.w}
          height={shot.h}
          alt={alt}
          className="frame__img"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={fetchPriority}
          draggable={false}
        />
      </picture>
    </span>
  );
}
