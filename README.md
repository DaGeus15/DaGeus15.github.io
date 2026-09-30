# Portafolio · Daylé García Fernández

Portafolio personal construido con **Next.js 16** (App Router) y exportado como
sitio estático a GitHub Pages. Una sola página: portada dividida con una pila
3D (OGL), trabajo seleccionado en tarjetas con capturas reales, experiencia,
stack, sobre mí y contacto. Cada proyecto tiene su caso de estudio con
arquitectura, funcionalidades, un reto concreto y galería. En español y en
inglés, con tema oscuro y claro.

**En vivo:** https://dageus15.github.io

---

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # genera el sitio estático en out/
npm run preview:out  # sirve out/ para revisar el build real
npm run lint         # ESLint
npm run deploy       # build + publica en la rama gh-pages
npm run shots        # regenera las capturas de los proyectos (ver abajo)
npm run og           # regenera la imagen de vista previa (og.png)
npm run icons        # regenera el favicon y el icono de Apple
```

> `next export` ya no existe. `output: 'export'` en `next.config.mjs` hace que
> `next build` genere `out/` directamente.

---

## Rutas

| Ruta                          | Qué es                                                  |
| ----------------------------- | ------------------------------------------------------- |
| `/`                           | Redirige a `/es/` o `/en/` según el idioma del navegador |
| `/es/`, `/en/`                | La página principal, un HTML por idioma                  |
| `/es/projects/kaphiy/` …      | Caso de estudio de cada proyecto, en cada idioma         |

---

## Cómo actualizar el contenido

**No hace falta tocar componentes.** Todo vive en `src/content/`, y los hechos
salen del CV (`public/Dayle-Garcia-Fernandez-CV-*.pdf`): si cambia el CV,
actualizá estos archivos con él.

| Quiero cambiar…                                   | Editar                   |
| ------------------------------------------------- | ------------------------ |
| Cualquier texto, en español e inglés              | `content/copy.js`        |
| Nombre, correo, foto, CV                          | `content/profile.js`     |
| Empresa y stack de cada puesto                    | `content/experience.js`  |
| Proyectos: año, cifras, repo, stack, capturas y diagrama | `content/projects.js` |
| Grupos del stack, iconos y herramientas           | `content/skills.js`      |
| GitHub, LinkedIn y clave del formulario           | `content/social.js`      |
| Orden de las secciones                            | `content/navigation.js`  |
| Capas de la pila 3D y a qué grupo del stack llevan | `content/hero.js`       |

En los textos podés usar `**negrita**` y `` `código` ``; lo renderiza
`lib/RichText.jsx`.

### Añadir un proyecto

1. Agregá su entrada en `content/projects.js` con un `id` nuevo: año, cifras,
   stack, repo, `cover`/`inset`/`gallery` (capturas) y, si querés, `diagram`.
   El orden de la lista es el de la portada (el primero sale a todo el ancho).
2. Agregá sus textos en `content/copy.js`, en `projects[id]`, en los dos
   idiomas: título, línea, resumen, descripción, funcionalidades, reto, rol,
   etiquetas de las cifras y el pie de cada captura (`shots`).
3. Su página de caso de estudio se genera sola.

### Capturas de los proyectos

Viven en `public/assets/projects/<id>/` en WebP. Se generan desde los informes
de cada proyecto con `npm run shots` (`scripts/projects/build-shots.mjs`), que
recorta la barra del navegador, difumina correos y nombres de terceros, tapa
las caras de la cámara (opción `face`), hace recortes de portada (`crop`) y
convierte a WebP. La carpeta de origen se define en
`scripts/projects/source-map.mjs`, que es local y no se sube:

```js
export const SOURCE_ROOT = "C:/ruta/a/las/imagenes/extraidas";
```

### Editar un diagrama de arquitectura

En `projects.js`, `diagram.nodes` son cajas con su centro (`x`, `y`) en unidades
del `viewBox` y `diagram.edges` las conexiones (`async: true` las dibuja
discontinuas). Las trazas se calculan solas. Los nombres de los nodos que se
traducen van en `copy.js`, en `projects[id].nodes`.

---

## Cómo cambiar el aspecto visual

El sistema de diseño está en **`src/styles/tokens.css`**: la paleta marino +
latón de cada tema (sacada de la foto), la luz, el grano, tipografía, espaciado, radios, duraciones
y los colores de la pila 3D. Los springs, en **`src/lib/motion.js`**. Las
reglas y su porqué, en `AGENTS.md`.

---

## Estructura

```
src/
├── app/
│   ├── (root)/            `/`: redirección según el navegador
│   ├── [lang]/            Layout (html lang, metadatos, tema) y página principal
│   │   └── projects/[id]/ Caso de estudio
│   └── globals.css        Sólo importa los módulos de styles/
├── content/               ← TEXTO Y DATOS (editá aquí)
├── lib/
│   ├── locales.js         Idiomas y rutas (neutro: servidor y cliente)
│   ├── content.js         Une copy.js con los datos, por clave
│   ├── useContent.js      Lo mismo para componentes de cliente
│   ├── i18n.jsx           Contexto con el idioma de la ruta
│   ├── theme.jsx          Tema + script anti-flash
│   ├── motion.js          Springs compartidos
│   ├── useScrollSpy.js    Sección activa de la navegación
│   ├── jsonLd.js          Datos estructurados (schema.org Person)
│   └── RichText.jsx       **negrita** en los textos
├── components/
│   ├── hero/              Hero, SystemStack (pila 3D: SVG + escena OGL)
│   ├── layout/            SiteNav (píldora), LangSwitch, Footer
│   ├── sections/          Projects, Experience, Stack, About, Contact
│   ├── project/           WorkCard, Frame, ShotStage, Gallery, ArchitectureDiagram, Metrics
│   └── ui/                CvDownload, ThemeToggle, CopyEmail, ContactForm
└── styles/
    ├── tokens.css         ← DISEÑO
    ├── base.css           Reset, tipografía, botones, entradas, superficies del navegador
    ├── nav.css            Píldora de navegación, menú del CV y pie
    ├── home.css           Portada, pila 3D, secciones, tarjetas de trabajo, marcos
    ├── case.css           Caso de estudio, galería y visor
    └── diagram.css        Diagramas de arquitectura
```

---

## Notas técnicas

- **Punto de corte único de ventana: 1024px** (`lib/breakpoints.js`). Lo que
  depende del ancho de una tarjeta usa `@container`.
- **Alturas con `dvh`**, no `vh`, y `env(safe-area-inset-*)` en la píldora
  de móvil.
- **3D ligero**: OGL (~15 KB comprimidos) en un fragmento aparte que se carga
  después de la primera pintura; pinta sólo cuando algo se mueve y nunca
  fuera de pantalla. Sin WebGL se queda el SVG equivalente.
- **Sin CDNs externos**: fuente, iconos, capturas y CV viven en `public/`.
- **SEO**: `hreflang` entre idiomas, `canonical` por página y datos
  estructurados `Person` en la principal.

## Despliegue

`.github/workflows/deploy.yml` compila y publica en la rama `gh-pages` en cada
push a `main`. También se puede publicar a mano con `npm run deploy`.

El flag `--dotfiles` es obligatorio: sin él, `gh-pages` no sube `.nojekyll` y
GitHub ignoraría la carpeta `_next/`.
