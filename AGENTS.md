<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenciones del proyecto

Portafolio personal. Next.js 16 App Router, export estático a GitHub Pages.
Estructura en `README.md`.

Estas reglas no prohíben el movimiento ni el color: explican cómo meterlos sin
perder fotogramas, sin romper la hidratación y sin perder el tono profesional.
Cada una salió de un bug o de una decisión ya pagada. Si una te estorba para
algo mejor, cambiala y actualizá su porqué; lo que no vale es romperla en
silencio.

## Dirección

- **El sitio se lee como un documento técnico, no como una demo de efectos.**
  Lo técnico es CONTENIDO (diagramas de arquitectura, métricas, metadatos en
  mono), nunca disfraz (terminal falsa, texto verde sobre negro). El visitante
  principal es un reclutador con 30 segundos: quién, qué hace y la prueba,
  arriba y sin navegación que aprender.
- **Una sola página, una sola forma de leerla**, más una página por proyecto
  (`/[lang]/projects/[id]`). No vuelvas a meter modos de lectura ni "ver más"
  que escondan contenido: lo que está oculto no se lee.
- **Los hechos salen del CV** (`public/Dayle-Garcia-Fernandez-CV-*.pdf`). Si el
  CV cambia, `content/` cambia con él; no inventes cifras ni herramientas.

## Contenido e idioma

- **Nada de texto ni datos en los componentes.** Todo vive en `src/content/`.
- **Lo traducible va en `copy.js` (`es` y `en`); lo demás, en su archivo**
  (`projects.js`, `skills.js`, `experience.js`, `profile.js`…). Se unen en
  `lib/content.js` **por clave** (`id`), nunca por posición.
- **El idioma sale de la URL: `/es/` y `/en/` son HTML distintos.** No lo
  detectes en el cliente ni lo guardes en estado: antes se generaba un único
  HTML en español y se cambiaba tras hidratar, y el visitante en inglés veía el
  español un instante y Google sólo indexaba una versión. Sólo la raíz
  (`app/(root)/page.js`) mira el navegador, para redirigir. Es un segundo
  layout raíz (grupo de rutas) porque el de `[lang]` necesita el idioma para
  `<html lang>`.
- **`lib/locales.js` y `lib/content.js` son módulos neutros** (sin
  `"use client"`): los usan páginas y metadatos en el servidor. Una constante
  importada desde un módulo `"use client"` llega al servidor como referencia
  de cliente, no como valor.
- **Las secciones son componentes de servidor** que reciben `t =
  getContent(lang)`. Sólo hidratan las piezas interactivas (navegación, tema,
  CV, formulario, tarjetas con halo, diagramas), que usan `useContent()`.
  **No pases el objeto `ui` entero a un componente de cliente**: lleva
  funciones y no se puede serializar; pasá las cadenas que use.
- **El tema sigue al navegador.** `data-theme` es el aplicado y
  `data-theme-source` dice si viene del sistema o del visitante; el script
  inline del layout deja los dos listos antes de hidratar.

## Diseño y tokens

- **Colores, espaciado, radios y duraciones salen de `styles/tokens.css`.**
  Tamaños en `rem` (`base.css` sube la raíz por encima de 1440px); alturas de
  contenedor en `dvh`, nunca `vh`.
- **Mona Sans para leer, mono del sistema para metadatos** (fechas, stack,
  protocolos, índices). La mono marca lo que es dato frente a lo que es prosa;
  no la uses para párrafos.
- **La paleta sale de la foto por complemento, no por copia.** La única familia
  con croma real en `public/dayle.jpeg` es la cálida (h≈55); el acento es su
  complemento (h=232). Mismo tono en los dos temas; sólo cambia la L. Frío =
  interfaz; cálido = ambiental (segundo resplandor, paquetes asíncronos). Si
  cambia la foto, recuantizá en OKLCH; no elijas a ojo.
- **`--tech-core/data/cloud` codifican datos**, la capa de cada tecnología. Van
  en texto, bordes, halos y nodos de diagrama, nunca de relleno bajo texto. Se
  aplican con `data-layer` (ver `bento.css`). Contraste ≥8:1 en oscuro, ≥5:1
  en claro.
- **`--accent` para texto y bordes; `--accent-fill` para superficies con texto
  blanco.** El acento del tema oscuro sólo da 3:1 contra blanco.
- **La profundidad la dan un borde de 1px y un cambio de luminosidad**, no
  sombras grandes ni cristal. En claro, nada blanco sobre blanco.
- **El retrato de la columna es un recorte aparte** (`dayle-avatar.jpg`, cara y
  hombros). A 88px, el retrato entero en un cuadrado dejaba la cara diminuta.
  Si cambia la foto, regenerá el recorte (con `sharp`, ya instalado).

## Cristal

- **Sólo la barra móvil lleva `backdrop-filter`**: es lo único que se desplaza
  sobre contenido. Tarjetas y paneles son superficies opacas. Si añadís otro
  cristal: nunca dentro de otro (muestrea la salida ya desenfocada), ningún
  ancestro con `opacity` < 1, `filter`, `mask` o `will-change: opacity` (lo
  convierte en backdrop root y deja de ver el fondo), y el peso sale de
  `--glass-blur` para que `prefers-reduced-transparency` lo apague.
