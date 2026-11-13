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
- **Su cara se ve al cargar.** En escritorio va a la derecha de la portada.
  En móvil, el recorte circular va en Inicio de la barra inferior y el
  nombre y el rol usan el ancho de la portada. Un reclutador quiere ver a quién está
  leyendo; antes la foto estaba al final (Sobre mí) y la portada la ocupaba
  la pila 3D. Sobre mí ya no repite la foto.
- **La portada resume; el caso de estudio lo cuenta todo.** Cada proyecto sale
  en la portada con título, una línea, dos cifras y sus capturas; el stack, la
  arquitectura, las funcionalidades, el reto, la galería y el rol viven en
  `/[lang]/projects/[id]`. No repitas en la portada lo que ya está a un clic,
  y no quites del caso nada de lo que se sabe del proyecto.
- **Las notas enseñan cómo pienso** (`content/notes.js`, `/[lang]/notes/[id]`).
  En backend el trabajo no se ve en una captura; una nota cuenta un problema
  concreto y cómo lo resolví, con el código real. Sólo código mío,
  COMPROBADO en el historial de git del repositorio (el arreglo de zonas
  horarias de KAPHIY parecía buen tema y lo subió un compañero), y los
  fragmentos se recortan pero no se reescriben. Van firmadas: el texto lo
  revisa ella antes de publicarse.
- **La disponibilidad va arriba, encima del nombre** (`profile.availability`
  en `copy.js`): es lo primero que pregunta un reclutador y lleva al
  contacto. Si deja de buscar, se borra la cadena y desaparece.
- **Cinco páginas, cada una con un tema: Inicio, Proyectos, Experiencia,
  Sobre mí y Notas** (`content/navigation.js`), más una por proyecto y una
  por nota. Era una sola página; con las competencias, congresos,
  certificados y hobbies ya no cabía todo sin esconder nada. El inicio es lo
  que lee el reclutador con prisa: portada, tres proyectos destacados
  (`featured` en `projects.js`) con el enlace a los siete, y el contacto.
  Dentro de cada página, nada de modos de lectura ni "ver más" que escondan
  contenido: lo que está oculto no se lee. El título de la primera sección de
  cada página es su `<h1>` (`pageTitle`).
- **El CV que se descarga es una versión pública: sin teléfono.** Los
  originales (con teléfono) son locales y no se suben. Se redacta el PDF
  original, no el `.docx`, que suele ir por detrás: se borra la línea de
  contacto de verdad (redacción, no un recuadro blanco que deja el número
  copiable) y se reescribe sin el teléfono, centrada, con Calibri (el PDF usa
  Carlito, su clon métrico, en un subconjunto que no sirve para escribir).
  Correo, ciudad, LinkedIn y GitHub se quedan: ya están en el sitio.
- **Los hechos salen del CV** (`public/Dayle-Garcia-Fernandez-CV-*.pdf`) **y
  de los informes de cada proyecto.** No inventes cifras ni herramientas. Si
  algo del informe es un objetivo y no un resultado medido, no va como cifra.
- **Sólo lo que hice yo.** En la Junta de Agua de Miñarica el sistema lo hizo
  un equipo y lo mío es el **módulo contable**: título, capturas, diagrama y
  cifras son de ese módulo; la facturación SRI y el resto salen sólo como
  contexto (`scope` en `copy.js`). En Fiado lo mío es el flujo biométrico
  (prueba de vida, comparación con la cédula, traspaso al celular), el
  registro y la sesión, y la portada; los simuladores y el panel son del
  equipo. El asistente de cursos CTT-FISEI (hackathon) lo hizo sola, pero
  el código lo escribieron agentes de IA que orquestó (Claude Code y Cursor
  CLI): el rol lo dice tal cual y no sale en las notas, que son código
  suyo. Lo mismo para cualquier proyecto de
  equipo. En la experiencia, cada web pública del puesto lleva una nota
  que dice qué es (`linkText` en `copy.js`): Migo es el producto de la
  empresa, no lo hice yo; la documentación de su API sí la publiqué yo.

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
  Una cámara con la cara de alguien (la prueba de vida de Fiado) se tapa con
  `face`: difumina el video hasta que no se reconoce a nadie y redibuja el
  óvalo guía, que es lo que explica la captura. Mirá cada captura a tamaño
  real antes de añadirla.
