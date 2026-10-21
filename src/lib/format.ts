import { site } from '@/config/site'

// Espacio de no separación: el número y su unidad nunca quedan en líneas distintas
const NBSP = ' '

export const formatAltitude = (meters: number) =>
  `${new Intl.NumberFormat(site.locale).format(meters)}${NBSP}m${NBSP}s.${NBSP}n.${NBSP}m.`

/** Une cada número con la palabra que le sigue ("75 km", "11 metros") */
export const keepNumbersTogether = (text: string) => text.replace(/(\d)\s+(?=\S)/g, `$1${NBSP}`)

export const formatChapter = (index: number) => String(index + 1).padStart(2, '0')
