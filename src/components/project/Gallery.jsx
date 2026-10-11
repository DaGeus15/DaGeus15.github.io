"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Frame from "./Frame";

/**
 * Transición compartida: la imagen `from` se convierte en la que devuelve
 * `getTo()` tras ejecutar `update`. Las dos llevan el mismo
 * `view-transition-name` (una antes, otra después), así que el navegador
 * anima la caja de una a otra; el resto de la página se funde.
 *
 * Sin View Transitions, con movimiento reducido o sin imagen de origen o de
 * destino, `update` se ejecuta tal cual y queda el fundido del diálogo.
 * `kind` marca el sentido en el <html> (ver `[data-vt^="shot"]` en case.css).
 */
function morph(from, update, getTo, kind) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduced || !from) {
    update();
    return;
  }
  const root = document.documentElement;
  root.dataset.vt = kind;
  from.style.viewTransitionName = "shot";
  let to = null;
  const transition = document.startViewTransition(() => {
    from.style.viewTransitionName = "";
    update();
    to = getTo();
    if (to) to.style.viewTransitionName = "shot";
  });
  transition.finished.finally(() => {
    if (to) to.style.viewTransitionName = "";
    delete root.dataset.vt;
  });
}

/**
 * Galería de capturas de un caso de estudio, con visor a pantalla completa.
 *
 * El visor es un `<dialog>` nativo abierto con `showModal()`: el foco queda
 * dentro, Escape lo cierra y el resto de la página queda inerte sin escribir
 * nada de eso a mano. Las flechas del teclado pasan de captura; un clic fuera
 * de la imagen cierra.
 *
 * Al abrir, la captura crece desde su miniatura hasta el visor, y al cerrar
 * (X, Escape o clic fuera) vuelve a la miniatura de la captura que se esté
 * viendo: las cosas salen de donde se tocaron (`morph`, View Transitions).
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
  const thumbRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(null);
  const shot = shots[index];
  const many = shots.length > 1;

  const open = (i) => {
    const show = () => {
      // Dentro de la transición el DOM tiene que estar ya cambiado cuando
      // el navegador hace la foto del "después": por eso `flushSync`.
      flushSync(() => {
        setIndex(i);
        setDir(null);
      });
      dialogRef.current?.showModal();
    };
    morph(thumbImg(i), show, lightboxImg, "shot-open");
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    morph(lightboxImg(), () => dialog.close(), () => visible(thumbImg(index)), "shot-close");
  };

  /** La imagen de la miniatura `i` y la del visor. */
  const thumbImg = (i) => thumbRefs.current[i]?.querySelector("img") ?? null;
  const lightboxImg = () => dialogRef.current?.querySelector(".lightbox__img") ?? null;
  /** Sólo se vuelve a una miniatura que está en pantalla; si no, fundido. */
  const visible = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight ? el : null;
  };
  const step = (delta) => {
    setDir(delta > 0 ? "next" : "prev");
    setIndex((i) => (i + delta + shots.length) % shots.length);
  };

  return (
    <>
      {/* Dos columnas con 2 o 4 capturas, tres con el resto: así las filas
          cierran parejas siempre que se puede (3, 6, 4 = 2 × 2). */}
      <ul className="gallery" data-cols={shots.length <= 2 || shots.length === 4 ? 2 : 3}>
        {shots.map((s, i) => (
          <li key={s.id} className="gallery__item" data-mobile={s.mobile || undefined}>
            <figure className="gallery__figure">
              <button
                type="button"
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                className="gallery__open"
                onClick={() => open(i)}
                aria-label={s.openLabel}
              >
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
        onCancel={(e) => {
          // Escape: que cierre por el mismo camino que la X (de vuelta a la
          // miniatura), no de golpe.
          e.preventDefault();
          close();
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
            loading="eager"
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
