# Portafolio — Dayle Garcia

Portafolio personal construido con **Next.js 16** (App Router) y exportado como
sitio estático a GitHub Pages. Estética macOS: liquid glass, micro-animaciones
suaves y dos modos de lectura (resumido / detallado).

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

> `next export` ya no existe (se eliminó en Next 14). `output: 'export'` en
> `next.config.mjs` hace que `next build` genere `out/` directamente.

---

## Cómo actualizar el contenido

**No hace falta tocar componentes.** Todo el texto vive en `src/content/`:

| Quiero cambiar…                        | Editar                      |
| -------------------------------------- | --------------------------- |
| Nombre, foto, bio, CV, ubicación       | `content/profile.js`        |
| Puestos de trabajo (timeline)          | `content/experience.js`     |
| Proyectos, stack y capturas            | `content/projects.js`       |
| Tecnologías del grid                   | `content/skills.js`         |
| Idiomas y certificaciones              | `content/education.js`      |
| Hardware y hobbies                     | `content/setup.js`          |
| Redes sociales y clave del formulario  | `content/social.js`         |
| Secciones y orden del menú             | `content/navigation.js`     |

En los textos podés usar `**negrita**` — lo renderiza `lib/RichText.jsx`.

### Añadir una captura a un proyecto

1. Poné la imagen en `public/assets/images/projects/`.
2. En `content/projects.js`, cambiá `image: null` por `image: "/assets/images/projects/tu-captura.png"`.

Sin captura se muestra un placeholder punteado.

### Añadir una sección nueva

1. Creá el componente en `src/components/sections/`.
2. Registralo en `SECTION_COMPONENTS` de `components/layout/ContentArea.jsx`.
3. Agregá su entrada en `content/navigation.js`.

---

## Cómo cambiar el aspecto visual

Todo el sistema de diseño está en **`src/styles/tokens.css`**: colores de cada
tema, blur del cristal, escala de espaciado, radios, duraciones y el ancho del
marco del modo detallado. Cambiá un token y se propaga a todo el sitio.

Las animaciones se ajustan desde **`src/lib/motion.js`** (springs y variantes
compartidas). Subir o bajar la "velocidad" del sitio es un solo archivo.

---

## Estructura

```
src/
├── app/
│   ├── layout.js          Fuente, metadata, viewport, ThemeProvider, anti-FOUC
│   ├── page.js            Estado de la vista y composición general
│   └── globals.css        Sólo importa los módulos de styles/
├── content/               ← TEXTO Y DATOS (editá aquí)
├── lib/
│   ├── theme.jsx          Contexto de tema + script anti-FOUC
│   ├── motion.js          Presets de animación compartidos
│   ├── breakpoints.js     Punto de corte único (1024px)
│   ├── useScrollSpy.js    Sección activa según el scroll
│   ├── useMediaQuery.js   Media queries sin renders en cascada
│   └── RichText.jsx       Renderiza **negrita** en los textos de content/
├── components/
│   ├── backgrounds/       Aurora, Spotlight
│   ├── layout/            Sidebar, MobileNav, ContentArea, SectionNav, ProfileCard
│   ├── sections/          About, Experience, Projects, Contact + Section (wrapper)
│   └── ui/                GlassCard, Dock, Magnetic, SplitText, ThemeToggle…
└── styles/
    ├── tokens.css         ← DISEÑO (colores, espaciado, blur, radios)
    ├── base.css           Reset, tipografía, accesibilidad
    ├── layout.css         Estructura y modo detallado
    ├── cards.css          Cristal, dock, perfil
    ├── sections.css       Contenido interno de las secciones
    ├── forms.css          Formulario, botones, redes
    └── mobile.css         Responsive (<1024px)
```

---

## Notas técnicas

- **Punto de corte único: 1024px.** Está en `lib/breakpoints.js` y en el media
  query de `mobile.css`. Si cambiás uno, cambiá el otro.
- **Alturas con `100dvh`**, no `100vh`. Con `vh` la barra dinámica de Safari iOS
  y Chrome Android recorta el contenido inferior y lo deja inalcanzable.
- **Safe areas**: el layout móvil usa `env(safe-area-inset-*)` y el `viewport`
  declara `viewportFit: "cover"`.
- **Sin CDNs externos**: los iconos de tecnologías viven en
  `public/assets/images/skills/`.
- **El cristal es CSS puro** (`backdrop-filter: blur() saturate(180%)`), sin
  filtros SVG de desplazamiento.

## Despliegue

`.github/workflows/deploy.yml` compila y publica en la rama `gh-pages` en cada
push a `main`. También se puede publicar a mano con `npm run deploy`.

El flag `--dotfiles` es obligatorio: sin él, `gh-pages` no sube `.nojekyll` y
GitHub ignoraría la carpeta `_next/`.
