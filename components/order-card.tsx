"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { OrderWithDetails } from "@/lib/types"
import { mockRestaurants, mockMenuItems } from "@/lib/mock-data"
import { Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"

interface OrderCardProps {
  order: OrderWithDetails
  onOrderUpdate?: () => void
}

export function OrderCard({ order, onOrderUpdate }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const restaurant = mockRestaurants.find((r) => r.restaurant_id === order.restaurant_id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "confirmed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "preparing":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
      case "out_for_delivery":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
      case "delivered":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "cancelled":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleCancelOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const updatedOrders = orders.map((o: OrderWithDetails) => {
      if (o.order_id === order.order_id) {
        return { ...o, status: "cancelled" }
      }
      return o
    })
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    toast({
      title: "Order Cancelled",
      description: `Order #${order.order_id} has been cancelled successfully.`,
    })

    setShowCancelDialog(false)
    if (onOrderUpdate) {
      onOrderUpdate()
    }
  }

  const canCancelOrder = ["pending", "confirmed", "preparing"].includes(order.status)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">Order #{order.order_id}</h3>
              <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{restaurant?.name}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-primary">₹{order.total_amount.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{new Date(order.order_date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{new Date(order.order_date).toLocaleTimeString()}</span>
          </div>
          {order.delivery_person && (
            <div className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span>{order.delivery_person.name}</span>
            </div>
          )}
          {order.payment && (
            <div className="flex items-center gap-1">
              <span className="capitalize">{order.payment.payment_method.replace("_", " ")}</span>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="border-t pt-3 space-y-2">
            <p className="text-sm font-medium">Order Items:</p>
            {order.items.map((item) => {
              const menuItem = mockMenuItems.find((m) => m.item_id === item.item_id)
              return (
                <div key={item.item_id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {menuItem?.name} x {item.quantity}
                  </span>
                  <span>₹{((menuItem?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Show Less" : "View Details"}
          </Button>
          {canCancelOrder && (
            <Button variant="destructive" size="sm" className="flex-1" onClick={() => setShowCancelDialog(true)}>
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order #{order.order_id}? This action cannot be undone and you may need to
              place a new order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
