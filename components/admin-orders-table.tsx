"use client"

import type { OrderWithDetails } from "@/lib/types"
import { mockRestaurants } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

interface AdminOrdersTableProps {
  orders: OrderWithDetails[]
  setOrders: (orders: OrderWithDetails[]) => void
}

export function AdminOrdersTable({ orders, setOrders }: AdminOrdersTableProps) {
  const handleStatusChange = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.order_id === orderId ? { ...order, status: newStatus as any } : order,
    )
    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    toast({
      title: "Order status updated",
      description: `Order #${orderId} status changed to ${newStatus.replace("_", " ")}`,
    })
  }

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

  if (orders.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No orders yet</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const restaurant = mockRestaurants.find((r) => r.restaurant_id === order.restaurant_id)
            return (
              <TableRow key={order.order_id}>
                <TableCell className="font-medium">#{order.order_id}</TableCell>
                <TableCell>{restaurant?.name}</TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                </TableCell>
                <TableCell>
                  <Select value={order.status} onValueChange={(value) => handleStatusChange(order.order_id, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