- **No escribas `-webkit-backdrop-filter` ni `-webkit-mask` a mano.** Lightning
  CSS se queda con la versión prefijada y el efecto desaparece del build.

## Movimiento

- **Framer Motion es la única librería de animación**, y los springs salen de
  `lib/motion.js` (`bounce` + `visualDuration`). Sin GSAP, Three.js ni
  react-spring. Nada rebota: no hay gestos con inercia.
- **Sólo `transform` y `opacity` en lo que se anima por fotograma.** La línea
  de la navegación y el subrayado del correo son `scaleX`, no `width` ni
  `background-size`.
- **Las entradas son CSS**, para que funcionen antes de hidratar y sin JS:
  `.enter` (cascada al cargar, `--i` es el orden) y `.reveal` (ligada al scroll
  con `animation-timeline: view()`; sin soporte, el contenido simplemente
  está). No uses `initial={{ opacity: 0 }}` de framer para entradas: el HTML
  sale invisible hasta que hidrata.
- **Movimiento reducido se decide efecto a efecto.** `MotionConfig` va con
  `reducedMotion="never"` y `base.css` sólo quita el scroll suave. Lo pequeño
  (hover, entradas de pocos px, desplegables, latidos) anima siempre; lo que
  se mueve en bucle y explica algo (los paquetes de los diagramas) va más
  lento. Peor caso: "suave", nunca "quieto".
- **Nada grande se mueve.** El fondo es estático: cuadrícula y resplandores
  pintados una vez. Lo único que se mueve es la zona de la cuadrícula bajo el
  cursor, un círculo desplazado por `transform` con su cuadrícula interior
  desplazada al revés (ver `Backdrop.jsx`). Los halos de las tarjetas, igual.
  Un degradado que se reconstruye por fotograma o una capa grande en bucle,
  no.
- **Lo perpetuo, sólo si es pequeño**: los latidos (`.live-dot`, el nodo del
  puesto actual) y los paquetes SMIL de los diagramas, que además se pausan
  fuera de pantalla. El pulso del CV suena tres veces y se calla.
- **No ramifiques el árbol renderizado según `useReducedMotion()` o una media
  query**, ni cambies atributos por ellos en el render: descuadra la
  hidratación. Misma estructura siempre; el ajuste va en un efecto.
- **Puntero y scroll con motion values**, no `useState` en `pointermove`. Nada
  de `setState` en el montaje: `useSyncExternalStore`.
- **El scroll-spy marca la sección que cruza una línea al 40% de la altura**,
  no la de mayor proporción visible: una sección más alta que la pantalla
  nunca tiene proporción alta y la navegación se quedaba una por detrás. Los
  ids deben ser estables (constante de módulo).

## Layout y CSS

- **Un solo punto de corte de VENTANA: 1024px** (`lib/breakpoints.js`). Por
  debajo, una columna y la barra móvil; por encima, la columna fija. Lo que
  depende del ancho de un PANEL usa `@container` (ver `bento.css`).
- **Un `@media` que sobrescribe una regla va DESPUÉS de ella.** Con la misma
  especificidad gana la última: la barra móvil salió visible en escritorio y
  los botones de tema duplicados en móvil por tener el `@media` delante. Cada
  módulo lleva sus `@media` junto a lo que ajustan.
- **La columna fija tiene que caber entera** a 1366×768, con el CV a la vista.
  Si le añadís algo, compensalo en el bloque `max-height: 900px` de
  `shell.css`.
- **Columnas explícitas si hay tarjetas de dos tramos.** `auto-fit` no colapsa
  pistas vacías cuando un hijo cruza varias.
- **Los diagramas no se encogen hasta ser ilegibles**: en pantalla estrecha se
  desplazan de lado dentro de su marco (`min-width` del SVG).
- **Enlace estirado para tarjetas enlazables**: el `<a>` es el título y su
  `::after` cubre la tarjeta. Nada de enlaces anidados; lo que tenga que ser
  pulsable aparte va por encima con su propio `z-index`.
- **El hover enciende, no revela.** Todo se ve sin hover; los estilos de hover
  van bajo `(hover: hover) and (pointer: fine)` o se quedan pegados tras un
  toque.
- **Los desplegables son `grid-template-rows: 0fr → 1fr`**, sin medir alturas,
  con `inert` en el cuerpo cerrado y el aire en márgenes de los hijos.

## Dependencias

- **Sin CDNs externos.** El sitio es estático y funciona offline; assets en
  `public/`. Los iconos que faltan se generan como SVG local desde
  `react-icons/si`.

## Antes de dar algo por terminado

```bash
npm run lint
npm run build
```

`next export` no existe en Next 16: `output: 'export'` hace que `next build`
genere `out/`. Con `trailingSlash` cada ruta sale como `ruta/index.html`.
