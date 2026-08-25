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
- **La paleta sale de la foto de perfil, no de la imaginación.** Los dos temas
  se derivan de cuantizar `public/dayle.jpeg`: petróleo/teal de la ropa
  (h≈190-210) y arena cálida de la pared (h≈28-42). El acento es el mismo tono
  en ambos modos, sólo cambia la luminosidad. Si cambia la foto, volvé a
  cuantizarla antes de tocar `tokens.css`.
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
