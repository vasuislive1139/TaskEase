import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/lib/theme-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { UserProvider } from "@/lib/user-context"
import { Toaster } from "@/components/ui/toaster"
import { DynamicIsland } from "@/components/dynamic-island"
import { ThemeDecorations } from "@/components/theme-decorations"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "FoodHub - Order Food Online",
  description: "Order delicious food from your favorite restaurants",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <UserProvider>
            <WishlistProvider>
              <CartProvider>
                <ThemeDecorations />
                {children}
                <Toaster />
                <DynamicIsland />
              </CartProvider>
            </WishlistProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
