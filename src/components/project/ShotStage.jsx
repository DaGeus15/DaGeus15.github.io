import Frame from "./Frame";

/**
 * Composición de capturas de la cabecera de un caso: dos teléfonos lado a
 * lado si la principal es de móvil, o la ventana con el teléfono encima.
 * La misma composición que la tarjeta de la portada, sin la inclinación.
 */
export default function ShotStage({ cover, inset, eager = false }) {
  const layout = cover.mobile ? "phones" : "window";
  return (
    <div className="shot-stage" data-layout={layout} data-inset={inset ? "true" : undefined}>
      <Frame shot={cover} alt={cover.caption} className="shot-stage__cover" eager={eager} />
      {inset && <Frame shot={inset} alt={inset.caption} className="shot-stage__inset" eager={eager} />}
    </div>
  );
}
