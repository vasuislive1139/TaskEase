"use client"

import { mockMenuItems, mockRestaurants } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdminMenuItemsTable() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("all")

  const filteredItems =
    selectedRestaurant === "all"
      ? mockMenuItems
      : mockMenuItems.filter((item) => item.restaurant_id === Number.parseInt(selectedRestaurant))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Filter by Restaurant:</label>
        <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
          <SelectTrigger className="w-[250px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Restaurants</SelectItem>
            {mockRestaurants.map((restaurant) => (
              <SelectItem key={restaurant.restaurant_id} value={restaurant.restaurant_id.toString()}>
                {restaurant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const restaurant = mockRestaurants.find((r) => r.restaurant_id === item.restaurant_id)
              return (
                <TableRow key={item.item_id}>
                  <TableCell className="font-medium">{item.item_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{restaurant?.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">₹{item.price.toFixed(2)}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{item.description}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
