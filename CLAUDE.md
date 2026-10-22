## Proyecto

**Paisajes de Atacama**: landing page estática de portafolio que muestra los paisajes y lugares del Desierto de Atacama (norte de Chile) contados como un relato. No es una agencia: no hay precios, reservas, horarios ni botones de compra.

Objetivo del portafolio: demostrar dominio de Astro (colecciones de contenido, rutas dinámicas, componentes, optimización de imágenes) y animaciones profesionales con GSAP.

- Repositorio: https://github.com/eduardoapatat/paisajes-de-atacama (público, rama `main`).
- Sitio: https://paisajes-de-atacama.vercel.app (Vercel: cada push a `main` despliega a producción; es el `site` de `astro.config.mjs`).
- `vercel.json`: encabezados de seguridad (CSP, HSTS, `nosniff`, sin iframes, `Referrer-Policy`, `Permissions-Policy`). La CSP solo admite scripts del propio sitio y el script en línea de `BaseLayout.astro` (el que agrega la clase `js`) por su hash `sha256`: si se cambia ese script, aunque sea un espacio, hay que recalcular el hash o el navegador lo bloquea. Nada se carga de otros dominios (fuentes, fotos y scripts son locales); si se agrega algo externo, sumarlo a la CSP.
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
- `src/lib/format.ts`: `formatAltitude`, `formatChapter` y `keepNumbersTogether` (une número y unidad con espacio de no separación: usarlo en todo texto con cifras que venga del contenido).
- `src/lib/starfield.ts`: cielo de estrellas en canvas 2D. GSAP anima su `state` (`revealEnter`, `revealPin`, `spin`, `opacity`) y el canvas lo dibuja con `gsap.ticker` solo mientras está en pantalla. Cada ScrollTrigger anima su propio valor para no pisarse.
- `src/lib/cover.ts`: `coverPoint` convierte un punto de una foto (fracciones del original) a píxeles según `object-fit: cover` y `object-position`. Lo usan las notas de la noche para anclarse a objetos de la foto en cualquier pantalla.

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

- `paisajes` (`src/content/paisajes/*.md`): 6 lugares. Campos: `title`, `intro`, `order`, `location`, `altitudeMeters`, `cover` (obligatoria), `coverAlt` y `coverCredit` (obligatorios). El cuerpo cuenta cómo se formó, qué se ve y cuándo ir.
- `atractivos` (`src/content/atractivos/*.md`): lugares que no son paisajes (por ahora La Mano del Desierto). Campos: `title`, `summary`, `order`, `location`, `facts` (hasta 3 pares label/value), `cover`, `coverAlt` y `coverCredit` obligatorios.
- `faqs` (`src/content/faqs.json`): preguntas "Antes de viajar" (clima, altura, preparación). Las muestra `AntesDeViajar.astro`; la de `id: 'orden-de-visita'` se responde con la escalera de altura y no se repite en los grupos.
- Las fotos son obligatorias: si falta un archivo, el build falla con `ImageNotFound`.
- Toda foto debe tener autor y licencia conocidos. `coverCredit` lleva `author`, `license`, `licenseUrl` y `url` (página de la foto); `PhotoCredit.astro` lo muestra dentro de la imagen, abajo. Los créditos también van en el README. Las fotos de Wikimedia Commons se usan en la versión de hasta 3840 px que publica Commons (no se recomprimen con otras herramientas).

## Secciones (en orden en `src/pages/index.astro`)

