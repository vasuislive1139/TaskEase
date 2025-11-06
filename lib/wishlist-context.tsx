"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WishlistContextType {
  favoriteRestaurants: number[]
  favoriteItems: number[]
  toggleRestaurant: (restaurantId: number) => void
  toggleItem: (itemId: number) => void
  isFavoriteRestaurant: (restaurantId: number) => boolean
  isFavoriteItem: (itemId: number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<number[]>([])
  const [favoriteItems, setFavoriteItems] = useState<number[]>([])

  useEffect(() => {
    const savedRestaurants = localStorage.getItem("favoriteRestaurants")
    const savedItems = localStorage.getItem("favoriteItems")
    if (savedRestaurants) setFavoriteRestaurants(JSON.parse(savedRestaurants))
    if (savedItems) setFavoriteItems(JSON.parse(savedItems))
  }, [])

  const toggleRestaurant = (restaurantId: number) => {
    setFavoriteRestaurants((prev) => {
      const newFavorites = prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
      localStorage.setItem("favoriteRestaurants", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const toggleItem = (itemId: number) => {
    setFavoriteItems((prev) => {
      const newFavorites = prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      localStorage.setItem("favoriteItems", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavoriteRestaurant = (restaurantId: number) => favoriteRestaurants.includes(restaurantId)
  const isFavoriteItem = (itemId: number) => favoriteItems.includes(itemId)

  return (
    <WishlistContext.Provider
      value={{
        favoriteRestaurants,
        favoriteItems,
        toggleRestaurant,
        toggleItem,
        isFavoriteRestaurant,
        isFavoriteItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
