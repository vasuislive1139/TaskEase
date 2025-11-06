"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { PartyPopper, Star } from "lucide-react"

interface OrderSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: number
  onComplete: () => void
}

export function OrderSuccessDialog({ open, onOpenChange, orderId, onComplete }: OrderSuccessDialogProps) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [rating, setRating] = useState<string>("5")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = () => {
    setShowFeedback(true)
  }

  const handleSkipFeedback = () => {
    onOpenChange(false)
    onComplete()
  }

  const handleSubmitFeedback = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Save feedback to localStorage
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]")
    feedbacks.push({
      order_id: orderId,
      rating: Number.parseInt(rating),
      feedback,
      date: new Date().toISOString(),
    })
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks))

    toast({
      title: "Thank you for your feedback!",
      description: "Your feedback helps us improve our service.",
    })

    setIsSubmitting(false)
    onOpenChange(false)
    onComplete()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        {!showFeedback ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <PartyPopper className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-2xl">Congratulations!</DialogTitle>
              <DialogDescription className="text-base">
                Your order #{orderId} has been placed successfully!
                <br />
                <span className="text-foreground font-medium mt-2 block">Your delicious food is on its way!</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:flex-col gap-2">
              <Button onClick={handleContinue} size="lg" className="w-full">
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Rate Your Experience
              </DialogTitle>
              <DialogDescription>Help us serve you better by sharing your feedback</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>How would you rate your ordering experience?</Label>
                <RadioGroup value={rating} onValueChange={setRating}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5" className="cursor-pointer">
                      ⭐⭐⭐⭐⭐ Excellent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4" className="cursor-pointer">
                      ⭐⭐⭐⭐ Good
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3" className="cursor-pointer">
                      ⭐⭐⭐ Average
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2" className="cursor-pointer">
                      ⭐⭐ Poor
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1" className="cursor-pointer">
                      ⭐ Very Poor
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Additional Comments (Optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter className="sm:flex-col gap-2">
              <Button onClick={handleSubmitFeedback} disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button variant="ghost" onClick={handleSkipFeedback} className="w-full">
                Skip for Now
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
