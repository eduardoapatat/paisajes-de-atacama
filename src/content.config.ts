import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Crédito obligatorio de cada foto: se muestra dentro de la imagen, abajo,
// con enlace a la fuente y a la licencia (las CC BY lo exigen)
const coverCredit = z.object({
  author: z.string(),
  license: z.string(),
  licenseUrl: z.string().url(),
  url: z.string().url(),
})

const paisajes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paisajes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Frase corta que se muestra en el capítulo de la portada
      intro: z.string().max(240),
      order: z.number().int(),
      location: z.string(),
      altitudeMeters: z.number().int().nonnegative(),
      // Foto obligatoria en src/assets/images/ (Astro la optimiza)
      cover: image(),
      coverAlt: z.string(),
      coverCredit,
    }),
})

const atractivos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/atractivos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      order: z.number().int(),
      location: z.string(),
      // Datos cortos que se muestran en la tarjeta (autor, año, altura, etc.)
      facts: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .max(3)
        .default([]),
      // Foto obligatoria en src/assets/images/ (Astro la optimiza)
      cover: image(),
      coverAlt: z.string(),
      coverCredit,
    }),
})

const faqs = defineCollection({
  loader: file('src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    category: z.enum(['clima', 'altura', 'preparacion']),
    question: z.string(),
    answer: z.string(),
  }),
})

export const collections = { paisajes, atractivos, faqs }