- **La cabecera de un caso es un plano de situación, no la captura
  entera.** Una captura más alta que 16:10 se ve desde arriba en una ventana
  16:10 (`is-tall`, ShotStage.jsx) y los teléfonos tienen un alto máximo
  según la pantalla (`dvh`). La de Fiado (787×800) llegó a medir más que la
  pantalla. Entera, en la galería y en el visor.
- **La galería son mosaicos IGUALES** (16:10, la captura centrada sobre un
  paspartú, sin recortar ni ampliar por encima de su tamaño): las capturas
  son equivalentes y mezclan webs 2:1, casi cuadradas, teléfonos 9:20 y una
  de 564 px. Con el alto de cada imagen, las filas salían desiguales. Dos
  columnas con 2 o 4 capturas, tres con el resto (para que las filas
  cierren parejas); dos en tablet, una en móvil.
- **`w`/`h` en `projects.js` son los píxeles reales del archivo**: reservan
  el hueco antes de que cargue (sin saltos de maquetación). Si regenerás una
  captura, actualizalos.
- **Las tarjetas usan variantes pequeñas** (`npm run cards`, después de
  `npm run shots`): una captura de teléfono se pinta a ~150px y su archivo
  mide 650. `Frame` las ofrece en un `<source>` con `sizes` porque, con
  `images.unoptimized`, `next/image` no genera `srcset`. La galería, el visor
  y la cabecera del caso siguen con el original.

## Retrato

- **Cabeza y hombros, con la coronilla entera.** La fuente es local.
  `portrait_layers.py` conserva el alfa de un PNG recortado o recorta la
  silueta con BiRefNet si la foto es opaca. También genera una máscara de
  filo desde el mismo alfa. `npm run portrait` crea las WebP y escribe
  `content/portrait.js`. `public/dayle.jpeg` queda para datos estructurados.
- **La silueta deja ver la página** y se disuelve de forma progresiva bajo
  la cara. La pared clara junto a la silueta se veía como un halo. El filo
  se pinta en CSS, latón en oscuro y blanco cálido en claro, y aparece sólo
  donde lo revela el foco del puntero o el scroll táctil.
- **El navegador elige la foto por ancho y densidad.** El `<picture>` publica
  las variantes WebP con `sizes` para escritorio y en móvil reutiliza el
  recorte ligero del enlace Inicio.
- **En escritorio el retrato es absoluto:** la coronilla queda cerca de la
  pastilla, los hombros se disuelven hacia la línea de datos y el texto marca
  el alto de la portada. En móvil, Inicio muestra el avatar en todas las
  páginas de primer nivel. Así la foto acompaña al nombre sin ocupar una
  fila por encima del texto.

## Logos

- **Cada certificación, evento y empresa lleva el logo de quien lo emite u
  organiza** (`content/logos.js`, por `id`; `LogoTile.jsx`). Salen de sus
  propios certificados (HatunSoft, FISEI, UTA, CSEI, Cisco, EF SET) o de las
  webs oficiales (Cambridge, Grok, TCS, Migo). Cuadrados de 176 px, fondo
  blanco y el símbolo centrado con margen, para que todos pesen lo mismo a
  la vista; la pastilla es blanca en los dos temas porque los logos son de
  color. Sin un logo nítido (el favicon de 16 px de Credly), el icono
  genérico del tipo: mejor un icono limpio que un logo borroso. Se elevan
  cuando se lee su fila, no prometen un clic.

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
  Única excepción: el verde de estado (`--status-on`), sólo en el punto de
  "disponible" de la portada. Es una señal convencional (luz piloto), no un
  acento: nada más lo usa.
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

- **Cristal sólo en lo que FLOTA sobre contenido**: la píldora, el menú del
  CV y el fondo del visor (que atenúa y desenfoca la página para enfocar la
  captura). Tarjetas, paneles y todo lo que se desplaza con la página son
  opacos: un cristal sobre un fondo liso no se ve (es decoración) y un
  `backdrop-filter` en contenido que se desplaza repinta en cada fotograma.
