"use client"

import { mockRestaurants } from "@/lib/mock-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function AdminRestaurantsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockRestaurants.map((restaurant) => (
            <TableRow key={restaurant.restaurant_id}>
              <TableCell className="font-medium">{restaurant.restaurant_id}</TableCell>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{restaurant.cuisine}</Badge>
              </TableCell>
              <TableCell>{restaurant.location}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>{restaurant.rating}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
