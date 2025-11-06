"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { mockCustomer, mockDeliveryPersons, mockRestaurants } from "@/lib/mock-data"
import type { Order, Payment } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "debit_card" | "cash" | "upi">("credit_card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showNoDeliveryAlert, setShowNoDeliveryAlert] = useState(false)

  const total = getCartTotal()
  const deliveryFee = 3.99
  const tax = total * 0.08
  const grandTotal = total + deliveryFee + tax

  // Get restaurant ID from cart items (assuming all items are from same restaurant)
  const restaurantId = cart[0]?.restaurant_id || 1
  const restaurant = mockRestaurants.find((r) => r.restaurant_id === restaurantId)

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const isDeliveryPartnerAvailable = Math.random() > 0.2

    if (!isDeliveryPartnerAvailable) {
      setIsProcessing(false)
      setShowNoDeliveryAlert(true)
      return
    }

    // Create order
    const orderId = Date.now()
    const randomDelivery = mockDeliveryPersons[Math.floor(Math.random() * mockDeliveryPersons.length)]

    const order: Order = {
      order_id: orderId,
      customer_id: mockCustomer.customer_id,
      restaurant_id: restaurantId,
      delivery_id: randomDelivery.delivery_id,
      order_date: new Date(),
      total_amount: grandTotal,
      status: "confirmed",
    }

    const payment: Payment = {
      payment_id: Date.now() + 1,
      order_id: orderId,
      payment_method: paymentMethod,
      amount: grandTotal,
      payment_date: new Date(),
    }

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const orderItems = cart.map((item) => ({
      order_id: orderId,
      item_id: item.item_id,
      quantity: item.quantity,
    }))

    orders.push({
      ...order,
      items: orderItems,
      payment,
      delivery_person: randomDelivery,
    })
    localStorage.setItem("orders", JSON.stringify(orders))

    // Clear cart
    clearCart()

    setIsProcessing(false)
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderId} has been confirmed and will be delivered soon.`,
    })

    // Redirect to orders page after a short delay
    setTimeout(() => {
      router.push("/orders")
    }, 1000)
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={mockCustomer.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={mockCustomer.phone} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockCustomer.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" defaultValue={mockCustomer.address} />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="debit_card" id="debit_card" />
                    <Label htmlFor="debit_card" className="flex-1 cursor-pointer">
                      Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Restaurant</span>
                    <span className="font-medium">{restaurant?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span>{cart.length}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Alert Dialog for no delivery partner available */}
      <AlertDialog open={showNoDeliveryAlert} onOpenChange={setShowNoDeliveryAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No Delivery Partner Available</AlertDialogTitle>
            <AlertDialogDescription>
              We're sorry, but there are no delivery partners available in your area at the moment. Please try again
              later or choose a different restaurant.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowNoDeliveryAlert(false)}>Try Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
