<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenciones del proyecto

Portafolio personal. Next.js 16 App Router, export estático a GitHub Pages.
Ver `README.md` para la estructura completa.

## Reglas

- **El contenido no se escribe en los componentes.** Todo el texto y los datos
  van en `src/content/`. Los componentes sólo los consumen.
- **Los valores de diseño no se escriben inline.** Colores, espaciado, radios,
  blur y duraciones salen de `src/styles/tokens.css`.
- **Las animaciones usan los presets** de `src/lib/motion.js`. No inventes
  springs sueltos por componente.
- **No uses la prop `layout` de Framer Motion en el armazón** (barra lateral,
  panel de contenido, tarjetas de sección). La proyección de layout anima un
  `scale` inverso, no `width`/`height`: como los hijos no llevan proyección
  propia, el contenido se ve estirado durante la transición. La geometría del
  armazón la anima CSS — los dos modos declaran los mismos lados sobre
  elementos `position: fixed`, así que el cambio es interpolable de forma
  nativa. Ver el bloque de escritorio en `src/styles/layout.css`.
- Si cambiás `--dur-shell` en `tokens.css`, actualizá `SHELL_MS` en
  `src/lib/motion.js` (lo usa el reanclado del scroll al colapsar).
- **Nunca apiles `backdrop-filter` sobre `backdrop-filter`.** Un cristal
  dentro de otro muestrea la salida ya desenfocada del padre: no separa nada,
  lava el contraste y paga un segundo repintado por fotograma. Llegó a haber
  27 elementos así, y el peor era `.specular-button` —`blur(20px)` dentro de
  una tarjeta con `blur(20px)`, material idéntico al padre—. La tarjeta
  exterior es el material; lo de adentro va con `--fill-raised`. El peso del
  vidrio codifica jerarquía y sale de la escala de `tokens.css`:
  `--glass-thin` para controles sueltos, `--glass-regular` para tarjetas y
  paneles, `--glass-thick` para el cromo que tapa contenido (raíl, cajón,
  cabecera móvil). Los tres derivan de `--glass-blur` con `calc()` para que
  `prefers-reduced-transparency` los siga apagando de una sola vez.
- **El cajón móvil es un gesto, no una transición.** No le vuelvas a poner
  `transition: transform` en `mobile.css`: una transición de CSS no se deja
  agarrar a media animación, no se puede revertir y no sabe nada de la
  velocidad del dedo. El `transform` lo escribe `useDrawerGesture` en el
  atributo `style`. Lo único que queda en CSS es el `translateX(-100%)` de
  antes de hidratar, para que no aparezca abierto en el primer pintado. Al
  soltar se decide con `project()` por a dónde VA el gesto, no por dónde se
  soltó, y la velocidad de soltado entra al muelle como velocidad inicial: sin
  eso se nota la costura entre arrastrar y animar. Si cambiás `--drawer-w`,
  cambiá también `DRAWER_WIDTH` en `src/lib/breakpoints.js`.
- **El movimiento de framer-motion no lo apaga el CSS.** La regla de
  `prefers-reduced-motion` en `base.css` sólo acorta transiciones y
  animaciones CSS; framer-motion escribe `transform` inline fotograma a
  fotograma y se le escapaba entero. Lo que lo cubre es el
  `<MotionConfig reducedMotion="user">` de `layout.js`. No lo quites, y si
  añadís otro árbol de React que anime, que cuelgue de ahí dentro.
- **Nunca escribas `-webkit-backdrop-filter` a mano.** Lightning CSS (el
  compilador de CSS de Next 16) deduplica la pareja estándar + prefijada y se
  queda sólo con la prefijada, que los navegadores actuales ya no aplican:
  el resultado es que el efecto cristal desaparece entero del build. Escribí
  sólo `backdrop-filter` y dejá que el compilador añada los prefijos.
- **El cuerpo de una sección expandida debe llevar `.section-body` como hijo
  directo de la tarjeta**: de ahí cuelga el `overflow-y: auto` que la hace
  desplazable. La tarjeta expandida tiene `overflow: hidden`, así que una
  sección sin ese cuerpo queda recortada y sin forma de desplazarla. Es lo
  que le pasaba a `Contact.jsx`, que construye su tarjeta sin pasar por
  `Section.jsx`. Al añadir una sección nueva, probala expandida en una
  ventana baja (~760px) y comprobá que se llega al final.
- **AnimatePresence recibe un único hijo** en `ContentArea`, y todos los
  hijos posibles caen en la misma celda de `.content-view`. No vuelvas a
  pasarle una lista con `mode="popLayout"`: no saca la saliente del flujo,
  las dos se reparten el `flex: 1` a media altura y la entrante aparece
  debajo de la saliente.
