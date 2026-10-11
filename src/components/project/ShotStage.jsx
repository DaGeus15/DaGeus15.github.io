import { ViewTransition } from "react";
import Frame from "./Frame";

/**
 * Composición de capturas de la cabecera de un caso: dos teléfonos lado a
 * lado si la principal es de móvil, o la ventana con el teléfono encima.
 * La misma composición que la tarjeta de la portada.
 *
 * `transitionName`: la captura principal lleva el mismo nombre que en su
 * tarjeta de la portada, así que al navegar entre las dos páginas crece
 * desde la tarjeta (y vuelve a ella al regresar). Ver `.morph` en case.css.
 */
export default function ShotStage({ cover, inset, eager = false, transitionName }) {
  const layout = cover.mobile ? "phones" : "window";
  // Más alta que 16:10 (Fiado, casi cuadrada): en la cabecera se ve desde
  // arriba en una ventana 16:10 y no ocupa la pantalla entera. Entera, en la
  // galería y en el visor.
  const tall = !cover.mobile && cover.h / cover.w > 0.625;
  const main = (
    <Frame
      shot={cover}
      alt={cover.caption}
      className={`shot-stage__cover${tall ? " is-tall" : ""}`}
      eager={eager}
    />
  );
  return (
    <div className="shot-stage" data-layout={layout} data-inset={inset ? "true" : undefined}>
      {transitionName ? (
        <ViewTransition name={transitionName} share="morph">
          {main}
        </ViewTransition>
      ) : (
        main
      )}
      {inset && <Frame shot={inset} alt={inset.caption} className="shot-stage__inset" eager={eager} />}
    </div>
  );
}
