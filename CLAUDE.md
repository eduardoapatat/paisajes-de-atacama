## Proyecto

**Paisajes de Atacama**: landing page estática de portafolio que muestra los paisajes y lugares del Desierto de Atacama (norte de Chile) contados como un relato. No es una agencia: no hay precios, reservas, horarios ni botones de compra.

Objetivo del portafolio: demostrar dominio de Astro (colecciones de contenido, rutas dinámicas, componentes, optimización de imágenes) y animaciones profesionales con GSAP.

- Repositorio: https://github.com/eduardoapatat/paisajes-de-atacama (público, rama `main`).
- Nombre del proyecto y de la carpeta local: `paisajes-de-atacama`.

## Stack

- Astro 7 (sitio estático), TypeScript estricto.
- Tailwind CSS 4 con tokens propios en `@theme` (se decidió mantener Tailwind).
- GSAP 3 con ScrollTrigger y SplitText (plugins gratuitos incluidos en el paquete `gsap`).
- Fuente única: Outfit variable, cargada con la API de fuentes de Astro (Fontsource).
- `sharp` para optimizar imágenes. Gestor de paquetes: pnpm.
- Sin frameworks de UI: solo componentes `.astro`.

## Forma de trabajo

- El diseño se construye sección por sección; el usuario indica qué sección sigue y cómo la quiere.
- Cada sección es su propio componente con su animación GSAP dentro, respetando `prefers-reduced-motion`.
- Antes de cambios grandes, proponer un plan breve y esperar confirmación.
- Todo el contenido en español, realista y verificable. Nada de lorem ipsum.
- No inventar nombre, eslogan, frases de marketing ni temas culturales que el usuario no pidió. Si falta texto, usar algo neutro o preguntar.
- No crear archivos README ni documentación para explicar fotos: los datos de fotos (nombre, tamaño, carpeta) se dan en el chat.
- No generar ni descargar imágenes: el usuario las consigue y las sube.

## Estructura y convenciones

- `src/components/`: todos los componentes y secciones directo aquí, **sin subcarpetas**.
- `src/assets/images/`: todas las fotos directo aquí, **sin subcarpetas**. Astro las optimiza con `<Picture>` (AVIF/WebP).
- Imports con el alias `@/` (apunta a `src/`, definido en `tsconfig.json`).
- `src/config/site.ts`: único lugar para nombre, eslogan, ubicación y contacto.
- `src/lib/gsap.ts`: registra plugins y exporta el helper `animate(scope, setup)`.
  - Usa `gsap.matchMedia` con dos condiciones opuestas (`motionOk` y `reduceMotion`) para que el setup se ejecute siempre; con una sola condición no corre cuando las animaciones están activadas.
  - `setup` recibe `reduceMotion` y `afterFonts(fn)`: todo lo que use SplitText va dentro de `afterFonts` para medir con la fuente final.
  - `MOTION`: tokens de duración, curva, escalonado y distancia (ver "Motion" en `DESIGN.md`). Ninguna animación usa números sueltos; lo que se lee queda legible en 1 s o menos.
  - `fadeIn(targets)`: aparición con reduced motion (solo opacidad, 0,2 s). Con reduced motion las secciones la usan en vez de no animar nada.
- Elementos con `data-reveal` quedan ocultos por CSS (solo con JS y sin reduced motion) hasta que GSAP los muestra con `autoAlpha`. Respaldo en `global.css`: si GSAP no corre, se muestran a los 3 s. Por eso cada sección debe fijar sus estados iniciales al arrancar (con `fromTo` o `set`), no recién al entrar en pantalla.
- `src/lib/format.ts`: `formatAltitude` y `formatChapter`.
- `src/lib/starfield.ts`: cielo de estrellas en canvas 2D. GSAP anima su `state` (`revealEnter`, `revealPin`, `spin`, `opacity`) y el canvas lo dibuja con `gsap.ticker` solo mientras está en pantalla. Cada ScrollTrigger anima su propio valor para no pisarse.

## Diseño

Paleta cálida sacada de la foto del hero (tokens en `src/styles/global.css`):

| Token          | Color     | Uso                                         |
| -------------- | --------- | ------------------------------------------- |
| `desert-night` | `#1a1411` | Fondo oscuro y texto sobre fondos claros    |
| `sand`         | `#f5eee6` | Texto claro y fondo de secciones de lectura |
| `gold`         | `#e2a93b` | Acento: botones, etiquetas, números         |
| `dusk`         | `#d9a293` | Bordes y detalles                           |

