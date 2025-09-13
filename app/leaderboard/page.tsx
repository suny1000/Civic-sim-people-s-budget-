"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { UserStats } from "@/components/user-stats"
import Link from "next/link"
import { Trophy, Plus, BarChart3 } from "lucide-react"

interface LocalSimulation {
  id: string
  name: string
  allocations: Record<string, number>
  totalScore: number
  cityMetrics: any[]
  createdAt: string
}

export default function LeaderboardPage() {
  const [simulations, setSimulations] = useState<LocalSimulation[]>([])

  useEffect(() => {
    // Load simulations from localStorage
    const savedSimulations = JSON.parse(localStorage.getItem("civicsim-simulations") || "[]")
    setSimulations(savedSimulations)
  }, [])

  // Create mock leaderboard entries from local simulations
  const leaderboardEntries = simulations
    .map((sim, index) => ({
      id: sim.id,
      rank: index + 1,
      score: sim.totalScore,
      user_id: "local-user",
      created_at: sim.createdAt,
      profiles: {
        full_name: "Local User",
        email: "user@example.com",
      },
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))

  // Calculate user stats
  const totalSimulations = simulations.length
  const averageScore = simulations.length
    ? Math.round(simulations.reduce((sum, sim) => sum + sim.totalScore, 0) / simulations.length)
    : 0
  const bestScore = simulations.length ? Math.max(...simulations.map((sim) => sim.totalScore)) : 0
  const currentRank = leaderboardEntries.length > 0 ? 1 : undefined
  const recentActivity =
    simulations.length > 0 ? new Date(simulations[0].createdAt).toLocaleDateString() : "No activity"

  const userStats = {
    totalSimulations,
    averageScore,
    bestScore,
    currentRank,
    totalUsers: 1, // Just local user in prototype
    recentActivity,
  }

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
              <Badge className="bg-yellow-100 text-yellow-800">
                <Trophy className="h-3 w-3 mr-1" />
                Leaderboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Personal Leaderboard</h1>
          <p className="text-lg text-gray-600">Track your budget simulation progress and achievements</p>
          <Badge className="mt-2 bg-blue-100 text-blue-800">Prototype Mode - Local Data Only</Badge>
        </div>

        {/* User Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Performance</h2>
          <UserStats stats={userStats} />
        </div>

        {/* Leaderboard */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LeaderboardTable entries={leaderboardEntries} currentUserId="local-user" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievement Card */}
            <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <Trophy className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">First Simulation</span>
                  <Badge className={totalSimulations > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                    {totalSimulations > 0 ? "✓" : "○"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Score 80+</span>
                  <Badge className={bestScore >= 80 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                    {bestScore >= 80 ? "✓" : "○"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">5 Simulations</span>
                  <Badge
                    className={totalSimulations >= 5 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                  >
                    {totalSimulations >= 5 ? "✓" : "○"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Perfect Score</span>
                  <Badge className={bestScore === 100 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                    {bestScore === 100 ? "✓" : "○"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle>Improve Your Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>• Balance your budget allocations across all categories</p>
                <p>• Focus on education and healthcare for long-term gains</p>
                <p>• Don't neglect infrastructure - it enables growth</p>
                <p>• Use the AI advisor for personalized tips</p>
                <p>• Experiment with different allocation strategies</p>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Ready to Improve?</h3>
                <p className="text-sm text-gray-600 mb-4">Create a new simulation and beat your best score</p>
                <Link href="/simulator">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Start New Simulation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
