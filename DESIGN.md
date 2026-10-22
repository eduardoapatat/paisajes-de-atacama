---
name: Paisajes de Atacama
description: Valles, salares, lagunas y géiseres del norte de Chile contados como un relato por capítulos
colors:
  desert-night: '#1a1411'
  sand: '#f5eee6'
  gold: '#e2a93b'
  dusk: '#d9a293'
typography:
  display:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '3rem'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.1
  numeral:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '4.5rem'
    fontWeight: 300
    lineHeight: 1.1
  body-lg:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: '0.3em'
  credit:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: '6px'
  card: '16px'
  curtain: '32px'
  curtain-lg: '48px'
  full: '9999px'
spacing:
  gutter: '20px'
  gutter-lg: '32px'
  section: '96px'
  section-lg: '128px'
  chapter-gap: '112px'
  chapter-gap-lg: '160px'
  container: '1280px'
components:
  button-primary:
    backgroundColor: '{colors.gold}'
    textColor: '{colors.desert-night}'
    typography: '{typography.body}'
    rounded: '{rounded.full}'
    padding: '12px 24px'
  button-primary-hover:
    backgroundColor: '{colors.sand}'
    textColor: '{colors.desert-night}'
  nav-pill:
    backgroundColor: '{colors.desert-night}'
    textColor: '{colors.sand}'
    rounded: '{rounded.full}'
    padding: '6px'
  nav-link:
    textColor: '{colors.sand}'
    typography: '{typography.body}'
    rounded: '{rounded.full}'
    padding: '8px 16px'
  nav-link-hover:
    textColor: '{colors.gold}'
  link-story:
    textColor: '{colors.desert-night}'
    typography: '{typography.meta}'
    padding: '0 0 4px 0'
  card-atractivo:
    backgroundColor: '{colors.sand}'
    textColor: '{colors.desert-night}'
    rounded: '{rounded.card}'
  curtain-section:
    backgroundColor: '{colors.sand}'
    textColor: '{colors.desert-night}'
    rounded: '{rounded.curtain}'
    padding: '96px 0'
  footer:
    backgroundColor: '{colors.desert-night}'
    textColor: '{colors.dusk}'
    padding: '48px 24px'
---

# Design System: Paisajes de Atacama

## Overview

**Creative North Star: "Bitácora del atardecer"**

El sitio se lee como una bitácora: capítulos numerados que avanzan con el scroll, bajo la luz cálida del altiplano al caer la tarde. Toda la paleta sale de una sola foto, la del hero: la sombra del desierto, la arena clara, el pasto dorado y el cielo rosado. Ningún color viene de fuera de ese paisaje.

El ánimo es cálido, sereno y cinematográfico. Hay poca interfaz en pantalla y mucha fotografía. El movimiento es lento, va ligado al scroll y sirve para descubrir: las fotos se abren con máscaras, los títulos suben por líneas y las secciones se superponen como cortinas. La densidad es baja: grandes márgenes verticales entre capítulos y una sola idea por pantalla.

Hay dos ambientes que se alternan: el oscuro (hero, noche y pie) para la fotografía a pantalla completa, y el claro, color arena, para las secciones de lectura (paisajes y atractivos). El paso de uno al otro es siempre una cortina, nunca un corte.

**Key Characteristics:**

- Paleta de cuatro colores, toda sacada de la foto del hero.
- Una sola familia tipográfica (Outfit variable), con jerarquía por peso y tamaño.
- Fotografía protagonista, siempre optimizada con `<Picture>` (AVIF y WebP).
- Movimiento ligado al scroll con GSAP y siempre con alternativa para `prefers-reduced-motion`.
- Plano por defecto: la profundidad viene de las capas que se superponen al hacer scroll, no de sombras.

### Motion

Tokens en `src/lib/gsap.ts` (`MOTION`); ninguna animación usa números sueltos.

