"use client";

import Image from "next/image";
import { FiMenu, FiX, FiSun, FiMoon, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import sections from "@/content/navigation";
import profile from "@/content/profile";
import navIcons from "./icons";
import { useTheme } from "@/lib/theme";

/** Cabecera fija de móvil: avatar, nombre y botón de menú. */
export function MobileHeader({ isMenuOpen, onToggleMenu }) {
  return (
    <header className="mobile-header">
      <Image
        src={profile.avatar}
        alt=""
        width={38}
        height={38}
        className="mobile-header__avatar"
        aria-hidden="true"
        priority
      />
      <div className="mobile-header__info">
        <span className="mobile-header__name">{profile.name}</span>
        <span className="mobile-header__role">{profile.role}</span>
      </div>
      <button
        className="mobile-header__menu"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-drawer"
      >
        {isMenuOpen ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
      </button>
    </header>
  );
}

/** Contenido del cajón lateral de móvil. */
export function MobileDrawer({ activeSection, onNavigate, isExpanded, onToggleExpand }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="mobile-drawer">
      <nav className="mobile-drawer__nav" aria-label="Navegación principal">
        {sections.map((section) => {
          const Icon = navIcons[section.icon];
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              className={`mobile-drawer__item ${isActive ? "is-active" : ""}`}
              onClick={() => onNavigate(section.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="mobile-drawer__icon">
                <Icon size={19} aria-hidden="true" />
              </span>
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="mobile-drawer__actions">
        <button className="mobile-drawer__action" onClick={toggleTheme}>
          <span className="mobile-drawer__icon">
            {isDark ? <FiSun size={17} aria-hidden="true" /> : <FiMoon size={17} aria-hidden="true" />}
          </span>
          {isDark ? "Modo Claro" : "Modo Oscuro"}
        </button>
        <button className="mobile-drawer__action" onClick={onToggleExpand}>
          <span className="mobile-drawer__icon">
            {isExpanded ? <FiMinimize2 size={17} aria-hidden="true" /> : <FiMaximize2 size={17} aria-hidden="true" />}
          </span>
          {isExpanded ? "Vista Resumida" : "Vista Detallada"}
        </button>
      </div>
    </div>
  );
}
