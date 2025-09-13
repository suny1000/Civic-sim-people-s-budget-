"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface BudgetSummaryProps {
  allocations: Record<string, number>
  totalBudget: number
}

export function BudgetSummary({ allocations, totalBudget }: BudgetSummaryProps) {
  const totalAllocated = Object.values(allocations).reduce((sum, value) => sum + value, 0)
  const remaining = totalBudget - totalAllocated
  const isOverBudget = totalAllocated > totalBudget
  const isComplete = Math.abs(remaining) < 0.1

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toFixed(1)}M`
  }

  return (
    <Card
      className={`border-2 ${
        isOverBudget
          ? "border-red-200 bg-red-50"
          : isComplete
            ? "border-green-200 bg-green-50"
            : "border-yellow-200 bg-yellow-50"
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Budget Summary</span>
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertTriangle className={`h-5 w-5 ${isOverBudget ? "text-red-600" : "text-yellow-600"}`} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Budget:</span>
          <Badge variant="outline" className="font-mono">
            {formatCurrency(totalBudget)}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Allocated:</span>
          <Badge variant="outline" className="font-mono">
            {formatCurrency(totalAllocated)}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{remaining >= 0 ? "Remaining:" : "Over Budget:"}</span>
          <Badge
            className={`font-mono ${
              isOverBudget
                ? "bg-red-100 text-red-800"
                : isComplete
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(remaining)}`}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Budget Usage</span>
            <span>{((totalAllocated / totalBudget) * 100).toFixed(1)}%</span>
          </div>
          <Progress
            value={Math.min((totalAllocated / totalBudget) * 100, 100)}
            className={`h-2 ${isOverBudget ? "[&>div]:bg-red-500" : ""}`}
          />
        </div>

        {isOverBudget && (
          <p className="text-xs text-red-600 bg-red-100 p-2 rounded">
            You're over budget! Reduce allocations to stay within ${totalBudget}M.
          </p>
        )}

        {isComplete && (
          <p className="text-xs text-green-600 bg-green-100 p-2 rounded">
            Perfect! You've allocated the full budget efficiently.
          </p>
        )}

        {!isComplete && !isOverBudget && remaining > 0.1 && (
          <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded">
            You have {formatCurrency(remaining)} left to allocate.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
