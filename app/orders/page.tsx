"use client"

import { Header } from "@/components/header"
import { OrderCard } from "@/components/order-card"
import { Button } from "@/components/ui/button"
import type { OrderWithDetails } from "@/lib/types"
import { Package } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])

  const loadOrders = () => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      parsedOrders.sort(
        (a: OrderWithDetails, b: OrderWithDetails) =>
          new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
      )
      setOrders(parsedOrders)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start ordering delicious food from your favorite restaurants</p>
            <Link href="/">
              <Button>Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.order_id} order={order} onOrderUpdate={loadOrders} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
