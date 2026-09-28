/**
 * Datos de marca y contacto. Único lugar para cambiar nombre, eslogan
 * y formas de contacto en todo el sitio.
 */
export const site = {
  name: 'Desert Sky Tours',
  tagline: 'Tours astronómicos en Arica',
  description:
    'Tours astronómicos en el desierto de Arica y Parinacota: observación con telescopios, astrofotografía y noches en el altiplano con guías locales.',
  locale: 'es-CL',
  location: {
    city: 'Arica',
    region: 'Región de Arica y Parinacota',
    country: 'Chile',
    meetingPoint: 'Plaza Colón, frente a la Catedral San Marcos, Arica',
  },
  contact: {
    email: 'reservas@desertskytours.cl',
    phone: '+56 9 8765 4321',
    // Número en formato internacional sin espacios ni signos, para wa.me
    whatsapp: '56987654321',
    hours: 'Lunes a sábado, de 10:00 a 20:00',
  },
  social: {
    instagram: 'https://www.instagram.com/desertskytours',
    facebook: 'https://www.facebook.com/desertskytours',
    tiktok: 'https://www.tiktok.com/@desertskytours',
  },
} as const

export type Site = typeof site