| Token                      | Valor           | Uso                                                                     |
| -------------------------- | --------------- | ----------------------------------------------------------------------- |
| `ui` / `uiExit`            | 0,25 s / 0,2 s  | Navbar y cambios de estado; la salida es más rápida que la entrada      |
| `text`                     | 0,6 s           | Líneas de texto, metadatos y enlaces                                    |
| `mask`                     | 0,9 s           | Apertura de una foto con `clip-path`                                    |
| `settle`                   | 1,4 s           | Zoom de asentamiento de la foto dentro de su máscara (desde `zoom` 1.1) |
| `hero`                     | 1,2 s           | Título del hero al cargar (momento único)                               |
| `fade`                     | 0,2 s           | Aparición con reduced motion, solo opacidad                             |
| `stagger` / `staggerBlock` | 0,06 s / 0,08 s | Entre líneas / entre bloques o tarjetas                                 |
| `rise`                     | 16px            | Lo que sube un bloque al entrar                                         |

**The One Second Rule.** Lo que se lee queda completo y legible en 1 s o menos desde que entra en pantalla. El texto arranca en paralelo con la foto, no después.

**The Ease-Out Rule.** Lo que entra usa `expo.out` (`cubic-bezier(0.16, 1, 0.3, 1)`). Los barridos de máscara que cruzan la pantalla usan `expo.inOut`. Lo ligado al scroll usa `ease: 'none'`. Nunca `ease-in` en una entrada.

**The One Protagonist Rule.** Cada sección tiene un solo momento que se toma su tiempo: el título del hero, la máscara de cada capítulo, el círculo de la noche. El resto acompaña con `text` y no compite.

- Las apariciones arrancan con el bloque al 80 % de la ventana (`top 80%`) y ocurren una sola vez (`once: true`).
- El escalonado completo de un grupo no pasa de 300 ms.
- Navegación y acciones frecuentes: 250 ms o menos. Hover de color: 150 ms. Lo presionable responde con `scale(0.97)` en `:active` (160 ms).
- Desenfoque de 10px como máximo y solo en momentos únicos (el título de la noche).
- El hero y la noche son momentos únicos y pueden durar más (título del hero 1,2 s, noche ligada al scroll).
- Con reduced motion no hay desplazamientos, zoom ni máscaras: el contenido aparece con un fundido de `fade` (0,2 s) y las secciones fijas quedan abiertas.

## Colors

Cuatro colores cálidos del atardecer en el altiplano: dos neutros que se alternan como fondo y texto, un acento dorado y un rosado para los detalles.

### Primary

- **Pasto dorado** (`gold`): el acento. Se usa en el botón principal, en los números de capítulo, en el subrayado de los enlaces "Leer su historia", en la selección de texto y en el anillo de foco. Sobre fondo arena solo va en elementos grandes o decorativos.

### Secondary

- **Cielo rosado** (`dusk`): detalles y bordes. Es el texto del pie, el borde del navbar (al 30 %), los separadores del pie (al 20 %) y el fondo del hover del navbar (al 15 %).

### Neutral

- **Sombra del desierto** (`desert-night`): fondo de los ambientes oscuros y del `body`, y texto en las secciones claras. En las secciones claras el texto secundario usa opacidades: 80 % para párrafos, 70 % para metadatos, etiquetas y rótulos de datos, y 10 % para separadores.
- **Arena clara** (`sand`): texto sobre fondos oscuros y fotos, y fondo de las secciones de lectura.

### Named Rules

**The One Photo Rule.** Todo color nuevo debe poder encontrarse en la foto del hero. Si no está en el paisaje, no entra en la paleta.

**The Gold Is Big Rule.** Sobre fondo arena, el dorado solo va en elementos grandes o decorativos (números de capítulo, subrayados, el botón). Nunca en texto chico: no tiene contraste suficiente.

**The Opacity Ladder Rule.** La jerarquía del texto en las secciones claras se hace con opacidades de `desert-night` (100, 80 y 70 %), no con grises nuevos. El 70 % es el mínimo para texto: sobre arena da 6,4:1; con 60 % o menos no llega a 4,5:1.

## Typography

**Display Font:** Outfit (con sans-serif)
**Body Font:** Outfit (con sans-serif)

