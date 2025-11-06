"use client"

import Image from "next/image"
import type { CartItem as CartItemType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-balance">{item.name}</h3>
          <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 bg-transparent"
              onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 bg-transparent"
              onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive"
              onClick={() => removeFromCart(item.item_id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
