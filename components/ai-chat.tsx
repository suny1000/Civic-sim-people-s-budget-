"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatProps {
  allocations?: Record<string, number>
  cityMetrics?: any[]
  isOpen: boolean
  onToggle: () => void
}

export function AIChat({ allocations, cityMetrics, isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your budget advisor. I can help explain the impact of your budget decisions, suggest improvements, and answer questions about municipal budgeting. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response (in a real app, this would call your AI API)
      const response = await simulateAIResponse(input, allocations, cityMetrics)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px]">
      <Card className="h-full shadow-2xl border-2 border-blue-200">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Budget Advisor
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onToggle} className="text-white hover:bg-white/20">
              ×
            </Button>
          </div>
          <Badge className="bg-white/20 text-white w-fit">AI-Powered Insights</Badge>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                      {message.role === "user" && <User className="h-4 w-4 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your budget..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Simulate AI response (in a real app, this would call your AI API)
async function simulateAIResponse(
  input: string,
  allocations?: Record<string, number>,
  cityMetrics?: any[],
): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

  const lowerInput = input.toLowerCase()

  // Budget-specific responses
  if (lowerInput.includes("education") || lowerInput.includes("school")) {
    const educationBudget = allocations?.education || 0
    return `Your education budget is currently $${educationBudget}M. Education funding directly impacts graduation rates, teacher quality, and student outcomes. Consider that the national average for education spending is around 25-30% of municipal budgets. Would you like suggestions on optimizing your education allocation?`
  }

  if (lowerInput.includes("healthcare") || lowerInput.includes("health")) {
    const healthcareBudget = allocations?.healthcare || 0
    return `You've allocated $${healthcareBudget}M to healthcare. This affects public health programs, hospital capacity, and emergency services. Healthcare spending typically ranges from 15-25% of city budgets. Higher allocations can improve health outcomes and reduce long-term costs.`
  }

  if (lowerInput.includes("infrastructure") || lowerInput.includes("road")) {
    const infraBudget = allocations?.infrastructure || 0
    return `Infrastructure receives $${infraBudget}M in your budget. This covers roads, bridges, public transit, and utilities. Well-maintained infrastructure attracts businesses and improves quality of life. The American Society of Civil Engineers recommends significant infrastructure investment to address aging systems.`
  }

  if (lowerInput.includes("improve") || lowerInput.includes("better") || lowerInput.includes("optimize")) {
    return `To improve your city's performance, consider these strategies: 1) Balance is key - avoid over-investing in one area, 2) Education and healthcare often provide long-term returns, 3) Infrastructure enables economic growth, 4) Public safety creates foundation for other improvements. What specific metric would you like to focus on?`
  }

  if (lowerInput.includes("score") || lowerInput.includes("rating")) {
    return `Your city's overall score reflects the balance and effectiveness of your budget allocation. Higher scores come from strategic investments that create positive feedback loops. For example, good education leads to economic development, which generates more tax revenue for future budgets.`
  }

  // General responses
  const responses = [
    "That's an interesting question about municipal budgeting. Budget decisions involve complex trade-offs between immediate needs and long-term investments. What specific aspect would you like to explore further?",
    "Municipal budgeting requires balancing competing priorities with limited resources. Each dollar spent in one area means less available for others. Consider how your allocations align with your city's most pressing needs.",
    "Great question! Budget allocation is both an art and a science. Data-driven decisions combined with community input typically yield the best outcomes. What challenges is your city facing that we should address?",
    "Budget planning involves understanding both direct and indirect effects. For instance, investing in education can reduce future crime rates, while infrastructure spending can attract businesses. How can I help you think through these connections?",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
