"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MessageCircle, AlertCircle } from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Save report to localStorage
    const report = {
      orderId: formData.get("orderId"),
      issueType: formData.get("issueType"),
      description: formData.get("description"),
      email: formData.get("email"),
      date: new Date().toISOString(),
      status: "pending",
    }

    const existingReports = JSON.parse(localStorage.getItem("reports") || "[]")
    existingReports.push(report)
    localStorage.setItem("reports", JSON.stringify(existingReports))

    toast({
      title: "Issue Reported!",
      description: "Our support team will contact you within 24 hours.",
    })

    e.currentTarget.reset()
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">We're here to help you with any issues or questions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Available 24/7</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">+91 172-2345678</p>
              <p className="text-sm text-muted-foreground mt-1">Toll-free support</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Email Us</CardTitle>
              <CardDescription>Response within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">support@foodhub.in</p>
              <p className="text-sm text-muted-foreground mt-1">For detailed queries</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Instant assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full hover:bg-primary/90 active:scale-[0.98]">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle>Report an Issue</CardTitle>
              </div>
              <CardDescription>Having trouble with your order? Let us know</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID (Optional)</Label>
                  <Input id="orderId" name="orderId" placeholder="e.g., ORD-12345" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type</Label>
                  <select
                    id="issueType"
                    name="issueType"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Select an issue</option>
                    <option value="wrong-order">Wrong Order Delivered</option>
                    <option value="missing-items">Missing Items</option>
                    <option value="late-delivery">Late Delivery</option>
                    <option value="food-quality">Food Quality Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="refund">Refund Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe the Issue</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide details about the issue..."
                    className="min-h-24"
                    required
                  />
                </div>

                <Button type="submit" className="w-full hover:bg-primary/90 active:scale-[0.98]">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Go to "My Orders" section and click on your active order to see real-time tracking information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the delivery time?</AccordionTrigger>
                  <AccordionContent>
                    Typical delivery time is 30-45 minutes depending on your location and restaurant preparation time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How can I cancel my order?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel your order within 2 minutes of placing it. Go to "My Orders" and click the cancel
                    button.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                  <AccordionContent>
                    We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I get a refund?</AccordionTrigger>
                  <AccordionContent>
                    Refunds are processed within 5-7 business days. Report your issue using the form and our team will
                    assist you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Is there a minimum order value?</AccordionTrigger>
                  <AccordionContent>
                    Minimum order value varies by restaurant, typically ₹99-₹199. Check the restaurant page for details.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
