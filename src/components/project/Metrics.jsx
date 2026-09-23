/** Cifras de un proyecto: el valor grande y en mono, la etiqueta debajo. */
export default function Metrics({ metrics, large = false }) {
  if (!metrics?.length) return null;

  return (
    <dl className={`metrics ${large ? "metrics--lg" : ""}`}>
      {metrics.map((m) => (
        <div className="metric" key={m.key}>
          <dt className="metric__label">{m.label}</dt>
          <dd className="metric__value">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
