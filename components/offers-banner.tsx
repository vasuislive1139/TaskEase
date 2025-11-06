"use client"

import { Gift, Tag } from "lucide-react"
import { mockOffers } from "@/lib/offers"
import { Card } from "@/components/ui/card"

export function OffersBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-success/10 via-primary/10 to-success/10 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-6 w-6 text-success" />
          <h2 className="text-2xl font-bold">Special Offers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockOffers.map((offer) => (
            <Card
              key={offer.offer_id}
              className="p-4 bg-card hover:shadow-lg transition-all hover:scale-105 border-2 border-success/20"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Tag className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{offer.title}</h3>
                  <p className="text-xs text-muted-foreground">{offer.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
