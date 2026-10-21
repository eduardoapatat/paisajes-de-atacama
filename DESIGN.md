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
    lineHeight: 1.3
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.3
  numeral:
    fontFamily: 'Outfit, sans-serif'
    fontSize: '4.5rem'
    fontWeight: 300
    lineHeight: 1.3
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
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: '0.35em'
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

## Colors

Cuatro colores cálidos del atardecer en el altiplano: dos neutros que se alternan como fondo y texto, un acento dorado y un rosado para los detalles.

### Primary

- **Pasto dorado** (`gold`): el acento. Se usa en el botón principal, en los números de capítulo, en el subrayado de los enlaces "Leer su historia", en la selección de texto y en el anillo de foco. Sobre fondo arena solo va en elementos grandes o decorativos.

### Secondary

- **Cielo rosado** (`dusk`): detalles y bordes. Es el texto del pie, el borde del navbar (al 30 %), los separadores del pie (al 20 %) y el fondo del hover del navbar (al 15 %).

### Neutral

- **Sombra del desierto** (`desert-night`): fondo de los ambientes oscuros y del `body`, y texto en las secciones claras. En las secciones claras el texto secundario usa opacidades: 80 % para párrafos, 60 % para metadatos y etiquetas, 50 % para rótulos de datos y 10 % para separadores.
- **Arena clara** (`sand`): texto sobre fondos oscuros y fotos, y fondo de las secciones de lectura.

### Named Rules

**The One Photo Rule.** Todo color nuevo debe poder encontrarse en la foto del hero. Si no está en el paisaje, no entra en la paleta.

**The Gold Is Big Rule.** Sobre fondo arena, el dorado solo va en elementos grandes o decorativos (números de capítulo, subrayados, el botón). Nunca en texto chico: no tiene contraste suficiente.

**The Opacity Ladder Rule.** La jerarquía del texto en las secciones claras se hace con opacidades de `desert-night` (100, 80, 60 y 50 %), no con grises nuevos.

## Typography

**Display Font:** Outfit (con sans-serif)
**Body Font:** Outfit (con sans-serif)

**Character:** Una sola sans geométrica y variable (100–900), cargada con la API de fuentes de Astro desde Fontsource, con precarga del subconjunto latino. La jerarquía viene del peso y la escala: seminegrita para titulares, light para los números grandes y regular para la lectura.

### Hierarchy

- **Display** (600, 3rem → 4.5rem desde `sm` → 6rem desde `lg`, interlineado 1.3, tracking −0.025em): título del hero y "En la noche...". Uno por pantalla.
- **Headline** (600, 2.25rem → 3rem desde `sm`, 1.3): títulos de sección ("6 lugares del Desierto de Atacama", "Otros lugares para conocer"). Los títulos de capítulo usan la misma voz un poco más grande (1.875rem → 2.25rem → 3rem).
- **Title** (600, 1.5rem, 1.3): título de las tarjetas de atractivos.
- **Numeral** (300, 4.5rem → 6rem desde `sm`, 1.3): números de capítulo en dorado ("01", "02"…). Son decorativos y llevan `aria-hidden`.
- **Body large** (400, 1.125rem, 1.625): introducción de cada capítulo y cuerpo de la página de detalle.
- **Body** (400, 1rem, 1.5): texto general y resúmenes de los atractivos.
- **Meta** (400, 0.875rem): ubicación y altitud, enlaces del pie.
- **Label** (500, 0.75rem → 0.875rem desde `sm`, tracking 0.35em, en mayúsculas): etiquetas sobre los títulos ("PAISAJES", "ATRACTIVOS", "DESIERTO DE ATACAMA · CHILE").

### Named Rules

**The 1.3 Floor Rule.** Ningún titular baja de un interlineado de 1.3, ni siquiera desde `text-5xl`, donde Tailwind pone 1. SplitText recorta las líneas al alto de la línea y un valor menor corta las letras con cola (j, g, q). Se corrige con el token, nunca con padding en la máscara.

**The Balanced Headline Rule.** Los titulares llevan `text-wrap: balance` y los párrafos `text-wrap: pretty`.

## Layout

