'use client'

import { useEffect, useRef } from 'react'

const COUNT = 3600
const SIZE_MIN = 2
const SIZE_MAX = 4.5
const OPACITY_MIN = 0.4
const OPACITY_MAX = 0.88
const FLEE_RADIUS = 180
const MAX_FLEE = 56
// 0.12s ease-out transition o'rniga har kadrda shu ulush bilan yaqinlashadi
const EASE = 0.25

function seed(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function getFlee(mouseX: number, mouseY: number, basePx: number, basePy: number) {
  const dx = basePx - mouseX
  const dy = basePy - mouseY
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist >= FLEE_RADIUS || dist < 2) return { x: 0, y: 0 }
  const t = 1 - dist / FLEE_RADIUS
  const strength = t * t * MAX_FLEE
  const n = dist
  return {
    x: (dx / n) * strength,
    y: (dy / n) * strength,
  }
}

const particles = Array.from({ length: COUNT }, (_, i) => ({
  left: seed(i * 7),
  top: seed(i * 13 + 1),
  radius: (SIZE_MIN + seed(i * 17 + 2) * (SIZE_MAX - SIZE_MIN)) / 2,
  opacity: OPACITY_MIN + seed(i * 23 + 3) * (OPACITY_MAX - OPACITY_MIN),
}))

export function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const offsets = new Float32Array(COUNT * 2)
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      schedule()
    }

    const draw = () => {
      raf = 0
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#fff'
      let moving = false
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i]
        const basePx = p.left * w
        const basePy = p.top * h
        const target = getFlee(mouse.x, mouse.y, basePx, basePy)
        const ox = offsets[i * 2] + (target.x - offsets[i * 2]) * EASE
        const oy = offsets[i * 2 + 1] + (target.y - offsets[i * 2 + 1]) * EASE
        if (Math.abs(target.x - ox) > 0.1 || Math.abs(target.y - oy) > 0.1) moving = true
        offsets[i * 2] = ox
        offsets[i * 2 + 1] = oy
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(basePx + ox, basePy + oy, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      // Zarralar joyiga tushgach animatsiya to'xtaydi — bo'sh turganda CPU sarflanmaydi
      if (moving) schedule()
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      schedule()
    }

    resize()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden
    />
  )
}