- **Un solo punto de corte responsive: 1024px.** Definido en
  `src/lib/breakpoints.js` y replicado en `src/styles/mobile.css`. No
  introduzcas 768px ni 1023px por separado.
- **Alturas de viewport siempre en `dvh`**, nunca `vh`.
- **Sin recursos de CDNs externos.** El sitio es estático y debe funcionar
  offline; los assets viven en `public/`.
- **Framer Motion es la única librería de animación.** No añadas GSAP, Three.js
  ni react-spring: ya estuvieron y se quitaron por peso y por quedar huérfanas.
- **La paleta sale de la foto, pero por complemento, no por copia.** Cuantizar
  `public/dayle.jpeg` en OKLCH desmiente lo que decía aquí antes: la foto NO
  tiene teal. La ropa y las sombras salen con croma 0.013-0.018, que es gris
  neutro con un matiz frío imperceptible. La única familia con croma real es
  la cálida de la piel y la pared, h≈55 con C 0.048-0.066. Por eso: los
  lienzos son los neutros de la foto (claro cálido h≈85, oscuro frío h≈230),
  el acento es el COMPLEMENTO del cálido (55+180=235, fijado en h=232 para
  conservar un rastro de teal), y el cálido secundario es h=55 con el croma
  que la foto tiene de verdad. h≈232 es además donde sRGB permite más croma
  con contraste accesible, así que el principio y la gama coinciden. Un solo
  tono para los dos temas: lo único que cambia es la L. Si cambia la foto,
  volvé a cuantizar, sacá el tono con croma real y usá su complemento — no lo
  elijas a ojo.
- **Nada de degradados animados a pantalla completa.** El halo del cursor
  reconstruía un `radial-gradient` en la propiedad `background` de un elemento
  de 100vw × 100dvh en cada `mousemove`. Los degradados no se componen en GPU:
  eso era repintar la pantalla entera en el hilo principal por fotograma, y
  además invalidaba el `backdrop-filter` de las ocho superficies de cristal.
  Ahora el degradado es estático y sólo se mueve su `transform`. La misma
  regla mató la deriva perpetua de `.aurora__mesh`: esa capa es el fondo de
  todos los cristales, así que animarla obligaba a recalcular los ocho
  desenfoques para siempre, por un movimiento de ±1,5% en 48s que nadie ve.
- **En el dock se anima `scale`, nunca `width`/`height`.** Ancho y alto
  disparan layout en cada fotograma. El precio es que los vecinos no se
  apartan como en macOS; con el hueco que hay, no se nota.
- **En tema claro, nada blanco sobre blanco.** Bordes, reflejos y estados
  llevan el acento; el lienzo lleva matiz, no gris neutro. Un fondo sin color
  deja a `saturate()` sin nada que hacer y el cristal desaparece aunque el
  `backdrop-filter` esté bien puesto.
- **`--accent` es para texto y bordes; `--accent-fill` para superficies con
  texto blanco encima.** No los intercambies: el acento claro del tema oscuro
  sólo da 3:1 contra blanco y no pasa AA.
- **Los tamaños de componente van en `rem`, no en `px`.** Por encima de 1440px
  `base.css` sube el tamaño de raíz, y eso es lo que hace que la interfaz
  entera escale en un monitor grande. Un `44px` a pelo se queda quieto.
- **No vuelvas a poner un tope de ancho con `right: auto` en el panel
  detallado.** Lo hubo (1500px) y dejaba el marco en 30px a la izquierda y
  272px a la derecha en un 1920: rompía justo la simetría que `--frame-gap`
  garantiza. El ancho extra lo absorben la escala y las rejillas `auto-fit`;
  el texto corrido se limita con `--measure`.
- **`auto-fit` y un hijo con `grid-column: 1 / -1` no se llevan.** `auto-fit`
  colapsa las pistas vacías, y un hijo que las cruza todas hace que ninguna lo
  esté: en 1920 `.setup-grid` generaba cinco pistas para tres tarjetas. Si la
  rejilla tiene una tarjeta ancha, declará las columnas explícitamente.
- **El tema sigue al navegador por defecto.** `data-theme` es el tema aplicado y
  `data-theme-source` dice si viene del sistema o de un override del visitante;
  el botón sólo fija override, y al volver a coincidir con el sistema lo borra.
  No añadas efectos: el script inline de `layout.js` deja los dos atributos
  listos antes de hidratar.
- Estado de puntero/scroll: usar motion values, no `useState` en handlers de
  `mousemove` (provoca un render de React por evento).
- Evitar `setState` dentro de `useEffect` en el montaje; usar
  `useSyncExternalStore` (ver `lib/useMediaQuery.js`, `lib/useMounted.js`).

## Antes de dar algo por terminado

```bash
npm run lint
npm run build
```

`next export` no existe en Next 16. `output: 'export'` hace que `next build`
genere `out/`.
