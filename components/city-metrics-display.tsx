"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { CityMetric } from "@/lib/budget-data"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface CityMetricsDisplayProps {
  metrics: CityMetric[]
  previousMetrics?: CityMetric[]
  overallScore: number
}

export function CityMetricsDisplay({ metrics, previousMetrics, overallScore }: CityMetricsDisplayProps) {
  const getMetricChange = (current: CityMetric, previous?: CityMetric) => {
    if (!previous) return 0
    return current.value - previous.value
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-600" />
    if (change < 0) return <TrendingDown className="h-3 w-3 text-red-600" />
    return <Minus className="h-3 w-3 text-gray-400" />
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>City Overall Score</span>
            <Badge className={`${getScoreColor(overallScore)} text-white text-lg px-3 py-1`}>{overallScore}/100</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={overallScore} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {overallScore >= 80 && "Excellent! Your city is thriving across all metrics."}
            {overallScore >= 60 && overallScore < 80 && "Good progress! Some areas need attention."}
            {overallScore < 60 && "Your city faces challenges. Consider reallocating resources."}
          </p>
        </CardContent>
      </Card>

      {/* Individual Metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const previousMetric = previousMetrics?.find((p) => p.id === metric.id)
          const change = getMetricChange(metric, previousMetric)

          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{metric.icon}</span>
                    <h4 className="font-medium">{metric.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {change !== 0 && (
                      <div className="flex items-center space-x-1">
                        {getChangeIcon(change)}
                        <span
                          className={`text-xs font-medium ${
                            change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-400"
                          }`}
                        >
                          {change > 0 ? "+" : ""}
                          {change.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <Badge variant="outline">
                      {metric.value}
                      {metric.unit}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2 mb-2" />
                <p className="text-xs text-gray-600">{metric.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
