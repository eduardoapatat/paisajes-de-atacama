type Size = { width: number; height: number }
type Point = { x: number; y: number }

/**
 * Convierte un punto de una foto (en fracciones de 0 a 1 del original) a
 * píxeles dentro de su caja, replicando `object-fit: cover` con
 * `object-position`. Sirve para anclar marcadores a algo que se ve en la foto
 * (una estrella, una roca) en cualquier tamaño de pantalla.
 */
export function coverPoint(box: Size, natural: Size, position: Point, point: Point): Point {
  const scale = Math.max(box.width / natural.width, box.height / natural.height)
  const width = natural.width * scale
  const height = natural.height * scale
  const offsetX = (box.width - width) * position.x
  const offsetY = (box.height - height) * position.y
  return { x: offsetX + point.x * width, y: offsetY + point.y * height }
}
