"use client"

import { useTheme } from "@/lib/theme-context"
import { useEffect, useState } from "react"

export function ThemeDecorations() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Halloween Theme Decorations */}
      {theme === "halloween" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Floating pumpkins - reduced on mobile */}
          <div className="animate-float absolute left-[10%] top-[20%] text-4xl opacity-10 md:text-6xl md:opacity-20">
            🎃
          </div>
          <div className="animate-float-delayed absolute right-[15%] top-[40%] hidden text-5xl opacity-15 md:block">
            🎃
          </div>

          {/* Bats - reduced on mobile */}
          <div className="animate-fly absolute right-[25%] top-[15%] text-3xl opacity-15 md:text-4xl md:opacity-25">
            🦇
          </div>
          <div className="animate-fly absolute right-[10%] bottom-[20%] hidden text-3xl opacity-25 md:block">🦇</div>

          {/* Ghosts - hidden on mobile */}
          <div className="animate-float absolute right-[5%] top-[60%] hidden text-5xl opacity-15 md:block">👻</div>
        </div>
      )}

      {/* Diwali Theme Decorations */}
      {theme === "diwali" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Diyas (lamps) - fewer on mobile */}
          <div className="animate-glow absolute left-[15%] top-[25%] text-4xl md:text-5xl">🪔</div>
          <div className="animate-glow-delayed absolute right-[20%] top-[35%] hidden text-5xl md:block">🪔</div>
          <div className="animate-glow absolute right-[15%] bottom-[40%] hidden text-5xl md:block">🪔</div>

          {/* Sparkles - reduced on mobile */}
          <div className="animate-sparkle absolute left-[10%] top-[40%] text-3xl opacity-60 md:text-4xl md:opacity-100">
            ✨
          </div>
          <div className="animate-sparkle absolute right-[10%] bottom-[15%] hidden text-4xl md:block">✨</div>

          {/* Fireworks - hidden on mobile */}
          <div className="animate-burst absolute left-[50%] top-[10%] hidden text-6xl md:block">🎆</div>
        </div>
      )}

      {/* Holi Theme Decorations */}
      {theme === "holi" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Color splashes - reduced opacity and size on mobile */}
          <div className="animate-splash absolute left-[10%] top-[15%] text-5xl opacity-15 md:text-7xl md:opacity-30">
            💜
          </div>
          <div className="animate-splash-delayed absolute right-[15%] top-[30%] hidden text-7xl opacity-30 md:block">
            💚
          </div>
          <div className="animate-splash absolute right-[25%] bottom-[40%] hidden text-7xl opacity-30 md:block">💙</div>

          {/* Rainbow - smaller on mobile */}
          <div className="animate-float absolute left-[5%] top-[60%] text-4xl opacity-15 md:text-6xl md:opacity-25">
            🌈
          </div>
        </div>
      )}

      {/* Christmas Theme Decorations */}
      {theme === "christmas" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Snowflakes - reduced count on mobile */}
          <div className="animate-snow absolute left-[10%] top-0 text-3xl opacity-40 md:text-4xl md:opacity-60">❄️</div>
          <div className="animate-snow-delayed absolute left-[40%] top-0 text-4xl opacity-50 md:text-5xl md:opacity-70">
            ❄️
          </div>
          <div className="animate-snow absolute left-[70%] top-0 hidden text-4xl opacity-60 md:block">❄️</div>
          <div className="animate-snow-delayed absolute left-[85%] top-0 hidden text-3xl opacity-50 md:block">❄️</div>

          {/* Christmas trees - hidden on mobile */}
          <div className="animate-sway absolute left-[15%] bottom-[10%] hidden text-7xl opacity-20 md:block">🎄</div>

          {/* Santa - hidden on mobile */}
          <div className="animate-slide absolute right-[5%] top-[20%] hidden text-6xl opacity-30 md:block">🎅</div>
        </div>
      )}

      {/* Valentine Theme Decorations */}
      {theme === "valentine" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Hearts - fewer on mobile */}
          <div className="animate-float-heart absolute left-[10%] top-[20%] text-4xl opacity-10 md:text-6xl md:opacity-20">
            ❤️
          </div>
          <div className="animate-float-heart-delayed absolute right-[15%] top-[35%] hidden text-5xl opacity-15 md:block">
            💕
          </div>
          <div className="animate-float-heart absolute right-[25%] bottom-[45%] hidden text-6xl opacity-15 md:block">
            💗
          </div>

          {/* Roses - hidden on mobile */}
          <div className="animate-sway absolute left-[5%] top-[50%] hidden text-5xl opacity-25 md:block">🌹</div>

          {/* Cupid - hidden on mobile */}
          <div className="animate-fly absolute left-[40%] top-[15%] hidden text-6xl opacity-20 md:block">💘</div>
        </div>
      )}

      {/* Dark Mode Decorations */}
      {theme === "dark" && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Stars - fewer and smaller on mobile */}
          <div className="animate-twinkle absolute left-[15%] top-[20%] text-2xl opacity-20 md:text-3xl md:opacity-40">
            ⭐
          </div>
          <div className="animate-twinkle-delayed absolute right-[20%] top-[30%] hidden text-2xl opacity-30 md:block">
            ⭐
          </div>
          <div className="animate-twinkle absolute left-[30%] top-[50%] hidden text-3xl opacity-40 md:block">⭐</div>
          <div className="animate-twinkle absolute left-[10%] bottom-[30%] hidden text-3xl opacity-40 md:block">⭐</div>

          {/* Moon - smaller on mobile */}
          <div className="animate-glow absolute right-[10%] top-[10%] text-5xl opacity-30 md:text-7xl md:opacity-50">
            🌙
          </div>
        </div>
      )}
    </>
  )
}
