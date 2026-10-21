import { gsap } from '@/lib/gsap'

/**
 * Cielo de estrellas dibujado en un canvas 2D. No se anima solo: GSAP cambia
 * los valores de `state` con el scroll y el canvas los dibuja en cada cuadro
 * de `gsap.ticker`. Solo dibuja mientras el canvas está en pantalla.
 */

type Star = {
  x: number // posición relativa (0 a 1)
  y: number
  size: number // radio del núcleo en px
  alpha: number
  threshold: number // fracción visible desde la que aparece: las brillantes primero
  color: string
  phase: number
  rate: number
  ox: number // desplazamiento actual por el cursor
  oy: number
}

export type StarfieldState = {
  /**
   * Fracción del cielo visible (0 sin estrellas, 1 todas), repartida en dos
   * tramos para que cada ScrollTrigger anime su propio valor sin pisarse:
   * se dibuja la suma de ambos.
   */
  revealEnter: number
  revealPin: number
  /** Giro del cielo en radianes alrededor de un punto bajo el horizonte */
  spin: number
  /** Opacidad general */
  opacity: number
}

// Colores en RGB tomados de la paleta: arena, dorado claro, cielo rosado y el
// celeste pálido del cielo del hero. La mayoría son arena.
const COLORS = [
  { rgb: '245, 238, 230', weight: 0.7 },
  { rgb: '240, 214, 160', weight: 0.12 },
  { rgb: '217, 162, 147', weight: 0.08 },
  { rgb: '205, 214, 232', weight: 0.1 },
]

const SPRITE_SIZE = 64
const HALO = 5 // el halo mide 5 veces el radio del núcleo
const FADE = 0.08 // margen de fracción visible en el que cada estrella pasa de 0 a su brillo
const POINTER_RADIUS = 140
const POINTER_PUSH = 14

function pickColor() {
  let r = Math.random()
  for (const color of COLORS) {
    if ((r -= color.weight) <= 0) return color.rgb
  }
  return COLORS[0].rgb
}

// Un sprite por color: núcleo nítido con halo suave, dibujado una sola vez
function createSprite(rgb: string) {
  const sprite = document.createElement('canvas')
  sprite.width = sprite.height = SPRITE_SIZE
  const ctx = sprite.getContext('2d')!
  const c = SPRITE_SIZE / 2
  const gradient = ctx.createRadialGradient(c, c, 0, c, c, c)
  gradient.addColorStop(0, `rgba(${rgb}, 1)`)
  gradient.addColorStop(0.16, `rgba(${rgb}, 0.9)`)
  gradient.addColorStop(0.3, `rgba(${rgb}, 0.22)`)
  gradient.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
  return sprite
}

export function createStarfield(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const sprites = new Map(COLORS.map(({ rgb }) => [rgb, createSprite(rgb)]))
  const state: StarfieldState = { revealEnter: 0, revealPin: 0, spin: 0, opacity: 1 }
  const pointer = { x: 0, y: 0, active: false }

  let width = 0
  let height = 0
  let stars: Star[] = []
  let running = false

  function createStars() {
    // Densidad según el área: ~420 en escritorio, ~110 en móvil
    const count = Math.round(Math.min(420, (width * height) / 3000))
    stars = Array.from({ length: count }, () => {
      // La mayoría son tenues y pocas brillantes, como en un cielo real
      const brightness = Math.pow(Math.random(), 3)
      return {
        x: Math.random(),
        y: Math.random(),
        size: 0.45 + brightness * 1.3,
        alpha: 0.35 + brightness * 0.65,
        threshold: Math.min(Math.max(1 - brightness + (Math.random() - 0.5) * 0.15, 0), 1 - FADE),
        color: pickColor(),
        phase: Math.random() * Math.PI * 2,
        rate: 0.6 + Math.random() * 1.6,
        ox: 0,
        oy: 0,
      }
    })
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const changed = Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 1
    width = rect.width
    height = rect.height
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (changed || !stars.length) createStars()
  }

  function draw(time: number) {
    ctx.clearRect(0, 0, width, height)
    const reveal = state.revealEnter + state.revealPin
    if (state.opacity <= 0.01 || reveal <= 0) return

    // El cielo gira alrededor de un punto bajo el horizonte
    const pivotX = width / 2
    const pivotY = height * 1.4
    const cos = Math.cos(state.spin)
    const sin = Math.sin(state.spin)

    for (const star of stars) {
      const visible = (reveal - star.threshold) / FADE
      if (visible <= 0) continue

      const dx = star.x * width - pivotX
      const dy = star.y * height - pivotY
      const baseX = pivotX + dx * cos - dy * sin
      const baseY = pivotY + dx * sin + dy * cos

      // El cursor aparta suavemente las estrellas cercanas
      let targetX = 0
      let targetY = 0
      if (pointer.active) {
        const px = baseX - pointer.x
        const py = baseY - pointer.y
        const distance = Math.hypot(px, py)
        if (distance < POINTER_RADIUS && distance > 0) {
          const force = Math.pow(1 - distance / POINTER_RADIUS, 2) * POINTER_PUSH
          targetX = (px / distance) * force
          targetY = (py / distance) * force
        }
      }
      star.ox += (targetX - star.ox) * 0.1
      star.oy += (targetY - star.oy) * 0.1

      const twinkle = 0.78 + 0.22 * Math.sin(time * star.rate + star.phase)
      const halo = star.size * HALO
      ctx.globalAlpha = Math.min(visible, 1) * star.alpha * twinkle * state.opacity
      ctx.drawImage(
        sprites.get(star.color)!,
        baseX + star.ox - halo,
        baseY + star.oy - halo,
        halo * 2,
        halo * 2,
      )
    }
    ctx.globalAlpha = 1
  }

  const tick = (time: number) => draw(time)

  function start() {
    if (running) return
    running = true
    gsap.ticker.add(tick)
  }

  function stop() {
    if (!running) return
    running = false
    gsap.ticker.remove(tick)
  }

  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) start()
    else stop()
  })
  visibility.observe(canvas)

  const sizeObserver = new ResizeObserver(() => resize())
  sizeObserver.observe(canvas)

  // El cursor solo afecta en dispositivos con mouse
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const section = canvas.parentElement!
  const onMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    pointer.x = event.clientX - rect.left
    pointer.y = event.clientY - rect.top
    pointer.active = true
  }
  const onLeave = () => {
    pointer.active = false
  }
  if (finePointer) {
    section.addEventListener('pointermove', onMove)
    section.addEventListener('pointerleave', onLeave)
  }

  resize()

  return {
    state,
    destroy() {
      stop()
      visibility.disconnect()
      sizeObserver.disconnect()
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      ctx.clearRect(0, 0, width, height)
    },
  }
}
