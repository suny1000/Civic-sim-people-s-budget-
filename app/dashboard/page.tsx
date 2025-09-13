"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SimulationCard } from "@/components/simulation-card"
import { BudgetChart } from "@/components/budget-chart"
import { MetricsChart } from "@/components/metrics-chart"
import Link from "next/link"
import { Plus, BarChart3, Users, Trophy, TrendingUp, Download, Upload } from "lucide-react"

interface LocalSimulation {
  id: string
  name: string
  allocations: Record<string, number>
  totalScore: number
  cityMetrics: any[]
  createdAt: string
}

export default function DashboardPage() {
  const [simulations, setSimulations] = useState<LocalSimulation[]>([])

  useEffect(() => {
    // Load simulations from localStorage
    const savedSimulations = JSON.parse(localStorage.getItem("civicsim-simulations") || "[]")
    setSimulations(savedSimulations)
  }, [])

  const handleDeleteSimulation = (id: string) => {
    const updatedSimulations = simulations.filter((sim) => sim.id !== id)
    setSimulations(updatedSimulations)
    localStorage.setItem("civicsim-simulations", JSON.stringify(updatedSimulations))
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify(simulations, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `civicsim-all-simulations-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string)
        if (Array.isArray(importedData)) {
          const mergedSimulations = [...simulations, ...importedData]
          setSimulations(mergedSimulations)
          localStorage.setItem("civicsim-simulations", JSON.stringify(mergedSimulations))
        }
      } catch (error) {
        console.error("Error importing data:", error)
      }
    }
    reader.readAsText(file)
  }

  // Calculate stats
  const totalSimulations = simulations.length
  const averageScore = simulations.length
    ? Math.round(simulations.reduce((sum, sim) => sum + sim.totalScore, 0) / simulations.length)
    : 0
  const bestScore = simulations.length ? Math.max(...simulations.map((sim) => sim.totalScore)) : 0
  const latestSimulation = simulations[0]

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
              <Badge className="bg-green-100 text-green-800">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleExportData} variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <label>
                <Button variant="ghost" size="sm" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </span>
                </Button>
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>
              <Link href="/simulator">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Simulation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Budget Dashboard</h1>
          <p className="text-lg text-gray-600">Track your budget simulations and civic engagement progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Simulations</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSimulations}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}/100</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Score</p>
                  <p className="text-2xl font-bold text-gray-900">{bestScore}/100</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prototype Mode</p>
                  <p className="text-sm font-bold text-gray-900">Local Storage</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        {latestSimulation && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <BudgetChart allocations={latestSimulation.allocations} type="pie" />
            <MetricsChart metrics={latestSimulation.cityMetrics} title="Latest Simulation Performance" />
          </div>
        )}

        {/* Recent Simulations */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Simulations</h2>
            <Link href="/simulator">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </Link>
          </div>

          {simulations.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulations.slice(0, 6).map((simulation) => (
                <SimulationCard
                  key={simulation.id}
                  simulation={simulation}
                  onEdit={(id) => {
                    // For prototype, just redirect to simulator
                    window.location.href = "/simulator"
                  }}
                  onDelete={handleDeleteSimulation}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No simulations yet</h3>
                <p className="text-gray-600 mb-4">Create your first budget simulation to get started</p>
                <Link href="/simulator">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Start Your First Simulation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/simulator">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">New Simulation</h3>
                <p className="text-sm text-gray-600">Start a fresh budget allocation simulation</p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleExportData}>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Export Data</h3>
              <p className="text-sm text-gray-600">Download all your simulations as JSON</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer opacity-60">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-sm text-gray-600">Connect with other civic-minded citizens</p>
              <Badge className="mt-2 bg-gray-100 text-gray-600">Coming Soon</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
