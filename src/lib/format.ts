import { site } from '@/config/site'

export const formatAltitude = (meters: number) =>
  `${new Intl.NumberFormat(site.locale).format(meters)} m s. n. m.`

export const formatChapter = (index: number) => String(index + 1).padStart(2, '0')
