"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { useWishlist } from "@/lib/wishlist-context"
import { mockRestaurants, mockMenuItems } from "@/lib/mock-data"
import { Heart, Star, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WishlistPage() {
  const { favoriteRestaurants, favoriteItems, toggleRestaurant, toggleItem } = useWishlist()

  const favoriteRestaurantsList = mockRestaurants.filter((r) => favoriteRestaurants.includes(r.restaurant_id))
  const favoriteItemsList = mockMenuItems.filter((i) => favoriteItems.includes(i.item_id))

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {/* Favorite Restaurants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Favorite Restaurants</h2>
          {favoriteRestaurantsList.length === 0 ? (
            <p className="text-muted-foreground">No favorite restaurants yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRestaurantsList.map((restaurant) => (
                <Card key={restaurant.restaurant_id} className="overflow-hidden hover:shadow-xl transition-all">
                  <Link href={`/restaurant/${restaurant.restaurant_id}`}>
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRestaurant(restaurant.restaurant_id)}
                        className="hover:bg-transparent"
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {restaurant.location}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Favorite Items */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Favorite Items</h2>
          {favoriteItemsList.length === 0 ? (
            <p className="text-muted-foreground">No favorite items yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteItemsList.map((item) => {
                const restaurant = mockRestaurants.find((r) => r.restaurant_id === item.restaurant_id)
                return (
                  <Card key={item.item_id} className="overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{restaurant?.name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleItem(item.item_id)}
                          className="hover:bg-transparent"
                        >
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <p className="text-lg font-bold text-success">₹{item.price}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
