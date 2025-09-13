"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BudgetSlider } from "@/components/budget-slider"
import { CityMetricsDisplay } from "@/components/city-metrics-display"
import { BudgetSummary } from "@/components/budget-summary"
import { AIChat } from "@/components/ai-chat"
import {
  BUDGET_CATEGORIES,
  CITY_METRICS,
  calculateCityMetrics,
  calculateCityScore,
  type CityMetric,
} from "@/lib/budget-data"
import Link from "next/link"
import { Save, RotateCcw, MessageCircle, Download } from "lucide-react"

export default function SimulatorPage() {
  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    BUDGET_CATEGORIES.forEach((category) => {
      initial[category.id] = category.defaultAllocation
    })
    return initial
  })

  const [currentMetrics, setCurrentMetrics] = useState<CityMetric[]>(CITY_METRICS)
  const [previousMetrics, setPreviousMetrics] = useState<CityMetric[]>()
  const [saveMessage, setSaveMessage] = useState<string>("")
  const [isChatOpen, setIsChatOpen] = useState(false)

  const totalBudget = 100

  // Update metrics when allocations change
  useEffect(() => {
    setPreviousMetrics(currentMetrics)
    const newMetrics = calculateCityMetrics(allocations)
    setCurrentMetrics(newMetrics)
  }, [allocations])

  const handleAllocationChange = (categoryId: string, value: number) => {
    setAllocations((prev) => ({
      ...prev,
      [categoryId]: value,
    }))
  }

  const resetToDefaults = () => {
    const defaultAllocations: Record<string, number> = {}
    BUDGET_CATEGORIES.forEach((category) => {
      defaultAllocations[category.id] = category.defaultAllocation
    })
    setAllocations(defaultAllocations)
  }

  const saveSimulation = () => {
    const overallScore = calculateCityScore(currentMetrics)
    const simulation = {
      id: Date.now().toString(),
      name: `Budget ${new Date().toLocaleDateString()}`,
      allocations,
      totalScore: overallScore,
      cityMetrics: currentMetrics,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const savedSimulations = JSON.parse(localStorage.getItem("civicsim-simulations") || "[]")
    savedSimulations.push(simulation)
    localStorage.setItem("civicsim-simulations", JSON.stringify(savedSimulations))

    setSaveMessage("Simulation saved locally!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const downloadSimulation = () => {
    const overallScore = calculateCityScore(currentMetrics)
    const simulation = {
      name: `Budget ${new Date().toLocaleDateString()}`,
      allocations,
      totalScore: overallScore,
      cityMetrics: currentMetrics,
      createdAt: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(simulation, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `civicsim-budget-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const overallScore = calculateCityScore(currentMetrics)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="font-bold text-xl text-gray-900">CivicSim</span>
              </Link>
              <Badge className="bg-blue-100 text-blue-800">Budget Simulator</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(!isChatOpen)} className="relative">
                <MessageCircle className="mr-2 h-4 w-4" />
                AI Advisor
                {!isChatOpen && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                )}
              </Button>
              <Button onClick={downloadSimulation} variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={saveSimulation} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Save Locally
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">City Budget Simulator</h1>
          <p className="text-lg text-gray-600 mb-4">
            Allocate $100 million across city departments and see the real-time impact
          </p>
          {saveMessage && (
            <div className="inline-block px-4 py-2 rounded-md text-sm bg-green-100 text-green-800">{saveMessage}</div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Budget Allocation</h2>
              <Button variant="outline" onClick={resetToDefaults} size="sm">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
            </div>

            <div className="space-y-4">
              {BUDGET_CATEGORIES.map((category) => (
                <BudgetSlider
                  key={category.id}
                  category={category}
                  value={allocations[category.id] || 0}
                  onChange={(value) => handleAllocationChange(category.id, value)}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BudgetSummary allocations={allocations} totalBudget={totalBudget} />

            <CityMetricsDisplay
              metrics={currentMetrics}
              previousMetrics={previousMetrics}
              overallScore={overallScore}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Prototype Version</h3>
              <p className="text-sm text-gray-600 mb-4">
                This is a working prototype. Your simulations are saved locally in your browser. Use the download button
                to export your budget data.
              </p>
              <div className="space-y-2">
                <Button onClick={saveSimulation} className="w-full">
                  Save Simulation
                </Button>
                <Button onClick={downloadSimulation} variant="outline" className="w-full bg-transparent">
                  Download Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat
        allocations={allocations}
        cityMetrics={currentMetrics}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  )
}