**Character:** Una sola sans geométrica y variable (100–900), cargada con la API de fuentes de Astro desde Fontsource, con precarga del subconjunto latino. La jerarquía viene del peso y la escala: seminegrita para titulares, light para los números grandes y regular para la lectura.

### Hierarchy

- **Display** (600, 3rem → 4.5rem desde `sm` → 6rem desde `lg`, interlineado 1.1, tracking −0.025em): título del hero y "En la noche...". Uno por pantalla.
- **Headline** (600, 2.25rem → 3rem desde `sm`, 1.1): títulos de sección ("6 lugares del Desierto de Atacama", "Otros lugares para conocer"). Los títulos de capítulo usan la misma voz un paso más abajo (1.875rem → 2.25rem desde `sm`) para no competir con el título de la sección; el número dorado ya les da presencia.
- **Title** (600, 1.5rem, 1.1): título de las tarjetas de atractivos.
- **Numeral** (300, 4.5rem → 6rem desde `sm`, 1.1): números de capítulo en dorado ("01", "02"…). Son decorativos y llevan `aria-hidden`.
- **Body large** (400, 1.125rem, 1.625): introducción de cada capítulo y cuerpo de la página de detalle.
- **Body** (400, 1rem, 1.5): texto general y resúmenes de los atractivos.
- **Meta** (400, 0.875rem): ubicación y altitud, enlaces del pie.
- **Label** (400, 0.75rem, tracking 0.3em, en mayúsculas, `sand` al 70 %): solo la indicación "Desliza" al pie del hero.

### Named Rules

**The Clip Margin Rule.** Los titulares usan interlineado 1.1. Las máscaras de SplitText recortan al alto de la línea, así que llevan `overflow-clip-margin: 0.2em` (atributo `data-split-mask`) y el texto oculto parte desde `yPercent: 140` (`MOTION.maskFrom`). No se cortan acentos ni colas (j, g, q) y no se usa padding en las máscaras.

**The Balanced Headline Rule.** Los titulares llevan `text-wrap: balance` y los párrafos `text-wrap: pretty`.

## Layout

- **Contenedor:** centrado, con ancho máximo de 1280px y márgenes laterales de 20px, que pasan a 32px desde `sm` (640px). El pie usa un contenedor más estrecho (1152px).
- **Ritmo vertical:** las secciones de lectura tienen 96px de relleno vertical, que pasan a 128px desde `sm`. Entre capítulos hay 112px, que pasan a 160px desde `sm`.
- **Capítulos de paisajes:** en móvil la foto va arriba y el texto debajo, con 40px de separación. Desde `lg` (1024px) es una grilla de 12 columnas: foto en 7 y texto en 5, con 64px de separación. El lado de la foto alterna en cada capítulo.
- **Tarjetas de atractivos:** grilla de 1 columna, 2 desde `sm` y 3 desde `lg`, con 24px entre columnas y 48px entre filas. Si hay un solo atractivo, en vez de la grilla va foto y texto lado a lado desde `sm` (ancho máximo 1024px, 64px de separación desde `lg`, título a 2.25rem): nunca una tarjeta suelta con columnas vacías.
- **Anclas:** el navbar flotante ocupa unos 70px y reaparece al subir. Toda sección con ancla cuyo título no tenga al menos ese aire arriba lleva `scroll-mt-20` (80px), para que al llegar desde un enlace el título no quede bajo el navbar.
- **Antes de viajar:** la escalera de altura ocupa 8 de 12 columnas desde `lg`, junto a su pregunta (4 columnas); debajo, separadas por una línea `desert-night` al 10 %, las preguntas en tres grupos (una columna en móvil, tres desde `md`). Es la sección clara que queda bajo el horizonte: su relleno inferior suma `--horizon-height`.
- **Pantallas completas:** hero y noche ocupan `100svh`.

**The One Idea Per Screen Rule.** Cada pantalla de scroll muestra una sola idea: un capítulo, un título o una foto. No se agrupan capítulos ni se comprimen los márgenes para que quepa más.

## Elevation & Depth

