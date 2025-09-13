"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { BUDGET_CATEGORIES } from "@/lib/budget-data"

interface BudgetChartProps {
  allocations: Record<string, number>
  type?: "pie" | "bar"
}

export function BudgetChart({ allocations, type = "pie" }: BudgetChartProps) {
  const data = BUDGET_CATEGORIES.map((category) => ({
    name: category.name,
    value: allocations[category.id] || 0,
    color: category.color.replace("bg-", "").replace("-500", ""),
  }))

  const COLORS = {
    blue: "#3B82F6",
    red: "#EF4444",
    gray: "#6B7280",
    yellow: "#EAB308",
    green: "#22C55E",
    purple: "#A855F7",
    pink: "#EC4899",
    indigo: "#6366F1",
  }

  const getColor = (colorName: string) => {
    return COLORS[colorName as keyof typeof COLORS] || "#6B7280"
  }

  if (type === "bar") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}M`, "Allocation"]} />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value}M`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.color)} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}M`, "Allocation"]} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