1. **Navbar** (`Navbar.astro`): cápsula centrada arriba con "Paisajes" y "Antes de viajar". Entra después del hero, se oculta al bajar y reaparece al subir.
2. **Hero** (`Hero.astro`): foto `desert-atacama-hero.jpg` a pantalla completa, título con SplitText por palabras. Al hacer scroll queda fijo sin agregar espacio (`pinSpacing: false`) y la sección siguiente lo tapa como cortina; la foto se acerca un poco y el texto se desvanece.
3. **Paisajes** (`Paisajes.astro`): cortina con esquinas redondeadas y sombra. Capítulos numerados que alternan lado foto/texto. La foto se descubre con clip-path en ciclo desde abajo, izquierda y derecha (nunca desde arriba), con parallax; título e intro suben por líneas.
4. **Atractivos** (`Atractivos.astro`): "Otros lugares para conocer". Tarjetas con foto cuadrada que aparecen de a una (`ScrollTrigger.batch`, escalonadas si entran juntas).
5. **Antes de viajar** (`AntesDeViajar.astro`, `#antes-de-viajar`): fondo `sand`. La pregunta "¿En qué orden conviene visitar los paisajes?" junto a la escalera de altura (los 6 paisajes de menor a mayor altitud, barras desde el nivel del mar, marca punteada a los 4.000 m, enlaces a cada paisaje); debajo, las demás preguntas de `faqs.json` en tres grupos abiertos (Clima, Altura, Preparación), sin acordeón. Las barras crecen de la más baja a la más alta. Es la sección clara bajo el horizonte de la noche.
6. **Noche** (`Noche.astro`): "En la noche...". Mientras la sección sube aparecen un resplandor de atardecer y estrellas dibujadas en canvas (`src/lib/starfield.ts`, de las más brillantes a las tenues, se apartan del cursor en escritorio). La noche empieza con el horizonte real del Valle de la Luna (`Horizon.astro`: silueta de las rocas con la aguja de sal, extraída de la foto de la noche) que sube sobre Atractivos; su alto es `--horizon-height` en `global.css`. El usuario descartó un borde redondeado con sombra y un degradado arena → `dusk` → noche. Un escenario (`data-noche-stage`) queda fijo tres pantallas (cuatro en móvil): el título aparece letra por letra con desenfoque; la foto `valle-de-la-luna-noche.jpg` (Vía Láctea sobre el Valle de la Luna, P. Horálek/ESO, CC BY 4.0, con crédito visible) se abre en un círculo desde el centro del cielo; después el título pasa chico a la esquina y aparecen tres notas de campo ancladas a la foto (Vía Láctea, Gran Nube de Magallanes, la formación de sal; textos aprobados por el usuario, datos del pie de ESO); al final la foto se funde con `desert-night` y sigue el cierre "Cuándo mirar el cielo" (tres consejos para quien viaja; la temperatura viene de `faqs.json`). En móvil las notas se turnan en una franja abajo. El usuario prefiere el orden título → foto (se probó adelantar el título y se descartó).
7. **Footer** (`Footer.astro`): fondo `desert-night`, texto `dusk` y bordes `dusk/20`, sin animación. Tres columnas: nombre y ubicación, "Explorar" (anclas de las secciones, en el mismo orden que la página; un enlace sin `href` se muestra como texto) y "Paisajes" (enlaces a `/paisajes/[slug]` desde la colección). Abajo, año y "Creado por" con `site.author`.

- **Página `/paisajes/[slug]`**: provisional, muestra la historia completa de cada paisaje. Falta diseñarla.

## Decisiones descartadas

- Tours astronómicos en Arica con precios y reservas (enfoque original).
- Nombres "Wara Wara", "Desert Sky Tours" y "Atacama Expediciones".
- Tarjetas con precio para los paisajes; se cambió a relato por capítulos.
- Hero con secuencia de imágenes por frame y hero con foto vertical desplazándose.
- Capa que oscurecía el hero hasta un color sólido antes de la siguiente sección.
- Íconos decorativos al azar en los costados de los paisajes.

## Pendiente

- Diseñar la página de detalle `/paisajes/[slug]` y decidir si los atractivos tienen página propia o enlace en el navbar.
- La foto del hero (`desert-atacama-hero.jpg`) no tiene crédito: buscar una con autor y licencia conocidos.
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
