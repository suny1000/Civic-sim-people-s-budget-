"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Edit, Trash2 } from "lucide-react"

interface SimulationCardProps {
  simulation: {
    id: string
    simulation_name: string
    total_score: number
    created_at: string
    allocations: Record<string, number>
    city_metrics: any[]
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function SimulationCard({ simulation, onEdit, onDelete }: SimulationCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const totalAllocated = Object.values(simulation.allocations).reduce((sum, value) => sum + value, 0)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{simulation.simulation_name}</CardTitle>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(simulation.created_at)}
            </div>
          </div>
          <Badge className={`${getScoreColor(simulation.total_score)} text-white`}>{simulation.total_score}/100</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Score</span>
            <span>{simulation.total_score}%</span>
          </div>
          <Progress value={simulation.total_score} className="h-2" />
        </div>

        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Budget Allocated:</span>
            <span className="font-mono">${totalAllocated.toFixed(1)}M</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(simulation.id)} className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(simulation.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
