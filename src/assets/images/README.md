# Imágenes

Todas las fotos van dentro de `src/assets/images/` para que Astro las optimice
(`<Image />` / `<Picture />` generan AVIF/WebP y tamaños responsivos).
Sube siempre el original en JPG de buena calidad; Astro se encarga de comprimir.

| Carpeta         | Uso                                  | Tamaño recomendado            |
| --------------- | ------------------------------------ | ----------------------------- |
| `hero/`         | Fondo de la sección principal        | 2560 × 1440 px (16:9) o mayor |
| `tours/`        | Portada de cada tour (campo `cover`) | 1600 × 1200 px (4:3)          |
| `testimonials/` | Retratos de clientes (opcional)      | 400 × 400 px (1:1)            |
| `gallery/`      | Galería o secciones de apoyo         | 1600 px en el lado mayor      |
| `og/`           | Imagen para compartir en redes       | 1200 × 630 px                 |

## Portadas de tours

Nombra cada foto igual que el archivo del tour y agrégala al frontmatter:

```yaml
cover: ../../assets/images/tours/noche-en-azapa.jpg
coverAlt: Grupo observando la Vía Láctea junto a un telescopio en el Valle de Azapa
```

Cada sección nueva indicará aquí qué foto necesita.
