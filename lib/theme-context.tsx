"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { ThemeType } from "./types"

interface ThemeContextType {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getSeasonalTheme(): ThemeType {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()

  // Halloween: October 1-31
  if (month === 10) return "halloween"

  // Diwali: October-November (approximate)
  if ((month === 10 && day > 15) || (month === 11 && day < 15)) return "diwali"

  // Christmas: December 1-31
  if (month === 12) return "christmas"

  // Valentine: February 1-14
  if (month === 2 && day <= 14) return "valentine"

  // Holi: March (approximate)
  if (month === 3) return "holi"

  return "default"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("default")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType
    if (savedTheme) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme)
    } else {
      const seasonalTheme = getSeasonalTheme()
      setThemeState(seasonalTheme)
      document.documentElement.setAttribute("data-theme", seasonalTheme)
    }
  }, [])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