- **El material es uno, en tokens** (`--glass-*`): desenfoque con saturación
  alta (180%: el color de debajo se aviva, no se lava), tinte, brillo
  cenital (`--glass-sheen`), sombra con filo interior (`--glass-shadow`) y
  un filo especular de 1px (`--glass-specular`, pintado con una máscara de
  borde). Es una aproximación web: el Liquid Glass de Apple no existe en CSS.
- **Texto sobre cristal con "vibrancy"**: dentro del cristal `--muted` pasa a
  `--glass-ink-muted`. El peor caso es una captura blanca (o marina, en
  claro) justo debajo; con el gris normal los enlaces caían a ~2:1.
- **La capa que desenfoca es más grande que la píldora** y se recorta con
  `overflow` + radio (`.site-nav__glass`): `backdrop-filter` sólo muestrea
  lo que está justo detrás, y sin esto el color llega de golpe cuando el
  contenido ya está debajo. Crece hacia donde llega el contenido (abajo en
  escritorio, arriba en móvil).
- **Nunca un cristal dentro de otro, y ningún ancestro con `opacity` < 1,
  `filter`, `mask`, `clip-path` o `backdrop-filter`** (lo convierten en
  backdrop root y deja de ver la página). Por eso el filtro de la píldora va
  en una capa hermana y no en la píldora: así el menú del CV, que vive
  dentro, es cristal de verdad. En el visor, la barra de controles es una
  lente clara SIN su propio filtro, porque ya está sobre el fondo esmerilado.
- **Con `prefers-reduced-transparency` o `prefers-contrast: more`** el
  cristal es una superficie sólida (`base.css`): sin desenfoque, un tinte al
  70% dejaría el texto sobre lo que pase por debajo.
- **El cristal marca jerarquía, así que no va en todo.** Es para lo que
  flota o se pulsa (píldora, lente, menú, visor, botones secundarios,
  enlaces de contacto) y para la pila, que es la firma del sitio. Las
  pastillas de los logotipos del stack lo IMITAN sin `backdrop-filter`
  (`--tile-*`). Las fichas de la experiencia llegaron a llevarlo y volvieron
  a ser mate; el retrato también, y ahora ni ficha tiene. Cristal en todas
  partes es el patrón de "sitio hecho por IA" y deja de distinguir nada.
- **Todo lo que se pulsa es píldora** (botones, enlaces de contacto, la
  píldora y su lente); los campos llevan `--r-sm` y las tarjetas `--r-lg`.
- **El filo de lo enlazable atrapa la luz** (`data-rim` + `SpecularRim.jsx`):
  en tarjetas de trabajo, siguiente proyecto y el formulario, el borde se
  enciende en latón alrededor del puntero. Un listener para toda la página,
  el rectángulo se mide al entrar, y sólo con ratón.
- **No escribas `-webkit-backdrop-filter` ni `-webkit-mask` a mano.** Lightning
  CSS se queda con la versión prefijada y el efecto desaparece del build.

## Movimiento

- **Framer Motion para la interfaz** (springs de `lib/motion.js`, con
  `bounce` + `visualDuration`) **y OGL sólo para la pila 3D.**
  Sin GSAP, Three.js ni react-spring: Three.js pesaba ~130 KB comprimidos
  para cuatro cajas; OGL, ~15 KB. Nada rebota: no hay gestos con inercia.
- **Una firma breve al cargar el documento de Inicio**: el nombre se escribe
  y las cuatro losas se apilan sobre un velo de cristal. Durante la entrada
  se cargan la fuente, el retrato y las variantes responsivas de los
  destacados. El velo se retira al terminar, con un límite de 2,4 s para
  conexiones lentas. Una interacción lo puede saltar. Al navegar por el
  sitio no vuelve a aparecer y con movimiento reducido queda un fundido corto.
- **En Stack, las losas caen y se apilan** cuando la pila
  entra en pantalla (en Stack), no al cargar; si al hidratar ya se veía, no
  caen. Cuando entra la escena de cristal, una luz baja UNA vez por las
  capas (de Cliente a Infra, como una petición).
- **El foco del retrato grande responde a la lectura.** Con ratón,
  sólo el tramo del contorno cercano al puntero (motion values + spring; un
  círculo que viaja con `transform` y un filo contra-desplazado); en táctil,
  lo recorre el scroll (CSS scroll-driven). Nada al cargar. Es un resaltado
  de lectura: sin cursor de mano ni elevación (lo que no se puede pulsar).
