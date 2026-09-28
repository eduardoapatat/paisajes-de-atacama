import { defineCollection, reference } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const tours = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tours' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(180),
      order: z.number().int(),
      featured: z.boolean().default(false),
      // Opcional hasta que existan las fotos en src/assets/images/tours/
      cover: image().optional(),
      coverAlt: z.string().optional(),
      priceCLP: z.number().int().positive(),
      durationHours: z.number().positive(),
      startTime: z.string(),
      difficulty: z.enum(['baja', 'media', 'alta']),
      minAge: z.number().int().nonnegative(),
      maxGroup: z.number().int().positive(),
      altitudeMeters: z.number().int().nonnegative(),
      location: z.string(),
      includes: z.array(z.string()).min(1),
      bring: z.array(z.string()).default([]),
    }),
})

const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    origin: z.string(),
    tour: reference('tours'),
    rating: z.number().int().min(1).max(5),
    quote: z.string(),
    date: z.coerce.date(),
  }),
})

const faqs = defineCollection({
  loader: file('src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    category: z.enum(['reservas', 'experiencia', 'clima', 'logistica']),
    question: z.string(),
    answer: z.string(),
  }),
})

export const collections = { tours, testimonials, faqs }
