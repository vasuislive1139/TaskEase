"use client"

import type React from "react"

import { Moon, Sun, Sparkles, Palette, Heart, Gift, Ghost } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import type { ThemeType } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
  { value: "default", label: "Default", icon: <Sun className="h-4 w-4" /> },
  { value: "dark", label: "Dark Mode", icon: <Moon className="h-4 w-4" /> },
  { value: "halloween", label: "Halloween", icon: <Ghost className="h-4 w-4" /> },
  { value: "diwali", label: "Diwali", icon: <Sparkles className="h-4 w-4" /> },
  { value: "holi", label: "Holi", icon: <Palette className="h-4 w-4" /> },
  { value: "christmas", label: "Christmas", icon: <Gift className="h-4 w-4" /> },
  { value: "valentine", label: "Valentine", icon: <Heart className="h-4 w-4" /> },
]

export function ThemeMenu() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent/80 hover:scale-110 transition-transform">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={theme === t.value ? "bg-accent" : ""}
          >
            <span className="flex items-center gap-2">
              {t.icon}
              {t.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
