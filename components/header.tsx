"use client"

import Link from "next/link"
import { ShoppingCart, User, UtensilsCrossed, HelpCircle, MessageSquare, Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"
import { ThemeMenu } from "@/components/theme-menu"
import { VegToggle } from "@/components/veg-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">FoodHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-accent/80 hover:scale-105 transition-transform">
              Restaurants
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="ghost" className="hover:bg-accent/80 hover:scale-105 transition-transform">
              My Orders
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button variant="ghost" className="hover:bg-accent/80 hover:scale-105 transition-transform gap-1">
              <Heart className="h-4 w-4" />
              Wishlist
            </Button>
          </Link>
          <Link href="/feedback">
            <Button variant="ghost" className="hover:bg-accent/80 hover:scale-105 transition-transform gap-1">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="ghost" className="hover:bg-accent/80 hover:scale-105 transition-transform gap-1">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </Link>
          <VegToggle />
          <ThemeMenu />
          <Link href="/cart">
            <Button
              variant={cartCount > 0 ? "success" : "ghost"}
              size="icon"
              className={
                cartCount > 0
                  ? "relative hover:scale-110 transition-transform"
                  : "relative hover:bg-accent/80 hover:scale-110 transition-transform"
              }
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hover:bg-accent/80 hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/cart">
            <Button
              variant={cartCount > 0 ? "success" : "ghost"}
              size="icon"
              className={
                cartCount > 0
                  ? "relative hover:scale-110 transition-transform"
                  : "relative hover:bg-accent/80 hover:scale-110 transition-transform"
              }
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent/80">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start">
                    Restaurants
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button variant="ghost" className="w-full justify-start">
                    My Orders
                  </Button>
                </Link>
                <Link href="/wishlist">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link href="/feedback">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Feedback
                  </Button>
                </Link>
                <Link href="/help">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Help
                  </Button>
                </Link>
                <div className="pt-4 border-t">
                  <VegToggle />
                  <div className="mt-4">
                    <ThemeMenu />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