- **Sólo `transform` y `opacity` en lo que se anima por fotograma.** El
  subrayado del correo es `scaleX`. Excepción documentada: la lente de la
  píldora (`LiquidLens.jsx`) cambia de `width` (además de `translateX`): va
  en posición absoluta, así que no mueve nada más, y un `clip-path` le
  recortaba el borde y la sombra que la hacen leerse como cristal elevado.
  Sus dos bordes van con springs distintos y se estira como una gota.
- **Un gesto por pieza.** Las tarjetas de trabajo se inclinaban, su captura
  pequeña se movía aparte, el filo se encendía y el título cambiaba: cuatro
  efectos a la vez se leían como demo. Quedan el filo de luz y el título.
- **Las cosas salen de donde se tocaron** (View Transitions):
  · Galería → visor: la captura crece desde su miniatura y vuelve a ella al
    cerrar (X, Escape o clic fuera), o a la de la captura que se esté
    viendo; si esa miniatura no está en pantalla, fundido (`morph` en
    `Gallery.jsx`).
  · Portada → caso: la captura de la tarjeta crece hasta la portada del caso
    y vuelve al regresar (`<ViewTransition name="cover-<id>" share="morph">`
    en `WorkCard` y `ShotStage`, con `experimental.viewTransition`).
  Con movimiento reducido no viajan: queda el fundido.
- **El diagrama se construye una vez** al entrar en pantalla (nodos en
  cascada, conexiones que se dibujan, paquetes al final): explica el sistema
  en el orden en que se lee. Sólo si al hidratar todavía no se veía; sin JS
  se ve entero.
- **Las entradas se pintan en CSS.** `.enter` va en cascada al cargar
  (`--i` es el orden). Para `.reveal`, un solo IntersectionObserver por ruta
  dispara la animación al entrar en pantalla por primera vez, con 48px
  visibles por encima de la barra móvil. El HTML ya se ve, incluso sin JS,
  y el efecto no se deshace al subir. No uses
  `initial={{ opacity: 0 }}` de framer: esconde contenido hasta que hidrata.
- **Movimiento reducido se decide efecto a efecto.** `MotionConfig` va con
  `reducedMotion="never"`. `base.css` quita el scroll suave y las entradas
  al bajar quedan en un fundido. Lo pequeño (hover y desplegables) anima
  siempre; lo que se mueve
  más (la caída de las losas, el giro de la pila, los paquetes de los
  diagramas) hace el mismo gesto en corto o más lento. Peor caso: "suave",
  nunca "quieto".
- **El cambio de tema es una View Transition** (`apply()` en `lib/theme.jsx`):
  desde el botón, el tema nuevo se revela en un círculo que crece desde él
  (`[data-vt="reveal"]` en `base.css`); si cambia el sistema o hay
  movimiento reducido, un fundido de 250ms. No pongas transiciones de color
  en `body` ni en superficies para el tema: llegaban cada una a su ritmo y
  durante medio segundo se veía un fondo oscuro con tarjetas ya claras.
- **Entradas y salidas de lo que aparece, en CSS moderno**: `@starting-style`
  para la entrada y `transition: …, display … allow-discrete, overlay …
  allow-discrete` para que un `<dialog>` que se cierra no desaparezca antes
  de terminar su salida. Sale por el mismo camino que entró, y más rápido.
- **Respuesta al pulsar en todo lo pulsable**: `:active` con `scale(0.96–0.99)`
  y 160ms (en móvil no hay hover que confirme el toque). Si el elemento ya
  tiene una animación de entrada que anima `transform` con relleno, usá la
  propiedad `scale`, que no se pisa con ella.
- **Lo que no se puede pulsar no PROMETE un clic** (tecnologías del stack,
  viñetas de la experiencia, el retrato): nada de cursor de mano, color de
  acento en el texto ni elevación de la pieza entera. Sí vale un **resaltado
  de lectura**: la fila del stack con un velo tenue y sus pastillas que se
  elevan una tras otra, la viñeta bajo el puntero que se aclara y alarga su
  raya. Marca qué se está leyendo, no adónde lleva.