- **Contenedor:** centrado, con ancho máximo de 1280px y márgenes laterales de 20px, que pasan a 32px desde `sm` (640px). El pie usa un contenedor más estrecho (1152px).
- **Ritmo vertical:** las secciones de lectura tienen 96px de relleno vertical, que pasan a 128px desde `sm`. Entre capítulos hay 112px, que pasan a 160px desde `sm`.
- **Capítulos de paisajes:** en móvil la foto va arriba y el texto debajo, con 40px de separación. Desde `lg` (1024px) es una grilla de 12 columnas: foto en 7 y texto en 5, con 64px de separación. El lado de la foto alterna en cada capítulo.
- **Tarjetas de atractivos:** grilla de 1 columna, 2 desde `sm` y 3 desde `lg`, con 24px entre columnas y 48px entre filas.
- **Pantallas completas:** hero y noche ocupan `100svh`.

**The One Idea Per Screen Rule.** Cada pantalla de scroll muestra una sola idea: un capítulo, un título o una foto. No se agrupan capítulos ni se comprimen los márgenes para que quepa más.

## Elevation & Depth

El sistema es plano. Las tarjetas y las fotos no llevan sombra. La profundidad viene del scroll: la sección de paisajes sube como una cortina sobre el hero fijo, las fotos tienen parallax dentro de su máscara y la noche se abre en un círculo. Solo dos elementos flotan sobre el contenido, y son los únicos con sombra.

### Shadow Vocabulary

- **Sombra de cortina** (`box-shadow: 0 -24px 60px rgb(0 0 0 / 0.35)`): borde superior de la sección de paisajes, cuando sube sobre el hero.
- **Sombra flotante** (`shadow-lg` de Tailwind con color `desert-night` al 40 %): la cápsula del navbar.

### Named Rules

**The Curtain Rule.** Una sección clara que entra sobre una oscura lo hace como cortina: esquinas superiores redondeadas, sombra hacia arriba y `z-index` por encima. Nunca hay capas que oscurecen el hero hasta un color sólido.

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

### Footer

Fondo sombra del desierto y texto cielo rosado, sin animación. Tres columnas desde `sm`: nombre y ubicación, "Explorar" y "Paisajes". Los títulos de columna van en arena. Abajo, separado por una línea cielo rosado al 20 %, van el año y "Creado por".

### Chapter Reveal (componente propio)

Es la firma del sitio. La foto se descubre con una máscara (`inset`, 1.2 s, `expo.inOut`) y, dentro de ella, la imagen hace parallax (±8 %) mientras se recorre. Después entran el número (sube 40px), el título y la introducción por líneas con máscara (SplitText, `expo.out`), los metadatos con un fundido y el enlace desde la izquierda. Se dispara una sola vez, cuando el capítulo llega al 70 % de la ventana.

### Night Reveal (componente propio)

Sección fija durante una pantalla de scroll, en tres capas: resplandor de atardecer, cielo de estrellas en canvas y la foto.

1. **Entrada:** mientras la sección sube, aparece un resplandor `dusk` en el horizonte (del 30 % abajo a transparente arriba) y salen las estrellas del canvas, primero las más brillantes, como al oscurecer.
2. **Tramo fijo:** terminan de salir las estrellas, el resplandor se apaga y el título aparece letra por letra con desenfoque (de 10px a 0).
3. **Foto:** se abre en un círculo desde el centro del cielo, de 0 % a 75 %, con un zoom de 1.4 a 1, y tapa el canvas. El crédito de la foto aparece al final.

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

### Don't:

- **Don't** poner precios, reservas, horarios ni botones de compra: no es una agencia.
- **Don't** usar texto dorado chico sobre fondo arena.
- **Don't** bajar el interlineado de los titulares de 1.3 ni parchar las máscaras de SplitText con padding.
- **Don't** descubrir una foto de capítulo desde arriba.
- **Don't** oscurecer el hero hasta un color sólido antes de la siguiente sección.
- **Don't** agregar íconos decorativos al azar a los costados de los paisajes.
- **Don't** usar secuencias de imágenes por frame ni fotos verticales que se desplazan en el hero.
- **Don't** poner sombras en tarjetas o fotos: la profundidad viene del scroll.
