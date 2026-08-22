"use client";

/** Botón con reflejo especular — estilo de los controles de macOS. */
export default function SpecularButton({
  children,
  size = "md",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`specular-button specular-button--${size} ${className}`}
      {...props}
    >
      <span className="specular-button__label">{children}</span>
    </button>
  );
}
