"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"

interface UserStatsProps {
  stats: {
    totalSimulations: number
    averageScore: number
    bestScore: number
    currentRank?: number
    totalUsers?: number
    recentActivity: string
  }
}

export function UserStats({ stats }: UserStatsProps) {
  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Expert", color: "bg-green-500", textColor: "text-green-700" }
    if (score >= 80) return { level: "Advanced", color: "bg-blue-500", textColor: "text-blue-700" }
    if (score >= 70) return { level: "Intermediate", color: "bg-yellow-500", textColor: "text-yellow-700" }
    if (score >= 60) return { level: "Beginner", color: "bg-orange-500", textColor: "text-orange-700" }
    return { level: "Novice", color: "bg-red-500", textColor: "text-red-700" }
  }

  const performance = getPerformanceLevel(stats.averageScore)
  const rankPercentile =
    stats.currentRank && stats.totalUsers ? Math.round((1 - stats.currentRank / stats.totalUsers) * 100) : 0

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Total Simulations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalSimulations}</div>
          <p className="text-xs text-gray-500 mt-1">Budget simulations completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Average Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">{stats.averageScore}/100</div>
            <Badge className={`${performance.color} text-white`}>{performance.level}</Badge>
          </div>
          <Progress value={stats.averageScore} className="mt-2 h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Best Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.bestScore}/100</div>
          <p className="text-xs text-gray-500 mt-1">Personal best achievement</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Global Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.currentRank ? (
            <>
              <div className="text-2xl font-bold text-blue-600">#{stats.currentRank}</div>
              <p className="text-xs text-gray-500 mt-1">Top {rankPercentile}% of all users</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-gray-400">--</div>
              <p className="text-xs text-gray-500 mt-1">Complete a simulation to rank</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