- **Los botones responden como cristal**: suben 1px, la sombra se alarga y
  un destello los cruza (sólo `transform`). Los secundarios y los enlaces de
  contacto son pastillas de cristal (`--tile-*`); idioma y tema muestran una
  mini lente (`--lens-*`) al pasar. La lente de la sección activa es cristal
  elevado: en claro, blanco sobre blanco sólo se distingue por su borde y su
  sombra.
- **El punto de "disponible" se enciende una vez** al cargar y se queda
  encendido, como una luz piloto. Sin latido: un pulso perpetuo arriba de
  la página distrae de todo lo demás y se lee como una notificación.
- **Nada perpetuo salvo lo pequeño**: los paquetes SMIL de los diagramas, que
  además se pausan fuera de pantalla. Sin latidos ni pulsos.
- **No ramifiques el árbol renderizado según `useReducedMotion()` o una media
  query**, ni cambies atributos por ellos en el render: descuadra la
  hidratación. Misma estructura siempre; el ajuste va en un efecto o en CSS.
- **Puntero y scroll con motion values**, no `useState` en `pointermove`; el
  rectángulo se mide al entrar, no en cada movimiento. Nada de `setState` en
  el montaje: `useSyncExternalStore`.
- **La píldora marca la página en la que se está** (`current`, desde
  `PageShell`); en el inicio, el contacto cuando se llega a él, con el
  scroll-spy: la sección que cruza una línea al 40% de la altura, no la de
  mayor proporción visible (una sección más alta que la pantalla nunca tiene
  proporción alta y la navegación se quedaba una por detrás). La portada
  (`#top`) también se observa, para que al volver arriba no quede nada
  marcado. Los ids deben ser estables (constante de módulo).

## 3D (pila)

- **Vive en Stack: es el índice de la sección.** Sticky a la derecha en
  escritorio, arriba y más pequeña en móvil. El componente sigue en
  `hero/` (`SystemStack.jsx`): lo usa Stack.
- **El SVG es el primer pintado y el respaldo; si hay WebGL 2, la caída es
  de la escena.** `SystemStack.jsx` pinta la pila en SVG isométrico desde el
  build. El fragmento se pide a dos pantallas de distancia, no al cargar
  (OGL y la escena eran 23 KB que casi nadie usaba en ese momento). La escena
  se MONTA cuando el scroll descansa, o a una pantalla si no descansa
  (`rootMargin`): compilar sus shaders para el hilo principal ~140ms, un
  tirón en pleno scroll. La caída la hace WebGL entera y el SVG no se ve.
  Si llega tarde, sigue la caída CSS desde su progreso (`getAnimations()`)
  con un fundido de 150ms.
- **El SVG imita el cristal** (degradado lechoso arriba, cantos con
  degradado, filo de luz en el tramo que mira a la luz, núcleo con brillo;
  tokens `--stack-svg-*`), para que el relevo se lea como "se enciende la
  luz" y no como un cambio de material.
- **Las dos capas comparten geometría** (`stackGeometry.js`): la cámara de la
  escena es ortográfica e isométrica, así que el SVG puede calcular la misma
  proyección y el relevo es un fundido invisible. Si tocás tamaños o
  posiciones, tocálos ahí y en ningún otro sitio.
- **Pinta bajo demanda**: el bucle sólo corre mientras algo se acerca a su
  objetivo (puntero, scroll, tema) y se para al llegar; fuera de pantalla no
  pinta. DPR ≤2 con ratón y ≤1.5 en táctil. Sin WebGL 2 no monta y se queda
  el SVG.
- **Las losas son Liquid Glass, no vidrio.** La primera versión era cristal
  "de verdad" (cajas de canto recto, biseles grises, reflejos de estudio) y
  se veía como un pisapapeles fuera de lugar junto a la píldora. La
  referencia es el material de Apple: piezas de esquinas redondeadas
  (`SLAB.radius`, contorno de `roundedOutline`, compartido con el SVG),
  cuerpo esmerilado y lechoso, brillo interior junto al borde y un filo de
  luz que entra por la izquierda y queda en sombra al otro lado. Casi no
  refleja el entorno: deja pasar la luz.
- **Dos pasadas y sin Three.js.** Los núcleos (la placa luminosa de cada
  capa) se pintan en una textura; el cristal la muestrea desenfocada (cinco
  muestras: el esmerilado) y desplazada según la normal, con dispersión sólo
  en el bisel. El bisel lo inclina el shader con la distancia al contorno
  redondeado (una SDF), no la malla. Es la versión ligera de los bloques de
  cristal de HyperFrames (Three.js, un HDR de 1,6 MB y materiales físicos):
  aquí cuesta lo que pesa OGL.