- Secciones de lectura (Paisajes, Atractivos): fondo `sand` y texto `desert-night`. El dorado solo en elementos grandes o decorativos (poco contraste en texto chico).
- Tailwind pone `line-height: 1` desde `text-5xl`; los titulares usan `1.1` (en `@theme` y en `h1`–`h4`). Para que la máscara de SplitText no corte acentos ni colas (j, g, q), el elemento dividido lleva `data-split-mask` (`overflow-clip-margin: 0.2em` en `global.css`) y el texto oculto parte desde `MOTION.maskFrom` (`yPercent: 140`). No usar padding en las máscaras ni subir el interlineado.

## Contenido (colecciones en `src/content.config.ts`)

- `paisajes` (`src/content/paisajes/*.md`): 6 lugares. Campos: `title`, `intro`, `order`, `location`, `altitudeMeters`, `cover` (obligatoria), `coverAlt` (obligatorio). El cuerpo cuenta cómo se formó, qué se ve y cuándo ir.
- `atractivos` (`src/content/atractivos/*.md`): lugares que no son paisajes (por ahora La Mano del Desierto). Campos: `title`, `summary`, `order`, `location`, `facts` (hasta 3 pares label/value), `cover` y `coverAlt` obligatorios.
- `faqs` (`src/content/faqs.json`): preguntas "Antes de viajar" (clima, altura, preparación). Aún no tienen sección.
- Las fotos son obligatorias: si falta un archivo, el build falla con `ImageNotFound`.

## Secciones (en orden en `src/pages/index.astro`)

1. **Navbar** (`Navbar.astro`): cápsula centrada arriba con "Paisajes" y "Antes de viajar". Entra después del hero, se oculta al bajar y reaparece al subir.
2. **Hero** (`Hero.astro`): foto `desert-atacama-hero.jpg` a pantalla completa, título con SplitText por palabras. Al hacer scroll queda fijo sin agregar espacio (`pinSpacing: false`) y la sección siguiente lo tapa como cortina; la foto se acerca un poco y el texto se desvanece.
3. **Paisajes** (`Paisajes.astro`): cortina con esquinas redondeadas y sombra. Capítulos numerados que alternan lado foto/texto. La foto se descubre con clip-path en ciclo desde abajo, izquierda y derecha (nunca desde arriba), con parallax; título e intro suben por líneas.
4. **Atractivos** (`Atractivos.astro`): "Otros lugares para conocer". Tarjetas con foto cuadrada que aparecen de a una (`ScrollTrigger.batch`, escalonadas si entran juntas).
5. **Noche** (`Noche.astro`): "En la noche...". Mientras la sección sube aparecen un resplandor de atardecer y estrellas dibujadas en canvas (`src/lib/starfield.ts`, de las más brillantes a las tenues, se apartan del cursor en escritorio). Sección fija una pantalla de scroll: el título aparece letra por letra con desenfoque y luego la foto `valle-de-la-luna-noche.jpg` (Vía Láctea sobre el Valle de la Luna, P. Horálek/ESO, CC BY 4.0, con crédito visible en la sección) se abre en un círculo desde el centro del cielo. El usuario prefiere esta versión (se probó adelantar el título y se descartó).
6. **Footer** (`Footer.astro`): fondo `desert-night`, texto `dusk` y bordes `dusk/20`, sin animación. Tres columnas: nombre y ubicación, "Explorar" (anclas de secciones; "Antes de viajar" va como texto hasta que exista la sección) y "Paisajes" (enlaces a `/paisajes/[slug]` desde la colección). Abajo, año y "Creado por" con `site.author`.

- **Página `/paisajes/[slug]`**: provisional, muestra la historia completa de cada paisaje. Falta diseñarla.

## Decisiones descartadas

- Tours astronómicos en Arica con precios y reservas (enfoque original).
- Nombres "Wara Wara", "Desert Sky Tours" y "Atacama Expediciones".
- Tarjetas con precio para los paisajes; se cambió a relato por capítulos.
- Hero con secuencia de imágenes por frame y hero con foto vertical desplazándose.
- Capa que oscurecía el hero hasta un color sólido antes de la siguiente sección.
- Íconos decorativos al azar en los costados de los paisajes.

## Pendiente

- Sección "Antes de viajar" (usa la colección `faqs`); en el navbar y el footer "Antes de viajar" va como texto sin enlace; al crearla, darle `id="antes-de-viajar"` y agregar el `href` en `Navbar.astro` y `Footer.astro`.
- Diseñar la página de detalle `/paisajes/[slug]` y decidir si los atractivos tienen página propia o enlace en el navbar.
- `geiseres-del-tatio.jpg` pesa 9 MB (8688 px de ancho); conviene reducirla a unos 3000 px.
- Si el servidor de desarrollo muestra "0 lugares", reiniciarlo: no toma colecciones nuevas en caliente.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
