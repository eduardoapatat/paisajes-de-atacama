# Imágenes

Todas las fotos van directo en `src/assets/images/`, sin subcarpetas, para que
Astro las optimice (`<Image />` / `<Picture />` generan AVIF/WebP y tamaños
responsivos). Sube siempre el original en JPG de buena calidad; Astro se encarga
de comprimir.

| Uso                                  | Tamaño recomendado            |
| ------------------------------------ | ----------------------------- |
| Fondo de la sección principal        | 2560 × 1440 px (16:9) o mayor |
| Portada de cada tour (campo `cover`) | 1600 × 1200 px (4:3)          |
| Retratos de clientes (opcional)      | 400 × 400 px (1:1)            |
| Galería o secciones de apoyo         | 1600 px en el lado mayor      |
| Imagen para compartir en redes       | 1200 × 630 px                 |

## Hero

`milky-way-in-san-pedro-de-atacama.jpg` (2738 × 1825 px). Si la cambias,
actualiza el import en `src/components/Hero.astro` y revisa
`object-[64%_100%]` y `origin-[64%_100%]`, que anclan la foto abajo (solo se recorta la parte superior).

## Portadas de tours

Nombra cada foto igual que el archivo del tour y agrégala al frontmatter:

```yaml
cover: ../../assets/images/noche-en-azapa.jpg
coverAlt: Grupo observando la Vía Láctea junto a un telescopio en el Valle de Azapa
```

Cada sección nueva indicará aquí qué foto necesita.