- **Los colores de la escena salen de los tokens** (`--stack-*`, en
  hexadecimal o número) y se releen al cambiar `data-theme`. En claro el
  cristal se define por filos y reflejos oscuros: un brillo blanco sobre
  papel sólo lava la losa.
- **Las etiquetas son HTML**, no texto en textura: nítidas, con la fuente
  real. El CSS las deja en la esquina de su losa en reposo (`--x`/`--y`); la
  escena las mueve con `transform` y el centrado va en `translate`, para no
  pisarse.
- **Cada etiqueta es un enlace a su grupo** (`#stack-<grupo>`, mapeo en
  `content/stackLayers.js`; antes `hero.js`) y la fila de destino se marca
  con `:target`. El hover tiene dos fuentes en la misma `hover()`
  (`SystemStack.jsx`): el puntero (etiqueta o losa) y, en escritorio, la fila
  que cruza la línea del 40% (la lectura). El puntero manda mientras está
  encima. La losa la da el rayo de la escena, o el polígono del SVG si no hay
  escena; pone `data-active` y la escena la levanta. Un clic en la losa sigue
  el enlace de su etiqueta. El lienzo no recibe eventos: los atiende el
  contenedor.
- **`?stack=svg|gl` fuerza una capa, sólo en desarrollo**, para comparar las
  dos en la misma pose.
- **Contexto perdido = SVG.** Si el contexto WebGL llega perdido o se pierde
  en marcha, la escena no monta o se retira y vuelve el SVG. Sin esto, cada
  recarga en caliente llenaba la consola de errores de `Program.use`.
- **El lienzo lo crea el efecto, no el JSX.** Cada montaje estrena un
  `<canvas>` con su propio contexto y lo retira al desmontar. Reutilizar el
  del montaje anterior (lo que hace una recarga en caliente) lo daba ya
  liberado: la pila se quedaba en SVG plano hasta recargar la página.

## Layout y CSS

- **Un solo punto de corte de VENTANA: 1024px** (`lib/breakpoints.js`). Por
  encima, portada dividida (texto y retrato) y píldora arriba; por debajo,
  una columna y la barra abajo (donde está el pulgar).
  Lo que depende del ancho de una TARJETA usa `@container` (la tarjeta ancha
  de KAPHIY).
- **Toques de 44px en táctil.** En móvil, Proyectos, Experiencia, Sobre mí,
  Notas y Contacto comparten una fila. Inicio, CV, idioma y tema tienen
  su propia fila. La barra conserva todos los destinos en 320px y reserva
  su altura al final del documento para dejar el pie y los campos accesibles.
- **El nombre de la portada va siempre en dos líneas**: su tamaño no pasa
  del 12% del ancho de su columna (`cqi`, la columna es contenedor). Con la
  raíz que crece en monitores grandes, "Daylé García" se partía y quedaban
  tres líneas.
- **Un `@media` que sobrescribe una regla va DESPUÉS de ella.** Con la misma
  especificidad gana la última: la barra móvil salió visible en escritorio y
  los botones de tema duplicados en móvil por tener el `@media` delante. Cada
  módulo lleva sus `@media` junto a lo que ajustan.
- **Columnas explícitas en la rejilla de trabajo** (12 → 2 → 1). `auto-fit`
  no colapsa pistas vacías cuando un hijo cruza varias.
- **Pistas de rejilla con `minmax(0, 1fr)`, nunca `1fr` a secas, si dentro
  hay algo con `min-width`.** `1fr` no baja del ancho mínimo de su contenido:
  el diagrama (34rem) ensanchaba la página entera de los casos en móvil y el
  visor salía descentrado. En la portada móvil, sin pista explícita la
  rejilla crecía al ancho del lienzo del retrato y el centrado dejaba de
  centrar. Lo mismo para una imagen como hijo flex: `min-width: 0`. Un
  elemento que desborda su pista se centra con `justify-self: unsafe center`
  (el centrado "seguro" lo alineaba al inicio y la cara se salía por la
  derecha).
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
