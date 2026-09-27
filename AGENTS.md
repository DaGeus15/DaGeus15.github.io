# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
# Convenciones del proyecto

Portafolio personal. Next.js 16 App Router, export estático a GitHub Pages.
Estructura en `README.md`.

Estas reglas no prohíben el movimiento ni el color: explican cómo meterlos sin
perder fotogramas, sin romper la hidratación y sin perder el tono profesional.
Cada una salió de un bug o de una decisión ya pagada. Si una te estorba para
algo mejor, cambiala y actualizá su porqué; lo que no vale es romperla en
silencio.

## Dirección

- **Producto mate y preciso, no demo de efectos.** Lo técnico es CONTENIDO
  (diagramas de arquitectura, capturas reales, cifras, metadatos en mono),
  nunca disfraz (terminal falsa, texto verde sobre negro). El visitante
  principal es un reclutador con 30 segundos: quién, qué hace y la prueba,
  arriba y sin navegación que aprender.
- **La portada resume; el caso de estudio lo cuenta todo.** Cada proyecto sale
  en la portada con título, una línea, dos cifras y sus capturas; el stack, la
  arquitectura, las funcionalidades, el reto, la galería y el rol viven en
  `/[lang]/projects/[id]`. No repitas en la portada lo que ya está a un clic,
  y no quites del caso nada de lo que se sabe del proyecto.
- **Una sola página, una sola forma de leerla**, más una página por proyecto.
  Nada de modos de lectura ni "ver más" que escondan contenido: lo que está
  oculto no se lee.
- **Los hechos salen del CV** (`public/Dayle-Garcia-Fernandez-CV-*.pdf`) **y
  de los informes de cada proyecto.** No inventes cifras ni herramientas. Si
  algo del informe es un objetivo y no un resultado medido, no va como cifra.
- **Sólo lo que hice yo.** En la Junta de Agua de Miñarica el sistema lo hizo
  un equipo y lo mío es el **módulo contable**: título, capturas, diagrama y
  cifras son de ese módulo; la facturación SRI y el resto salen sólo como
  contexto (`scope` en `copy.js`). Lo mismo para cualquier proyecto de equipo.

## Contenido e idioma

- **Nada de texto ni datos en los componentes.** Todo vive en `src/content/`.
- **Lo traducible va en `copy.js` (`es` y `en`); lo demás, en su archivo**
  (`projects.js`, `skills.js`, `experience.js`, `profile.js`…). Se unen en
  `lib/content.js` **por clave** (`id`), nunca por posición. Los pies de las
  capturas van en `copy.js` (`shots[id]`) y sirven también de `alt`.
- **El idioma sale de la URL: `/es/` y `/en/` son HTML distintos.** No lo
  detectes en el cliente ni lo guardes en estado: antes se generaba un único
  HTML en español y se cambiaba tras hidratar, y el visitante en inglés veía el
  español un instante y Google sólo indexaba una versión. Sólo la raíz
  (`app/(root)/page.js`) mira el navegador, para redirigir. Es un segundo
  layout raíz (grupo de rutas) porque el de `[lang]` necesita el idioma para
  `<html lang>`, y lleva los metadatos Open Graph completos: LinkedIn no
  ejecuta JavaScript y lee esa página tal cual.
- **`lib/locales.js` y `lib/content.js` son módulos neutros** (sin
  `"use client"`): los usan páginas y metadatos en el servidor. Una constante
  importada desde un módulo `"use client"` llega al servidor como referencia
  de cliente, no como valor.
- **Las secciones son componentes de servidor** que reciben `t =
  getContent(lang)`. Sólo hidratan las piezas interactivas (píldora, tema, CV,
  pila 3D, tarjetas de proyecto, galería, formulario). **No pases el objeto
  `ui` entero a un componente de cliente**: lleva funciones (`teamOf`,
  `openShot`…) y no se puede serializar; pasá las cadenas ya resueltas.
