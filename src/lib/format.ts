import { site } from '@/config/site'

const clp = new Intl.NumberFormat(site.locale, {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export const formatPrice = (value: number) => clp.format(value)

export const formatDuration = (hours: number) => {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m ? `${h} h ${m} min` : `${h} h`
}

export const formatAltitude = (meters: number) =>
  `${new Intl.NumberFormat(site.locale).format(meters)} m s. n. m.`
