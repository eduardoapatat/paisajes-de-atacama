import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Evita recalcular los pin cuando la barra del navegador móvil aparece o se oculta
ScrollTrigger.config({ ignoreMobileResize: true })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

type MotionContext = {
  reduceMotion: boolean
}

/**
 * Ejecuta las animaciones de una sección respetando prefers-reduced-motion.
 * Si el usuario cambia la preferencia, GSAP revierte y vuelve a ejecutar
 * el setup con el valor nuevo. Devuelve el matchMedia para poder revertirlo.
 */
export function animate(scope: Element, setup: (ctx: MotionContext) => void | (() => void)) {
  const mm = gsap.matchMedia(scope)

  mm.add({ reduceMotion: MOTION_REDUCED }, (context) => {
    const { reduceMotion } = context.conditions as MotionContext
    return setup({ reduceMotion })
  })

  return mm
}

export { gsap, ScrollTrigger, SplitText }