- **El tema sigue al navegador.** `data-theme` es el aplicado y
  `data-theme-source` dice si viene del sistema o del visitante; el script
  inline del layout deja los dos listos antes de hidratar.

## Capturas

- **Salen de los informes de cada proyecto con `scripts/projects/`.**
  `build-shots.mjs` recorta, difumina y convierte a WebP (web ≤1600px de
  ancho, móvil ≤1400px de alto, calidad 82). La ruta a los informes está en
  `source-map.mjs`, que NO se sube (es local y apunta a documentos con datos
  de terceros).
- **Nada de datos personales en una captura**: correos y nombres de
  compañeros o clientes se difuminan (`blur`), la barra del navegador se
  recorta (`cropTop`) y lo que no se puede limpiar (fotos con personas,
  listas de clientes reales, contenido de prueba impresentable) no entra.
  Mirá cada captura a tamaño real antes de añadirla.
- **`w`/`h` en `projects.js` son los píxeles reales del archivo**: reservan
  el hueco antes de que cargue (sin saltos de maquetación). Si regenerás una
  captura, actualizalos.

## Diseño y tokens

- **Colores, espaciado, radios y duraciones salen de `styles/tokens.css`.**
  Tamaños en `rem` (`base.css` sube la raíz por encima de 1440px); alturas de
  contenedor en `dvh`, nunca `vh`.
- **Paleta: marino + latón, sacada de la foto por medición.** Cuantizando
  `public/dayle.jpeg` en OKLCH, las únicas familias con croma real son el
  marino de la blusa (h≈245) y el cálido de la pared y el pantalón (h≈65):
  el marino muy oscuro es el fondo y el cálido, subido de croma, el acento
  (latón). En claro, papel cálido (la pared) con tinta marina. UN solo
  acento, para lo accionable y lo propio: enlaces, foco, CTA, el nodo que
  hice yo en un diagrama, la losa de la API. Nada de colores por capa. Evitá
  el naranja arcilla: es el color de las herramientas de IA y el sitio se leía
  "hecho por IA". Si cambia la foto, recuantizá; no elijas a ojo.
- **`--accent` para texto y bordes; `--accent-fill` + `--on-accent` para
  rellenos.** En oscuro el relleno es latón con texto marino; en claro el
  relleno es marino con texto de papel y el acento de texto, un bronce (5.5:1).
- **Mate = grano + luz cenital, no plano.** Una capa fija de ruido
  (`body::after`), un resplandor arriba de la página, y en las superficies
  grandes un degradado vertical, un filo de luz de 1px arriba y una sombra
  larga (todo en `styles/light.css`, que va al final). Un negro plano con
  superficies planas se leía "muy negro", sin cuerpo. Nada de esto se anima;
  nada de cuadrículas ni resplandores de colores.
- **Tarjetas con capturas oscuras se invierten** (`tone: "dark"` en
  `projects.js`) y redefinen sus tokens dentro, para que el texto pase AA en
  los dos temas y la ventana no flote sobre un blanco.
- **Mona Sans para leer y titular (expandida en los titulares:
  `--display-stretch`, `--title-stretch`), mono del sistema para datos**
  (fechas, cifras, stack, nombres de código). No uses la mono para párrafos
  ni rótulos.
- **Sin rótulos encima de los títulos ni índices numerados.** El título se
  sostiene solo.
- **Superficies del navegador con la paleta**: selección, foco, cursor de
  texto y barras de desplazamiento están en `base.css`.
- **La profundidad la dan la luz de arriba, un borde de 1px y sombras largas
  con desplazamiento**; nunca un halo de color sin desplazamiento.

## Cristal

- **Sólo la píldora de navegación lleva `backdrop-filter`**: es lo único que
  se desplaza sobre contenido. Tarjetas, paneles y el fondo del visor son
  opacos. Si añadís otro cristal: nunca dentro de otro (muestrea la salida ya
  desenfocada), ningún ancestro con `opacity` < 1, `filter`, `mask` o
  `will-change: opacity` (lo convierte en backdrop root y deja de ver el
  fondo), y el peso sale de `--glass-blur` para que
  `prefers-reduced-transparency` lo apague.
