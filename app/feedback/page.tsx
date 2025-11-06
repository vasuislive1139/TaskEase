"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedbackType, setFeedbackType] = useState("general")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Save feedback to localStorage
    const feedback = {
      name: formData.get("name"),
      email: formData.get("email"),
      type: feedbackType,
      rating: rating,
      message: formData.get("message"),
      date: new Date().toISOString(),
    }

    const existingFeedback = JSON.parse(localStorage.getItem("feedback") || "[]")
    existingFeedback.push(feedback)
    localStorage.setItem("feedback", JSON.stringify(existingFeedback))

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. We'll review it soon.",
    })

    // Reset form
    e.currentTarget.reset()
    setRating(0)
    setFeedbackType("general")
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">We Value Your Feedback</h1>
          <p className="text-muted-foreground">Help us improve FoodHub by sharing your experience</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Thoughts</CardTitle>
            <CardDescription>Your feedback helps us serve you better</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Feedback Type</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="font-normal cursor-pointer">
                      General Feedback
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service" className="font-normal cursor-pointer">
                      Service Quality
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="food" id="food" />
                    <Label htmlFor="food" className="font-normal cursor-pointer">
                      Food Quality
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="font-normal cursor-pointer">
                      Delivery Experience
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app" className="font-normal cursor-pointer">
                      App Experience
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Rate Your Experience</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your experience..."
                  className="min-h-32"
                  required
                />
              </div>

              <Button type="submit" className="w-full hover:bg-primary/90 active:scale-[0.98]">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
