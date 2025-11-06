"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { ShoppingBag, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function DynamicIsland() {
  const { cart, getCartCount, getCartTotal } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null)
  const router = useRouter()

  // Show island when cart updates
  useEffect(() => {
    if (cart.length > 0) {
      setIsVisible(true)
      const lastItem = cart[cart.length - 1]
      setLastUpdate(`${lastItem.name} added`)

      // Auto-hide the update message after 3 seconds
      const timer = setTimeout(() => {
        setLastUpdate("")
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [cart])

  // Check for active orders and show delivery status
  useEffect(() => {
    const checkOrders = () => {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const activeOrder = orders.find(
        (order: any) => order.status === "Preparing" || order.status === "Out for Delivery",
      )

      if (activeOrder) {
        setDeliveryStatus(activeOrder.status)
        setIsVisible(true)
      } else {
        setDeliveryStatus(null)
      }
    }

    checkOrders()
    const interval = setInterval(checkOrders, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const handleClick = () => {
    if (deliveryStatus) {
      router.push("/orders")
    } else {
      router.push("/cart")
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className="bg-gradient-to-r from-primary via-primary/90 to-primary backdrop-blur-xl border border-primary/20 rounded-full shadow-2xl shadow-primary/20 px-6 py-3 flex items-center gap-4 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
        onClick={handleClick}
      >
        {deliveryStatus ? (
          <>
            {deliveryStatus === "Preparing" && (
              <>
                <Package className="h-5 w-5 text-white animate-pulse" />
                <div className="text-white">
                  <p className="text-sm font-semibold">Order Preparing</p>
                  <p className="text-xs opacity-90">Your food is being prepared</p>
                </div>
              </>
            )}
            {deliveryStatus === "Out for Delivery" && (
              <>
                <Truck className="h-5 w-5 text-white animate-bounce" />
                <div className="text-white">
                  <p className="text-sm font-semibold">Out for Delivery</p>
                  <p className="text-xs opacity-90">Your order is on the way!</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-white" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </div>
            <div className="text-white">
              <p className="text-sm font-semibold">₹{getCartTotal().toFixed(2)}</p>
              {lastUpdate && <p className="text-xs opacity-90 animate-in fade-in duration-200">{lastUpdate}</p>}
            </div>
            <div className="h-6 w-px bg-white/20" />
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold text-xs px-3 py-1 h-7"
            >
              View Cart
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