El sistema es plano. Las tarjetas y las fotos no llevan sombra. La profundidad viene del scroll: la sección de paisajes sube como una cortina sobre el hero fijo, las fotos tienen parallax dentro de su máscara y la noche se abre en un círculo. Solo dos elementos flotan sobre el contenido, y son los únicos con sombra.

### Shadow Vocabulary

- **Sombra de cortina** (`box-shadow: 0 -24px 60px rgb(0 0 0 / 0.35)`): borde superior de la sección de paisajes, cuando sube sobre el hero.
- **Sombra flotante** (`shadow-lg` de Tailwind con color `desert-night` al 40 %): la cápsula del navbar.

### Named Rules

**The Curtain Rule.** Una sección clara que entra sobre una oscura lo hace como cortina: esquinas superiores redondeadas, sombra hacia arriba y `z-index` por encima. Nunca hay capas que oscurecen el hero hasta un color sólido ni cortes rectos entre claro y oscuro.

**The Real Horizon Rule.** El paso de una sección clara a la noche es el horizonte real del Valle de la Luna: la silueta de sus rocas, con la aguja de sal, extraída de la foto de la noche (`Horizon.astro`). Sube desde la noche sobre el arena en `desert-night`, sin sombra, sin degradado y sin esquinas. Mide `--horizon-height` (6rem, 9.5rem desde `sm`, 12.5rem desde `lg`), que la sección clara suma a su relleno inferior. Todo contorno orgánico sale de una imagen real, nunca de una forma geométrica inventada.

## Shapes

Las formas son suaves y simples: rectángulos con esquinas redondeadas para las fotos y cápsulas para lo interactivo.

- **Cápsula** (radio completo): el botón principal, el navbar y los enlaces del navbar.
- **Foto** (16px): fotos de capítulos, tarjetas de atractivos y la portada de la página de detalle.
- **Cortina** (32px, 48px desde `sm`): solo las esquinas superiores de la sección de paisajes.
- **Recortes de revelado:** las fotos se descubren con `clip-path`. En los capítulos es un `inset` que se abre desde abajo, la izquierda o la derecha, en ese ciclo y nunca desde arriba. En los atractivos es un `inset` desde abajo con esquinas de 16px. En la noche es un `circle` centrado en el cielo (50 % 40 %).

## Components

### Buttons

Hay un solo botón relleno en todo el sitio: "Explorar", en el hero. Todo lo demás son enlaces.

- **Shape:** cápsula (radio completo).
- **Primary:** fondo pasto dorado y texto sombra del desierto, peso 500, 12px × 24px de relleno.
- **Hover / Focus:** el fondo pasa a arena clara con transición de color. El foco es el anillo dorado global (2px, separación 4px).

### Links

- **Leer su historia:** texto chico en `desert-night` con subrayado de 1px en dorado y 4px de separación. La flecha avanza 4px en hover.
- **Pie:** texto cielo rosado que pasa a dorado en hover.
- **Página de detalle:** el enlace de volver va en dorado y se subraya en hover.

### Cards / Containers

- **Capítulo de paisaje:** sin caja ni fondo. Es una composición de número, título, metadatos, introducción y enlace junto a una foto 4:3 (5:4 desde `lg`) con esquinas de 16px.
- **Tarjeta de atractivo:** sin borde ni sombra. Foto cuadrada con esquinas de 16px y fondo `desert-night` al 5 % mientras carga, seguida de ubicación, título, resumen y hasta 3 datos. Los datos van en una grilla de 3 columnas separada por una línea `desert-night` al 10 %.

### Navigation

- **Style:** cápsula centrada y fija arriba (a 16px), con fondo `desert-night` al 60 %, desenfoque de fondo, borde cielo rosado al 30 % y sombra flotante.
- **Links:** texto arena en cápsulas internas de 8px × 16px. En hover, el texto pasa a dorado y el fondo a cielo rosado al 15 %.
- **Behavior:** entra después de la animación del hero, se oculta al bajar (pasados 200px) y reaparece al subir.
- **Mobile:** la misma cápsula, sin menú desplegable (solo hay dos enlaces).

### Altitude Ladder (componente propio)

