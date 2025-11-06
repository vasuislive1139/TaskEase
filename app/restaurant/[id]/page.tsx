import { Header } from "@/components/header"
import { MenuItemCard } from "@/components/menu-item-card"
import { mockRestaurants, mockMenuItems } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RestaurantPageProps {
  params: Promise<{ id: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = await params
  const restaurantId = Number.parseInt(id)
  const restaurant = mockRestaurants.find((r) => r.restaurant_id === restaurantId)

  if (!restaurant) {
    notFound()
  }

  const menuItems = mockMenuItems.filter((item) => item.restaurant_id === restaurantId)

  // Group menu items by category
  const categories = Array.from(new Set(menuItems.map((item) => item.category || "Other")))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main container with centering classes added */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Restaurant Header */}
        <div className="mb-8">
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-balance mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>30-45 min</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {restaurant.cuisine}
            </Badge>
          </div>
        </div>

        {/* Menu Items by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = menuItems.filter((item) => (item.category || "Other") === category)
            return (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryItems.map((item) => (
                    <MenuItemCard key={item.item_id} item={item} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
