import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Evita recalcular los pin cuando la barra del navegador móvil aparece o se oculta
ScrollTrigger.config({ ignoreMobileResize: true })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'

/**
 * Tokens de movimiento (ver "Motion" en DESIGN.md). Duraciones en segundos.
 * Regla principal: lo que se lee queda legible en 1 s o menos desde que entra.
 */
export const MOTION = {
  /** Navbar y cambios de estado: entrada y salida (la salida, más rápida) */
  ui: 0.25,
  uiExit: 0.2,
  /** Líneas de texto, metadatos y enlaces */
  text: 0.6,
  /** Apertura de una foto con clip-path (barrido que cruza la pantalla) */
  mask: 0.9,
  /** Zoom de asentamiento de una foto dentro de su máscara: no bloquea la lectura */
  settle: 1.4,
  /** Título del hero: momento único al cargar, puede durar más */
  hero: 1.2,
  /** Fundido de aparición con reduced motion: sin desplazamiento */
  fade: 0.2,
  /** Escalonado entre líneas y entre bloques o tarjetas */
  stagger: 0.06,
  staggerBlock: 0.08,
  /** Cuánto sube un bloque al entrar, en px, y cuánto se acerca una foto */
  rise: 16,
  zoom: 1.1,
  /** Entradas: expo.out. Barridos de máscara: expo.inOut. Scroll: none. */
  ease: 'expo.out',
  easeMask: 'expo.inOut',
  /** Punto de la ventana en el que arrancan las apariciones */
  start: 'top 80%',
} as const

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

/**
 * Aparición para reduced motion: solo opacidad, corta y sin desplazamiento.
 * Cada elemento se funde al entrar en pantalla. Llamarla dentro del setup de
 * `animate` para que se revierta si cambia la preferencia.
 */
export function fadeIn(targets: Iterable<Element>) {
  for (const target of targets) {
    gsap.fromTo(
      target,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: MOTION.fade,
        ease: 'power1.out',
        scrollTrigger: { trigger: target, start: MOTION.start, once: true },
      },
    )
  }
}

export { gsap, ScrollTrigger, SplitText }
