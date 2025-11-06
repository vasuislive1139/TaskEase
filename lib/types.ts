// Database types based on the provided SQL schema

export interface Customer {
  customer_id: number
  name: string
  email: string
  phone: string
  address: string
}

export interface Restaurant {
  restaurant_id: number
  name: string
  location: string
  rating: number
  image?: string
  cuisine?: string
}

export interface MenuItem {
  item_id: number
  restaurant_id: number
  name: string
  price: number
  description?: string
  image?: string
  category?: string
  isVeg?: boolean
}

export interface DeliveryPerson {
  delivery_id: number
  name: string
  phone: string
}

export interface Order {
  order_id: number
  customer_id: number
  restaurant_id: number
  delivery_id: number | null
  order_date: Date
  total_amount: number
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled"
}

export interface OrderItem {
  order_id: number
  item_id: number
  quantity: number
}

export interface Payment {
  payment_id: number
  order_id: number
  payment_method: "credit_card" | "debit_card" | "cash" | "upi"
  amount: number
  payment_date: Date
}

// Extended types for UI
export interface CartItem extends MenuItem {
  quantity: number
}

export interface OrderWithDetails extends Order {
  restaurant: Restaurant
  items: (OrderItem & { menuItem: MenuItem })[]
  payment?: Payment
  delivery_person?: DeliveryPerson
}

// New types for themes, offers, and wishlist
export type ThemeType = "default" | "dark" | "diwali" | "holi" | "christmas" | "valentine" | "halloween"

export interface Offer {
  offer_id: number
  title: string
  description: string
  minOrder: number
  discount: number
  type: "percentage" | "free_item" | "flat_discount"
}

export interface UserProfile {
  user_id: number
  name: string
  email: string
  phone: string
  address: string
  preferences: {
    vegOnly: boolean
    theme: ThemeType
  }
}