- **No escribas `-webkit-backdrop-filter` ni `-webkit-mask` a mano.** Lightning
  CSS se queda con la versión prefijada y el efecto desaparece del build.

## Movimiento

- **Framer Motion para la interfaz** (springs de `lib/motion.js`, con
  `bounce` + `visualDuration`) **y OGL sólo para la pila 3D de la portada.**
  Sin GSAP, Three.js ni react-spring: Three.js pesaba ~130 KB comprimidos
  para cuatro cajas; OGL, ~15 KB. Nada rebota: no hay gestos con inercia.
- **Un solo momento de autor**: las losas de la portada caen y se apilan al
  cargar. El resto del movimiento es respuesta (hover, puntero, scroll), no
  decoración.
- **Sólo `transform` y `opacity` en lo que se anima por fotograma.** El
  indicador de la píldora es `layoutId` (transform), el subrayado del correo
  es `scaleX`, la inclinación de las tarjetas es `rotateX/Y`.
- **Las entradas son CSS**, para que funcionen antes de hidratar y sin JS:
  `.enter` (cascada al cargar, `--i` es el orden) y `.reveal` (ligada al scroll
  con `animation-timeline: view()`; sin soporte, el contenido simplemente
  está). No uses `initial={{ opacity: 0 }}` de framer para entradas: el HTML
  sale invisible hasta que hidrata.
- **Movimiento reducido se decide efecto a efecto.** `MotionConfig` va con
  `reducedMotion="never"` y `base.css` sólo quita el scroll suave. Lo pequeño
  (hover, entradas de pocos px, desplegables) anima siempre; lo que se mueve
  más (la caída de las losas, el giro de la pila, los paquetes de los
  diagramas) hace el mismo gesto en corto o más lento. Peor caso: "suave",
  nunca "quieto".
- **Nada perpetuo salvo lo pequeño**: los paquetes SMIL de los diagramas, que
  además se pausan fuera de pantalla. Sin latidos ni pulsos.
- **No ramifiques el árbol renderizado según `useReducedMotion()` o una media
  query**, ni cambies atributos por ellos en el render: descuadra la
  hidratación. Misma estructura siempre; el ajuste va en un efecto o en CSS.
- **Puntero y scroll con motion values**, no `useState` en `pointermove`; el
  rectángulo se mide al entrar, no en cada movimiento. Nada de `setState` en
  el montaje: `useSyncExternalStore`.
- **El scroll-spy marca la sección que cruza una línea al 40% de la altura**,
  no la de mayor proporción visible: una sección más alta que la pantalla
  nunca tiene proporción alta y la navegación se quedaba una por detrás. La
  portada (`#top`) también se observa, para que al volver arriba no quede
  nada marcado. Los ids deben ser estables (constante de módulo).

## 3D (pila de la portada)

- **El SVG es el primer pintado y el respaldo; OGL sólo añade interacción.**
  `SystemStack.jsx` pinta la pila en SVG isométrico desde el build (con la
  entrada en CSS); `stackScene.js` se importa dinámicamente después de esa
  entrada y del primer inactivo, y sustituye al SVG en la MISMA pose.
- **Las dos capas comparten geometría** (`stackGeometry.js`): la cámara de la
  escena es ortográfica e isométrica, así que el SVG puede calcular la misma
  proyección y el relevo es un fundido invisible. Si tocás tamaños o
  posiciones, tocálos ahí y en ningún otro sitio.
- **Pinta bajo demanda**: el bucle sólo corre mientras algo se acerca a su
  objetivo (puntero, scroll, tema) y se para al llegar; fuera de pantalla no
  pinta. DPR ≤2 con ratón y ≤1.5 en táctil. Sin WebGL 2 no monta y se queda
  el SVG.
