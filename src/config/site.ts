/**
 * Datos del sitio. Único lugar para cambiar nombre, eslogan y contacto.
 */
export const site = {
  name: 'Paisajes de Atacama',
  tagline: 'Valles, salares, lagunas y géiseres del norte de Chile',
  description:
    'Un recorrido por los paisajes del Desierto de Atacama: el Valle de la Luna, las lagunas altiplánicas, los géiseres del Tatio y otros lugares únicos del norte de Chile.',
  locale: 'es-CL',
  author: 'Eduardo Apata Tito',
  location: {
    name: 'Desierto de Atacama',
    region: 'Región de Antofagasta',
    country: 'Chile',
  },
  contact: {
    email: 'hola@paisajesdeatacama.cl',
  },
  social: {
    instagram: 'https://www.instagram.com/paisajesdeatacama',
  },
} as const

export type Site = typeof site
