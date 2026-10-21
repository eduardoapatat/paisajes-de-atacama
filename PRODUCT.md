# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos públicos con el mismo peso:

- **Reclutadores y clientes** que evalúan a Eduardo Apata Tito como desarrollador frontend. Recorren el sitio en pocos minutos, normalmente en escritorio, y juzgan la ejecución: estructura en Astro, rendimiento, accesibilidad y calidad de las animaciones.
- **Viajeros curiosos** que piensan ir al Desierto de Atacama, o que solo quieren conocerlo, y buscan saber qué lugares hay, cómo son y cuándo conviene ir. Suelen entrar desde el móvil.

El sitio tiene que convencer al primero y servirle de verdad al segundo. Si el contenido no es útil para un viajero, el portafolio pierde credibilidad.

## Product Purpose

Landing page estática que cuenta los paisajes del Desierto de Atacama (norte de Chile) como un relato por capítulos. Existe como pieza de portafolio: demuestra dominio de Astro (colecciones de contenido, rutas dinámicas, componentes, optimización de imágenes) y de animaciones profesionales con GSAP.

El sitio funciona si un reclutador termina el recorrido con una impresión clara de oficio y un viajero sale sabiendo qué ver, dónde queda y cuándo ir.

## Positioning

No es una agencia ni una guía comercial: no tiene precios, reservas, horarios ni botones de compra. Es un relato editorial sobre lugares reales y verificables, construido como demostración técnica. Por eso cuenta y muestra, en lugar de vender.

## Operating Context

- Se lee de forma lineal, con scroll, como un relato: hero, capítulos de paisajes, otros lugares, la noche y el pie.
- Cada paisaje tiene una página de detalle en `/paisajes/[slug]` con la historia completa. Por ahora es provisional.
- Hay preguntas "Antes de viajar" (clima, altura, preparación) en `src/content/faqs.json`, pero todavía no tienen sección.

## Capabilities and Constraints

- Sitio estático en Astro 7, sin frameworks de UI.
- Animaciones con GSAP (ScrollTrigger y SplitText). Siempre respetan `prefers-reduced-motion`.
- Contenido en colecciones de Astro: `paisajes` (6 lugares), `atractivos` (por ahora La Mano del Desierto) y `faqs`.
- Todo el contenido está en español (locale `es-CL`) y debe ser realista y verificable. Nada de lorem ipsum.
- Nombre, eslogan y ubicación viven solo en `src/config/site.ts`.
- Por decidir:
  - si los atractivos tienen página propia;
  - el diseño de la página de detalle;
  - la sección "Antes de viajar".

## Brand Commitments

- Nombre: **Paisajes de Atacama**.
- Eslogan actual: "Valles, salares, lagunas y géiseres del norte de Chile".
- Autor visible: Eduardo Apata Tito, en el crédito "Creado por" del pie.
- Voz: informativa y serena, en español neutro de Chile.
- No se inventan nombres, eslóganes, frases de marketing ni temas culturales que el autor no haya pedido.

## Evidence on Hand

- Textos de 6 paisajes y 1 atractivo, con ubicación y altitud reales: `src/content/`.
- 10 preguntas frecuentes reales: `src/content/faqs.json`.
- 9 fotos en `src/assets/images/`.
  - Vienen de Unsplash y otras páginas. **No se conservan los créditos.**
  - Decisión abierta: reemplazarlas por fotos con autor y licencia conocidos, guardando los créditos en los datos y en el README.
- **Datos que no existen:**
  - El correo `hola@paisajesdeatacama.cl` y el Instagram `@paisajesdeatacama` de `site.ts` son de relleno. No se muestran ni se enlazan.
  - No hay testimonios, cifras de visitas, prensa ni clientes. No se inventan.

## Product Principles

1. **Relato antes que catálogo.** Cada lugar se cuenta: cómo se formó, qué se ve y cuándo ir.
2. **Verdad verificable.** Toda cifra, ubicación o dato práctico tiene que poder comprobarse. Si falta un dato, se pregunta.
3. **La técnica se nota en el oficio, no en el ruido.** El movimiento y el rendimiento demuestran dominio cuando sirven al relato, no cuando lo tapan.
4. **Útil para quien viaja.** Lo práctico (clima, altura, época) tiene que ser fácil de encontrar.

## Accessibility & Inclusion

- Respetar `prefers-reduced-motion`: el contenido nunca depende de que una animación se ejecute.
- Foco visible en todos los elementos interactivos.
- Texto alternativo descriptivo y obligatorio en todas las fotos (`coverAlt`).
