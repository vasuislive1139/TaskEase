"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RestaurantCard } from "@/components/restaurant-card"
import { mockRestaurants } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Clock, Star, Leaf } from "lucide-react"
import { OffersBanner } from "@/components/offers-banner"
import { useUser } from "@/lib/user-context"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { vegOnly } = useUser()

  const filteredRestaurants = mockRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            <span>12+ Restaurants Available</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-balance mb-4 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Order Food from Your Favorite Restaurants
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Delicious meals delivered to your doorstep in Chandigarh
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">30 min delivery</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm border">
              <Star className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">Top rated</span>
            </div>
          </div>
        </div>

        <div className="mb-12 mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants or cuisines..."
              className="pl-12 h-14 text-lg shadow-lg border-2 focus:border-orange-500 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <OffersBanner />

        {vegOnly && (
          <div className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
            <Leaf className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">Showing vegetarian options only</p>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">All Restaurants</h2>
            <p className="text-muted-foreground">{filteredRestaurants.length} restaurants</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.restaurant_id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
