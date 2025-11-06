import Link from "next/link"
import Image from "next/image"
import type { Restaurant } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin } from "lucide-react"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return "from-green-500 to-green-400" // High rated
    if (rating >= 3.0) return "from-yellow-500 to-yellow-400" // Medium rated
    return "from-red-500 to-red-400" // Low rated
  }

  return (
    <Link href={`/restaurant/${restaurant.restaurant_id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] border-2 hover:border-orange-200">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-orange-600 shadow-lg">
            {restaurant.cuisine}
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2 text-balance">{restaurant.name}</h3>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">{restaurant.location}</span>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-r ${getRatingColor(restaurant.rating)} text-white font-semibold shadow-md`}
            >
              <Star className="h-3 w-3 fill-current" />
              <span className="text-sm">{restaurant.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