Responde con datos "¿En qué orden conviene visitar los paisajes?": los paisajes de menor a mayor altitud, leídos de la colección (`altitudeMeters`), nunca escritos a mano.

- **Fila:** número de orden (`desert-night` al 70 %), nombre con enlace a su página y altitud con `formatAltitude` y `tabular-nums`; debajo, un carril de 12px en `desert-night` al 10 % con la barra en `desert-night` al 80 %, recta en la base y con 4px de radio en el extremo.
- **Escala:** desde el nivel del mar hasta 4.500 m, para que el largo de cada barra sea proporcional a su altitud. Una sola serie, un solo color.
- **Umbral:** una marca punteada en `desert-night` al 50 % a los 4.000 m, dibujada solo sobre los carriles para no cruzar el texto, explicada en el pie del gráfico. Es el único caso en que se usa una línea punteada.
- **Movimiento:** las barras crecen de izquierda a derecha (`scaleX`, `mask` 0,9 s, `staggerBlock`), de la más baja a la más alta, una sola vez. Con reduced motion aparecen completas con un fundido.
- **Accesibilidad:** es una lista ordenada con texto; las barras son `aria-hidden`, porque la altitud ya está escrita en cada fila.

### Footer

Fondo sombra del desierto y texto cielo rosado, sin animación. Tres columnas desde `sm`: nombre y ubicación, "Explorar" y "Paisajes". Los títulos de columna van en arena. Abajo, separado por una línea cielo rosado al 20 %, van el año y "Creado por".

### Chapter Reveal (componente propio)

Es la firma del sitio. La foto se descubre con una máscara (`inset`, `mask` 0,9 s, `expo.inOut`) y, dentro de ella, la imagen hace parallax (±8 %) mientras se recorre. Casi a la vez entran el número (sube `rise` 16px), el título y la introducción por líneas con máscara (SplitText, `text` 0,6 s, `expo.out`), los metadatos con un fundido y el enlace desde la izquierda: todo legible en 1 s. Se dispara una sola vez, cuando el capítulo llega al 80 % de la ventana.

### Photo Credit (componente propio)

Toda foto lleva su crédito dentro de la imagen, abajo a la derecha (`PhotoCredit.astro`): "Foto: autor · licencia", con enlaces a la fuente y a la licencia. Texto `credit` (13px) en arena al 90 % sobre un degradado de `desert-night` al 70 % que sube desde el borde inferior, así se lee sobre cualquier foto. Los datos salen del campo `coverCredit` de cada ficha (obligatorio en el esquema). En la noche va fuera del círculo, porque en móvil el círculo no alcanza la esquina inferior.

### Night Reveal (componente propio)

El último capítulo de la bitácora. Un escenario queda fijo tres pantallas de scroll (cuatro en móvil), con capas de resplandor de atardecer, cielo de estrellas en canvas, la foto y las notas de campo.

1. **Entrada:** la noche empieza en el horizonte real del Valle de la Luna, que sube sobre Atractivos; mientras la sección sube, aparece un resplandor `dusk` en el horizonte (del 30 % abajo a transparente arriba) y salen las estrellas del canvas, primero las más brillantes, como al oscurecer.
2. **Título y foto:** terminan de salir las estrellas, el resplandor se apaga y el título aparece letra por letra con desenfoque (de 10px a 0). La foto se abre en un círculo desde el centro del cielo, de 0 % a 75 %, con un zoom de 1.4 a 1, y tapa el canvas. El crédito aparece cuando la foto ya está abierta.
3. **Lo que se ve:** la foto baja al 35 % con una capa `desert-night`, el título se apaga (solo opacidad: el `h2` sigue para lectores de pantalla) y aparece una copia chica arriba a la izquierda. Entran las notas de campo (ver Sky Notes).
4. **Salida:** notas y título se apagan, la capa llega al 55 % (la foto sigue apenas visible, nunca una pantalla negra) y un degradado funde la mitad inferior con `desert-night`.
5. **Cierre "Cuándo mirar el cielo":** en flujo normal, sobre el mismo `desert-night`. Titular, una entrada y tres consejos (Sin Luna, En invierno, Con abrigo) en tres columnas desde `md`, separados por una línea `dusk` al 30 %. Aparece como los capítulos (`text`, `staggerBlock`, una vez); su trigger se calcula después del escenario fijo (`refreshPriority: -1`).

