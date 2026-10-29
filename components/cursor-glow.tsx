'use client'

import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      root.style.setProperty('--mouse-x', `${x}%`)
      root.style.setProperty('--mouse-y', `${y}%`)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])
  return null
}
