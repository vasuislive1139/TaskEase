"use client"

import Image from "next/image"
import type { MenuItem } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(item)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="flex gap-4 p-4">
        <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="font-semibold text-balance">{item.name}</h3>
            <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{item.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</span>
            <Button size="sm" variant="success" onClick={handleAddToCart}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
