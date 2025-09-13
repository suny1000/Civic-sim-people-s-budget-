// Budget categories and their impact on city metrics
export interface BudgetCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  defaultAllocation: number
}

export interface CityMetric {
  id: string
  name: string
  description: string
  icon: string
  value: number
  maxValue: number
  unit: string
}

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: "education",
    name: "Education",
    description: "Schools, teachers, educational programs",
    icon: "🎓",
    color: "bg-blue-500",
    defaultAllocation: 25,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, public health programs",
    icon: "🏥",
    color: "bg-red-500",
    defaultAllocation: 20,
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Roads, bridges, public transportation",
    icon: "🏗️",
    color: "bg-gray-500",
    defaultAllocation: 15,
  },
  {
    id: "public-safety",
    name: "Public Safety",
    description: "Police, fire department, emergency services",
    icon: "🚔",
    color: "bg-yellow-500",
    defaultAllocation: 12,
  },
  {
    id: "environment",
    name: "Environment",
    description: "Parks, waste management, sustainability",
    icon: "🌳",
    color: "bg-green-500",
    defaultAllocation: 10,
  },
  {
    id: "housing",
    name: "Housing",
    description: "Affordable housing, homeless services",
    icon: "🏠",
    color: "bg-purple-500",
    defaultAllocation: 8,
  },
  {
    id: "arts-culture",
    name: "Arts & Culture",
    description: "Museums, libraries, cultural programs",
    icon: "🎨",
    color: "bg-pink-500",
    defaultAllocation: 5,
  },
  {
    id: "economic-development",
    name: "Economic Development",
    description: "Business support, job training, tourism",
    icon: "💼",
    color: "bg-indigo-500",
    defaultAllocation: 5,
  },
]

export const CITY_METRICS: CityMetric[] = [
  {
    id: "education-quality",
    name: "Education Quality",
    description: "School performance and graduation rates",
    icon: "📚",
    value: 75,
    maxValue: 100,
    unit: "%",
  },
  {
    id: "public-health",
    name: "Public Health",
    description: "Healthcare access and population health",
    icon: "❤️",
    value: 80,
    maxValue: 100,
    unit: "%",
  },
  {
    id: "infrastructure-quality",
    name: "Infrastructure Quality",
    description: "Road conditions and public transit",
    icon: "🛣️",
    value: 65,
    maxValue: 100,
    unit: "%",
  },
  {
    id: "crime-rate",
    name: "Safety Index",
    description: "Public safety and crime prevention",
    icon: "🛡️",
    value: 70,
    maxValue: 100,
    unit: "%",
  },
  {
    id: "environmental-quality",
    name: "Environmental Quality",
    description: "Air quality and green spaces",
    icon: "🌿",
    value: 85,
    maxValue: 100,
    unit: "%",
  },
  {
    id: "housing-affordability",
    name: "Housing Affordability",
    description: "Affordable housing availability",
    icon: "🏘️",
    value: 60,
    maxValue: 100,
    unit: "%",
  },
]

// Calculate city metrics based on budget allocations
export function calculateCityMetrics(allocations: Record<string, number>): CityMetric[] {
  return CITY_METRICS.map((metric) => {
    let newValue = metric.value

    // Simple algorithm: each category affects related metrics
    switch (metric.id) {
      case "education-quality":
        newValue = Math.min(100, 30 + (allocations.education || 0) * 2.5)
        break
      case "public-health":
        newValue = Math.min(100, 40 + (allocations.healthcare || 0) * 2.2)
        break
      case "infrastructure-quality":
        newValue = Math.min(100, 20 + (allocations.infrastructure || 0) * 4)
        break
      case "crime-rate":
        newValue = Math.min(100, 35 + (allocations["public-safety"] || 0) * 4.5)
        break
      case "environmental-quality":
        newValue = Math.min(100, 50 + (allocations.environment || 0) * 4)
        break
      case "housing-affordability":
        newValue = Math.min(100, 20 + (allocations.housing || 0) * 8)
        break
    }

    return { ...metric, value: Math.round(newValue) }
  })
}

// Calculate overall city score
export function calculateCityScore(metrics: CityMetric[]): number {
  const totalScore = metrics.reduce((sum, metric) => sum + metric.value, 0)
  return Math.round(totalScore / metrics.length)
}