### Sky Notes (componente propio)

Notas de campo ancladas a objetos reales de la foto (Vía Láctea, Gran Nube de Magallanes, la formación de sal). Cada una tiene un marcador (círculo de 7px, trazo `sand` al 90 %), una línea fina (`sand` al 60 %) que se dibuja con `stroke-dashoffset` y la nota: número en dorado (300), nombre (600, 1.125rem) y texto en `sand` al 85 %, con 270px de ancho máximo.

- Las posiciones son fracciones de la foto original y `coverPoint` (`src/lib/cover.ts`) las lleva a píxeles según el recorte de `object-fit: cover`. Se recalculan al redimensionar. Si una nota no cabe, se pega al margen de 20px.
- **Escritorio (≥ 768px):** las tres notas se acumulan junto a su objeto, una cada 0,45 del recorrido.
- **Móvil:** marcadores numerados sobre la foto y una sola nota a la vez en una franja abajo; cada una se lee unos 360–420px de scroll.
- **Reduced motion:** sin escenario fijo; la foto queda abierta con las notas visibles (en móvil, en lista con texto más chico) y el título chico arriba.
- **Sin JS:** las notas y el título chico no se muestran, porque sus posiciones dependen del script.

Las estrellas del canvas (`src/lib/starfield.ts`) tienen un núcleo nítido con halo suave y parpadean cada una a su ritmo. La mayoría son arena; unas pocas son dorado claro, cielo rosado o el celeste pálido del cielo del hero. El cielo gira apenas con el scroll alrededor de un punto bajo el horizonte. En dispositivos con mouse, las estrellas se apartan suavemente del cursor (radio 140px). GSAP anima los valores y el canvas solo los dibuja con `gsap.ticker`, y únicamente mientras está en pantalla. Con reduced motion no se crea el canvas: la foto queda abierta desde el inicio.

## Do's and Don'ts

### Do:

- **Do** sacar todo color de los cuatro tokens (`desert-night`, `sand`, `gold`, `dusk`) y de sus opacidades.
- **Do** usar fondo arena y texto sombra del desierto en las secciones de lectura.
- **Do** dejar ocultos con `data-reveal` los elementos que GSAP va a revelar, y mostrarlos siempre con `autoAlpha`.
- **Do** poner todo lo que use SplitText dentro de `afterFonts`, para que mida con la fuente final.
- **Do** dar a cada animación una alternativa con `prefers-reduced-motion`: el contenido nunca depende de que la animación se ejecute.
- **Do** usar `ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`) o `expo.out` en las entradas, y `expo.inOut` en las máscaras.
- **Do** cargar todas las fotos con `<Picture>` en AVIF y WebP, con `widths` y `sizes` reales. Solo el hero va con `eager` y `fetchpriority="high"`.
- **Do** usar solo fotos con autor y licencia conocidos, y mostrar su crédito con `PhotoCredit` dentro de la imagen.

### Don't:

- **Don't** poner precios, reservas, horarios ni botones de compra: no es una agencia.
- **Don't** usar texto dorado chico sobre fondo arena.
- **Don't** poner etiquetas en mayúsculas sobre los títulos ("PAISAJES" sobre "6 lugares del Desierto de Atacama"): repiten lo que ya dice el título y sobre foto no se leen.
- **Don't** parchar las máscaras de SplitText con padding ni subir el interlineado para que no corten letras: se usa `data-split-mask`.
- **Don't** descubrir una foto de capítulo desde arriba.
- **Don't** oscurecer el hero hasta un color sólido antes de la siguiente sección.
- **Don't** agregar íconos decorativos al azar a los costados de los paisajes.
- **Don't** usar secuencias de imágenes por frame ni fotos verticales que se desplazan en el hero.
- **Don't** poner sombras en tarjetas o fotos: la profundidad viene del scroll.
