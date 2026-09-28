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
  /**
   * Ejecuta `fn` cuando la fuente terminó de cargar (necesario para SplitText).
   * Lo que se cree dentro se revierte junto con el resto de la sección.
   */
  afterFonts: (fn: () => void) => void
}

/**
 * Ejecuta las animaciones de una sección respetando prefers-reduced-motion.
 * Si el usuario cambia la preferencia, GSAP revierte y vuelve a ejecutar
 * el setup con el valor nuevo. Devuelve el matchMedia para poder revertirlo.
 */
export function animate(scope: Element, setup: (ctx: MotionContext) => void | (() => void)) {
  const mm = gsap.matchMedia(scope)

  // matchMedia solo ejecuta el setup si alguna condición se cumple:
  // con las dos queries opuestas siempre se ejecuta
  mm.add({ motionOk: MOTION_OK, reduceMotion: MOTION_REDUCED }, (context) => {
    const { reduceMotion } = context.conditions as { reduceMotion: boolean }
    let active = true

    const afterFonts = (fn: () => void) => {
      document.fonts.ready.then(() => {
        if (active) context.add(fn)
      })
    }

    const cleanup = setup({ reduceMotion, afterFonts })

    return () => {
      active = false
      cleanup?.()
    }
  })

  return mm
}

export { gsap, ScrollTrigger, SplitText }
