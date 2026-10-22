# Paisajes de Atacama

Un recorrido por los paisajes del Desierto de Atacama, en el norte de Chile, contado como un relato: el Valle de la Luna, las lagunas altiplánicas, los géiseres del Tatio y otros lugares del desierto, hasta su cielo de noche.

**Sitio:** [paisajes-de-atacama.vercel.app](https://paisajes-de-atacama.vercel.app)

Es un proyecto personal. Atacama es un lugar que me gusta mucho y que me gustaría visitar algún día, así que este sitio es mi forma de conocerlo antes de ir. No es una agencia de turismo: no hay precios, reservas ni horarios.

También es un proyecto de portafolio para practicar Astro (colecciones de contenido, rutas dinámicas, componentes y optimización de imágenes) y animaciones con GSAP.

## Qué tiene el sitio

- **Portada:** una foto del desierto a pantalla completa que queda fija y se tapa con la sección siguiente, como una cortina.
- **Paisajes:** seis lugares en capítulos numerados. Cada foto se descubre al hacer scroll y cada capítulo lleva a una página con su historia completa.
- **Otros lugares para conocer:** lugares que no son paisajes, como La Mano del Desierto.
- **Antes de viajar:** preguntas sobre clima, altura y preparación, y una escalera de altura con los seis paisajes ordenados de menor a mayor altitud.
- **En la noche:** el horizonte real del Valle de la Luna, un cielo de estrellas dibujado en canvas y una foto de la Vía Láctea con notas sobre lo que se ve en ella.

Todas las animaciones respetan `prefers-reduced-motion`: con movimiento reducido, el contenido aparece con un fundido corto.

## Tecnologías

| Tecnología                                                     | Para qué se usa                                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Astro 7](https://astro.build)                                 | Sitio estático, colecciones de contenido, rutas dinámicas y fotos en AVIF y WebP       |
| TypeScript                                                     | Tipado estricto en componentes, contenido y scripts                                    |
| [Tailwind CSS 4](https://tailwindcss.com)                      | Estilos, con la paleta del sitio como tokens en `@theme`                               |
| [GSAP 3](https://gsap.com)                                     | Animaciones con scroll (ScrollTrigger) y texto dividido en líneas y letras (SplitText) |
| Canvas 2D                                                      | El cielo de estrellas de la noche                                                      |
| [Outfit](https://fontsource.org/fonts/outfit)                  | Tipografía única, cargada con la API de fuentes de Astro                               |
| [sharp](https://sharp.pixelplumbing.com)                       | Optimización de imágenes en el build                                                   |
| [ESLint](https://eslint.org) y [Prettier](https://prettier.io) | Revisión y formato del código                                                          |
| [Vercel](https://vercel.com)                                   | Publicación: cada push a `main` despliega el sitio                                     |
| [GitHub Actions](https://github.com/features/actions)          | Revisión automática: formato, lint y build en cada push y pull request                 |

## Cómo correrlo

Requiere Node 22.12 o superior y [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

El sitio queda en `http://localhost:4321`.

| Comando             | Qué hace                                        |
| :------------------ | :---------------------------------------------- |
| `pnpm dev`          | Servidor de desarrollo                          |
| `pnpm build`        | Genera el sitio estático en `dist/`             |
| `pnpm preview`      | Sirve el build para revisarlo antes de publicar |
| `pnpm lint`         | Revisa el código con ESLint                     |
| `pnpm format:check` | Revisa el formato con Prettier                  |
| `pnpm format`       | Aplica el formato de Prettier                   |

## Estructura

```text
public/              Favicon (el horizonte del Valle de la Luna al atardecer)
src/
├── assets/images/   Fotos (Astro las optimiza al hacer el build)
├── components/      Secciones y componentes .astro, cada uno con su animación
├── config/site.ts   Nombre, descripción y ubicación del sitio
├── content/         Paisajes, otros lugares y preguntas de "Antes de viajar"
├── lib/             GSAP y sus tokens de movimiento, formato de cifras, estrellas
├── pages/           Portada y página de cada paisaje (/paisajes/[slug])
└── styles/          Estilos globales y paleta
```

El sistema de diseño (colores, tipografía, movimiento y componentes) está documentado en [`DESIGN.md`](DESIGN.md).

## Créditos de fotos

| Foto                                                                   | Autor                                                                                                                                    | Licencia                                                               |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `valle-de-la-muerte.jpg`: Atardecer en el Valle de la Muerte (portada) | [Claire Provost](https://commons.wikimedia.org/wiki/File:Atardecer_en_Valle_de_la_Muerte,_Atacama,_Chile.JPG)                            | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.es) |
| `valle-de-la-luna-noche.jpg`: Vía Láctea sobre el Valle de la Luna     | [P. Horálek/ESO](https://www.eso.org/public/images/potw2348a/)                                                                           | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.es)       |
| `valle-de-la-luna.jpg`: Anfiteatro del Valle de la Luna                | [Diego Delso](https://commons.wikimedia.org/wiki/File:Anfiteatro,_Valle_de_la_Luna,_San_Pedro_de_Atacama,_Chile,_2016-02-01,_DD_165.JPG) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es) |
| `lagunas-altiplanicas.jpg`: Laguna Miscanti                            | [Godot13](<https://commons.wikimedia.org/wiki/File:Laguna_Miscanti_(Antofagasta,_Chile)_02.jpg>)                                         | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es) |
| `geiseres-del-tatio.jpg`: Géiseres del Tatio                           | [Diego Delso](https://commons.wikimedia.org/wiki/File:G%C3%A9iseres_del_Tatio,_Atacama,_Chile,_2016-02-01,_DD_51-53_HDR.JPG)             | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es) |
| `piedras-rojas.jpg`: Piedras Rojas                                     | [Diego Jimenez](<https://commons.wikimedia.org/wiki/File:Walking_Through_The_Desert_(Unsplash).jpg>)                                     | [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.es)       |
| `laguna-cejar.jpg`: Laguna Cejar                                       | [Johan Bilien](https://commons.wikimedia.org/wiki/File:Laguna_Cejas.jpg)                                                                 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.es)       |
| `valle-del-arcoiris.jpg`: Valle del Arcoíris                           | [Diego Delso](https://commons.wikimedia.org/wiki/File:Valle_Arcoiris,_R%C3%ADo_Grande,_Chile,_2016-02-05,_DD_26.JPG)                     | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es) |
| `mano-del-desierto.jpg`: La Mano del Desierto                          | [Nicolas Valdes Ortega](https://commons.wikimedia.org/wiki/File:La_Mano_del_Desierto,_Panoramica.jpg)                                    | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es) |

Las fotos de Wikimedia Commons se usan en la versión de hasta 3840 px que publica Commons; en el sitio se recortan para cada formato y se convierten a AVIF y WebP. El crédito de cada foto se muestra dentro de la imagen y vive en el campo `coverCredit` de su ficha de contenido. Cada foto mantiene la licencia de su autor.

## Licencia

El código está bajo la licencia [MIT](LICENSE). Las fotos no: cada una mantiene la licencia de su autor, indicada en la tabla de créditos.

## Autor

Hecho por Eduardo Apata Tito.
