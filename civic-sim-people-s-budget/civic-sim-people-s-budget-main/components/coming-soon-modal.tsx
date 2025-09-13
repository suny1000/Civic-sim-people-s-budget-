"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, CheckCircle, Users, Calendar, Zap, Target } from "lucide-react"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  feature: {
    title: string
    description: string
    icon: React.ReactNode
    expectedDate?: string
    features?: string[]
  }
}

export function ComingSoonModal({ isOpen, onClose, feature }: ComingSoonModalProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNotifyMe = () => {
    // In a real app, this would save the email to a waitlist
    console.log("Notify email:", email)
    setIsSubscribed(true)
    setTimeout(() => {
      setEmail("")
      setIsSubscribed(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
            {feature.icon}
          </div>
          <DialogTitle className="text-2xl">{feature.title}</DialogTitle>
          <DialogDescription className="text-base">{feature.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {feature.expectedDate && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium text-blue-800">Expected Launch</p>
                <p className="text-lg font-bold text-blue-900">{feature.expectedDate}</p>
              </CardContent>
            </Card>
          )}

          {feature.features && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                What's Coming
              </h4>
              <ul className="space-y-2">
                {feature.features.map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Target className="h-3 w-3 mr-2 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-center">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <Bell className="h-3 w-3 mr-1" />
                Get Notified
              </Badge>
            </div>

            {!isSubscribed ? (
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleNotifyMe}
                  disabled={!email.includes("@")}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me When Available
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
                <p className="text-green-600 font-medium">You're on the list!</p>
                <p className="text-sm text-gray-600">We'll notify you when this feature launches.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Predefined feature configurations
export const COMING_SOON_FEATURES = {
  community: {
    title: "Community Hub",
    description: "Connect with other civic-minded citizens, share strategies, and discuss budget priorities.",
    icon: <Users className="h-8 w-8 text-white" />,
    expectedDate: "Q2 2024",
    features: [
      "Discussion forums for each budget category",
      "Strategy sharing and collaboration tools",
      "Local government official Q&A sessions",
      "Community challenges and events",
    ],
  },
  realData: {
    title: "Real City Data",
    description: "Use actual budget data from your city to make more realistic and impactful simulations.",
    icon: <Target className="h-8 w-8 text-white" />,
    expectedDate: "Q3 2024",
    features: [
      "Integration with 50+ major US cities",
      "Historical budget trend analysis",
      "Real outcome tracking and validation",
      "City-specific policy constraints",
    ],
  },
  multiplayer: {
    title: "Multiplayer Mode",
    description: "Collaborate with friends or compete in real-time budget allocation challenges.",
    icon: <Users className="h-8 w-8 text-white" />,
    expectedDate: "Q4 2024",
    features: [
      "Real-time collaborative budgeting",
      "Team vs team competitions",
      "Live budget debates and voting",
      "Multiplayer tournaments",
    ],
  },
  advanced: {
    title: "Advanced Analytics",
    description: "Deep dive into budget impacts with advanced modeling and predictive analytics.",
    icon: <Zap className="h-8 w-8 text-white" />,
    expectedDate: "Q1 2025",
    features: [
      "Multi-year budget impact modeling",
      "Economic scenario planning",
      "Advanced data visualization",
      "Custom metric creation",
    ],
  },
}
