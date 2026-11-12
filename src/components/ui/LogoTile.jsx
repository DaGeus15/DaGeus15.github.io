import Image from "next/image";

/**
 * Logo en una pastilla clara, igual en los dos temas (los logos son de
 * color y sobre el marino se perdían). Decorativo: el nombre ya está escrito
 * al lado, así que `alt` vacío. Sin logo, el icono que se le pase, en la
 * misma pastilla de cristal imitado que los iconos del stack.
 */
export default function LogoTile({ src, icon: Icon, size = "md" }) {
  if (src) {
    return (
      <span className="logo-tile" data-size={size}>
        <Image src={src} alt="" width={88} height={88} className="logo-tile__img" />
      </span>
    );
  }
  return (
    <span className="logo-tile logo-tile--icon" data-size={size} aria-hidden="true">
      {Icon && <Icon />}
    </span>
  );
}
