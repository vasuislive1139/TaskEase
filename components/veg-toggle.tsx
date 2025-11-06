"use client"

import { Leaf } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useUser } from "@/lib/user-context"

export function VegToggle() {
  const { vegOnly, setVegOnly } = useUser()

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors">
      <Leaf className="h-4 w-4 text-green-600" />
      <Label htmlFor="veg-mode" className="text-sm cursor-pointer">
        Veg Only
      </Label>
      <Switch id="veg-mode" checked={vegOnly} onCheckedChange={setVegOnly} />
    </div>
  )
}
