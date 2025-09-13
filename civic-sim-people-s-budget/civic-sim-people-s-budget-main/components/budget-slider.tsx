"use client"

import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BudgetCategory } from "@/lib/budget-data"

interface BudgetSliderProps {
  category: BudgetCategory
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function BudgetSlider({ category, value, onChange, disabled }: BudgetSliderProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(1)}M`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white text-lg`}
            >
              {category.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="font-mono">
            {formatCurrency(value)}
          </Badge>
        </div>

        <div className="space-y-3">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={50}
            min={0}
            step={0.5}
            disabled={disabled}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0M</span>
            <span>$50M</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
