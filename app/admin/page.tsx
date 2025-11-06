"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { OrderWithDetails } from "@/lib/types"
import { useEffect, useState } from "react"
import { Package, DollarSign, TrendingUp, Users } from "lucide-react"
import { AdminOrdersTable } from "@/components/admin-orders-table"
import { AdminRestaurantsTable } from "@/components/admin-restaurants-table"
import { AdminMenuItemsTable } from "@/components/admin-menu-items-table"

export default function AdminPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    completedOrders: 0,
  })

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      setOrders(parsedOrders)

      // Calculate stats
      const totalRevenue = parsedOrders.reduce((sum: number, order: OrderWithDetails) => sum + order.total_amount, 0)
      const activeOrders = parsedOrders.filter((order: OrderWithDetails) =>
        ["pending", "confirmed", "preparing", "out_for_delivery"].includes(order.status),
      ).length
      const completedOrders = parsedOrders.filter((order: OrderWithDetails) => order.status === "delivered").length

      setStats({
        totalOrders: parsedOrders.length,
        totalRevenue,
        activeOrders,
        completedOrders,
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminOrdersTable orders={orders} setOrders={setOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="restaurants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminRestaurantsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminMenuItemsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
