"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import type { CityMetric } from "@/lib/budget-data"

interface MetricsChartProps {
  metrics: CityMetric[]
  title?: string
}

export function MetricsChart({ metrics, title = "City Performance Metrics" }: MetricsChartProps) {
  const data = metrics.map((metric) => ({
    metric: metric.name.replace(" ", "\n"),
    value: metric.value,
    fullValue: metric.maxValue,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" fontSize={12} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} tickCount={6} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
