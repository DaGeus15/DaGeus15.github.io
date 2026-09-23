"use client";

import { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import RichText from "@/lib/RichText";

/**
 * Línea de tiempo de experiencia con nodos desplegables.
 *
 * El despliegue es CSS puro: el cuerpo es una rejilla que pasa de
 * `grid-template-rows: 0fr` a `1fr`, sin medir alturas en JS, interrumpible y
 * sin tocar el layout de alrededor. El cuerpo cerrado lleva `inert` para que
 * su contenido no sea alcanzable con Tab ni con lector de pantalla.
 *
 * El puesto actual arranca abierto; se pueden abrir varios a la vez.
 *
 * `labels` son sólo las cadenas que usa (no el objeto `ui` entero, que lleva
 * funciones y no puede cruzar a un componente de cliente).
 */
function TimelineNode({ role, open, onToggle, labels }) {
  const bodyId = useId();

  return (
    <li className="tl-node" data-open={open} data-current={role.current || undefined}>
      <span className="tl-node__dot" aria-hidden="true" />
      <h3 className="tl-node__heading">
        <button
          type="button"
          className="tl-node__head"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <span className="tl-node__titles">
            <span className="role-title">{role.role}</span>
            <span className="role-company">
              {role.company} · {role.location}
            </span>
          </span>
          {role.current && <span className="tl-node__badge">{labels.currentRole}</span>}
          <span className="role-date mono">{role.date}</span>
          <FiChevronDown className="tl-node__chevron" aria-hidden="true" />
        </button>
      </h3>

      <div className="tl-node__body" id={bodyId} inert={!open}>
        <div className="tl-node__inner">
          <ul className="role-bullets">
            {role.bullets.map((bullet) => (
              <li key={bullet}>
                <RichText>{bullet}</RichText>
              </li>
            ))}
          </ul>
          {role.stack?.length > 0 && (
            <ul className="tag-list" aria-label={labels.roleStack}>
              {role.stack.map((tech) => (
                <li className="tag" data-layer={tech.layer} key={tech.name}>
                  {tech.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

export default function Timeline({ experience, labels }) {
  const [openIds, setOpenIds] = useState(
    () => new Set(experience.filter((r) => r.current).map((r) => r.id)),
  );

  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ol className="timeline">
      {experience.map((role) => (
        <TimelineNode
          key={role.id}
          role={role}
          labels={labels}
          open={openIds.has(role.id)}
          onToggle={() => toggle(role.id)}
        />
      ))}
    </ol>
  );
}
