"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Frame from "./Frame";

/**
 * Galería de capturas de un caso de estudio, con visor a pantalla completa.
 *
 * El visor es un `<dialog>` nativo abierto con `showModal()`: el foco queda
 * dentro, Escape lo cierra y el resto de la página queda inerte sin escribir
 * nada de eso a mano. Las flechas del teclado pasan de captura; un clic fuera
 * de la imagen cierra.
 *
 * El diálogo está siempre en el árbol (mismo HTML en servidor y cliente);
 * sólo cambia la captura que muestra. Al pasar de captura, la nueva entra
 * desde el lado hacia el que se avanza (`data-dir`, `@starting-style` en
 * case.css): la imagen se vuelve a montar por su `key`. Al abrir no hay
 * dirección: entra el diálogo entero. `labels` y `openLabel` llegan ya
 * resueltos: las funciones de `ui` no cruzan a un componente de cliente.
 */
export default function Gallery({ shots, labels }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(null);
  const shot = shots[index];
  const many = shots.length > 1;

  const open = (i) => {
    setIndex(i);
    setDir(null);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (delta) => {
    setDir(delta > 0 ? "next" : "prev");
    setIndex((i) => (i + delta + shots.length) % shots.length);
  };

  return (
    <>
      <ul className="gallery">
        {shots.map((s, i) => (
          <li key={s.id} className="gallery__item" data-mobile={s.mobile || undefined}>
            <figure className="gallery__figure">
              <button type="button" className="gallery__open" onClick={() => open(i)} aria-label={s.openLabel}>
                <Frame shot={s} />
              </button>
              <figcaption className="gallery__caption">{s.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={shot.caption}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        <div className="lightbox__inner" data-mobile={shot.mobile || undefined} data-dir={dir || undefined}>
          <Image
            key={shot.id}
            src={shot.src}
            width={shot.w}
            height={shot.h}
            alt={shot.caption}
            className="lightbox__img"
          />
          <div className="lightbox__bar">
            <p className="lightbox__caption">{shot.caption}</p>
            {many && (
              <span className="lightbox__count mono">
                {index + 1} / {shots.length}
              </span>
            )}
            <div className="lightbox__controls">
              {many && (
                <>
                  <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label={labels.prev}>
                    <FiChevronLeft aria-hidden="true" />
                  </button>
                  <button type="button" className="icon-btn" onClick={() => step(1)} aria-label={labels.next}>
                    <FiChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
              <button type="button" className="icon-btn" onClick={close} aria-label={labels.close} autoFocus>
                <FiX aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
