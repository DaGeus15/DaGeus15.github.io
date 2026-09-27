import Image from "next/image";

/**
 * Marco de una captura: ventana (web) o teléfono (móvil), según las
 * proporciones del archivo. Un bisel fino y un borde de 1px, sin barra de
 * navegador falsa: la captura es la protagonista.
 *
 * `alt` vacío cuando la captura es decorativa (en una tarjeta cuyo enlace ya
 * nombra el proyecto); en la galería lleva el pie. `eager` para la que está
 * arriba al cargar (la cabecera de un caso): `priority` está obsoleto en
 * Next 16.
 */
export default function Frame({ shot, alt = "", className = "", eager = false }) {
  return (
    <span className={`frame ${shot.mobile ? "frame--phone" : "frame--window"} ${className}`}>
      <Image
        src={shot.src}
        width={shot.w}
        height={shot.h}
        alt={alt}
        className="frame__img"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        draggable={false}
      />
    </span>
  );
}