- **Los colores de la escena salen de los tokens** (`--stack-*`, en
  hexadecimal) y se releen al cambiar `data-theme`.
- **Las etiquetas son HTML**, no texto en textura: nítidas, con la fuente
  real. El CSS las deja en la esquina de su losa en reposo (`--x`/`--y`); la
  escena las mueve con `transform` y el centrado va en `translate`, para no
  pisarse.
- **La pila es un índice del stack.** Cada etiqueta es un enlace a su grupo
  (`#stack-<grupo>`, mapeo en `content/hero.js`) y la fila de destino se marca
  con `:target`. El hover tiene UNA fuente (`hover()` en `SystemStack.jsx`):
  la disparan la etiqueta (puntero y foco) y la losa (el rayo de la escena, o
  el polígono del SVG si no hay escena); pone `data-active` y avisa a la
  escena, que levanta la losa. Un clic en la losa sigue el enlace de su
  etiqueta. El lienzo no recibe eventos: los atiende el contenedor.
- **Contexto perdido = SVG.** Si el contexto WebGL llega perdido (un lienzo
  reutilizado tras desmontar, que libera el suyo) o se pierde en marcha, la
  escena no monta o se retira y vuelve el SVG. Sin esto, cada recarga en
  caliente llenaba la consola de errores de `Program.use`.

## Layout y CSS

- **Un solo punto de corte de VENTANA: 1024px** (`lib/breakpoints.js`). Por
  encima, portada dividida y píldora arriba; por debajo, una columna y la
  píldora abajo (donde está el pulgar), con tres secciones. Lo que depende
  del ancho de una TARJETA usa `@container` (la tarjeta ancha de KAPHIY).
- **Un `@media` que sobrescribe una regla va DESPUÉS de ella.** Con la misma
  especificidad gana la última: la barra móvil salió visible en escritorio y
  los botones de tema duplicados en móvil por tener el `@media` delante. Cada
  módulo lleva sus `@media` junto a lo que ajustan.
- **Columnas explícitas en la rejilla de trabajo** (12 → 2 → 1). `auto-fit`
  no colapsa pistas vacías cuando un hijo cruza varias.
- **Pistas de rejilla con `minmax(0, 1fr)`, nunca `1fr` a secas, si dentro
  hay algo con `min-width`.** `1fr` no baja del ancho mínimo de su contenido:
  el diagrama (34rem) ensanchaba la página entera de los casos en móvil y el
  visor salía descentrado. Lo mismo para una imagen como hijo flex:
  `min-width: 0`.
- **Los diagramas no se encogen hasta ser ilegibles**: en pantalla estrecha se
  desplazan de lado dentro de su marco (`min-width` del SVG).
- **Enlace estirado para tarjetas enlazables**: el `<a>` es el título y su
  `::after` cubre la tarjeta. Nada de enlaces anidados; lo que tenga que ser
  pulsable aparte va por encima con su propio `z-index`.
- **El hover enciende, no revela.** Todo se ve sin hover; los estilos de hover
  van bajo `(hover: hover) and (pointer: fine)` o se quedan pegados tras un
  toque.
- **Modales nativos**: el visor de capturas es un `<dialog>` con
  `showModal()` (foco atrapado, Escape y fondo inerte sin código propio). Está
  siempre en el árbol; sólo cambia lo que muestra.

## Dependencias

- **Sin CDNs externos.** El sitio es estático y funciona offline; assets en
  `public/`. Los iconos del stack son SVG locales (de `react-icons/si`) que se
  pintan como máscara en el color del texto.
- **`next/image` con `loading="eager"` para lo que está arriba al cargar**;
  `priority` está obsoleto en Next 16.

## Antes de dar algo por terminado

```bash
npm run lint
npm run build
```

`next export` no existe en Next 16: `output: 'export'` hace que `next build`
genere `out/`. Con `trailingSlash` cada ruta sale como `ruta/index.html`.
