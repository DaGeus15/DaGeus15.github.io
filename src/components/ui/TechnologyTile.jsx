/** Logo monocromo en el bisel que comparten Stack y los casos. */
export default function TechnologyTile({ icon }) {
  if (!icon) return null;

  return (
    <span className="technology-tile" aria-hidden="true">
      <span className="technology-tile__icon" style={{ maskImage: `url("${icon}")` }} />
    </span>
  );
}
