# Portafolio · Daylé García Fernández

Portafolio personal construido con **Next.js 16** (App Router) y exportado como
sitio estático a GitHub Pages. Una sola página que se lee como un documento
técnico: columna fija con quién soy y cómo contactarme, proyectos con su
diagrama de arquitectura, experiencia, stack y contacto. Cada proyecto tiene
además su propia página de caso de estudio. En español y en inglés.

**En vivo:** https://dageus15.github.io

---

## Comandos

```bash
npm run dev          # servidor de desarrollo
npm run build        # genera el sitio estático en out/
npm run preview:out  # sirve out/ para revisar el build real
npm run lint         # ESLint
npm run deploy       # build + publica en la rama gh-pages
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
| Proyectos: año, cifras, repo, stack y diagrama    | `content/projects.js`    |
| Grupos del stack, iconos y herramientas           | `content/skills.js`      |
| GitHub, LinkedIn y clave del formulario           | `content/social.js`      |
| Orden de las secciones                            | `content/navigation.js`  |

En los textos podés usar `**negrita**`; lo renderiza `lib/RichText.jsx`.

### Añadir un proyecto

1. Agregá su entrada en `content/projects.js` con un `id` nuevo. Con
   `featured: true` sale grande y con diagrama; sin él, en "Otros proyectos".
2. Agregá sus textos en `content/copy.js`, en `projects[id]`, en los dos idiomas.
3. Su página de caso de estudio se genera sola.

### Editar un diagrama de arquitectura

En `projects.js`, `diagram.nodes` son cajas con su centro (`x`, `y`) en unidades
del `viewBox` y `diagram.edges` las conexiones (`async: true` las dibuja
discontinuas). Las trazas se calculan solas. Los nombres de los nodos que se
traducen van en `copy.js`, en `projects[id].nodes`.

---

## Cómo cambiar el aspecto visual

El sistema de diseño está en **`src/styles/tokens.css`**: colores de cada tema,
tipografía, espaciado, radios, duraciones y el fondo. Los springs, en
**`src/lib/motion.js`**. Las reglas y su porqué, en `AGENTS.md`.

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
│   ├── backgrounds/       Backdrop (cuadrícula que se enciende bajo el cursor)
│   ├── layout/            Intro (columna fija), SideNav, MobileBar, Footer
│   ├── sections/          Projects, Experience, Stack, About, Contact
│   ├── project/           ProjectCard, ArchitectureDiagram, métricas y metadatos
│   ├── bento/             BentoTile (tarjeta con halo en el filo)
│   └── ui/                CvDownload, ThemeToggle, Timeline, ContactForm…
└── styles/
    ├── tokens.css         ← DISEÑO
    ├── base.css           Reset, tipografía, entradas, accesibilidad
    ├── shell.css          Fondo, columna fija, navegación, barra móvil, caso
    ├── content.css        Secciones, proyectos, experiencia, contacto
    ├── bento.css          Tarjetas, etiquetas y color de capa
    └── diagram.css        Diagramas de arquitectura
```

---

## Notas técnicas

- **Punto de corte único de ventana: 1024px** (`lib/breakpoints.js`). Lo que
  depende del ancho de un panel usa `@container`.
- **Alturas con `dvh`**, no `vh`, y `env(safe-area-inset-*)` en la barra móvil.
- **Sin CDNs externos**: fuente, iconos y CV viven en `public/`.
- **SEO**: `hreflang` entre idiomas, `canonical` por página y datos
  estructurados `Person` en la principal.

## Despliegue

`.github/workflows/deploy.yml` compila y publica en la rama `gh-pages` en cada
push a `main`. También se puede publicar a mano con `npm run deploy`.

El flag `--dotfiles` es obligatorio: sin él, `gh-pages` no sube `.nojekyll` y
GitHub ignoraría la carpeta `_next/`.
