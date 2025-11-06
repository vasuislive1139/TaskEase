import type { Offer } from "./types"

export const mockOffers: Offer[] = [
  {
    offer_id: 1,
    title: "Order 3 Get 1 Free",
    description: "Order any 3 items and get the cheapest one free!",
    minOrder: 3,
    discount: 0,
    type: "free_item",
  },
  {
    offer_id: 2,
    title: "Flat ₹100 Off",
    description: "Get ₹100 off on orders above ₹500",
    minOrder: 500,
    discount: 100,
    type: "flat_discount",
  },
  {
    offer_id: 3,
    title: "20% Off",
    description: "Get 20% off on orders above ₹800",
    minOrder: 800,
    discount: 20,
    type: "percentage",
  },
  {
    offer_id: 4,
    title: "Buy 5 Get 2 Free",
    description: "Order 5 items and get 2 cheapest items free!",
    minOrder: 5,
    discount: 0,
    type: "free_item",
  },
]
