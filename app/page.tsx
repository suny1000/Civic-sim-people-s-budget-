"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComingSoonModal, COMING_SOON_FEATURES } from "@/components/coming-soon-modal"
import Link from "next/link"
import { ArrowRight, Users, TrendingUp, Award, Zap } from "lucide-react"

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleFeatureClick = (featureKey: string) => {
    setSelectedFeature(featureKey)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">CivicSim</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/simulator">
                <Button variant="ghost">Try Simulator</Button>
              </Link>
              <Link href="/dashboard">
                <Button>View Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">🏛️ Participatory Democracy</Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">The People's Budget</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Allocate $100 million in city funds and see real-time consequences on education, healthcare,
              infrastructure, and more. Experience the complexity of civic decision-making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Start Budgeting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/simulator">
                <Button size="lg" variant="outline">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Civic Decision-Making</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make tough budget choices and see their immediate impact on city metrics and citizen satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Impact</h3>
                <p className="text-gray-600 text-sm">
                  See instant changes to city metrics as you adjust budget allocations
                </p>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("community")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                <p className="text-gray-600 text-sm">
                  Compare your budget with others and learn from different approaches
                </p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">Coming Soon</Badge>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("realData")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Data-Driven</h3>
                <p className="text-gray-600 text-sm">Based on real municipal budget data and policy research</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">Enhanced Soon</Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Gamified Learning</h3>
                <p className="text-gray-600 text-sm">Earn points, climb leaderboards, and unlock achievements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Coming Next</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're constantly improving CivicSim with new features to make civic engagement more accessible and
              impactful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("multiplayer")}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Multiplayer Mode</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Collaborate with friends or compete in real-time budget allocation challenges.
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">Q4 2024</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleFeatureClick("advanced")}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Deep dive into budget impacts with advanced modeling and predictive analytics.
                    </p>
                    <Badge className="bg-purple-100 text-purple-800">Q1 2025</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Shape Your City's Future?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of citizens learning about municipal budgeting through hands-on simulation.
          </p>
          <Link href="/simulator">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              Start Your Budget Simulation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CS</span>
                </div>
                <span className="font-bold text-xl">CivicSim</span>
              </div>
              <p className="text-gray-400 text-sm">Empowering citizens through gamified participatory budgeting.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/simulator" className="hover:text-white">
                    Budget Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="hover:text-white">
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Budget Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button onClick={() => handleFeatureClick("community")} className="hover:text-white">
                    Community
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CivicSim. Built for civic engagement and democratic participation.</p>
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      {selectedFeature && (
        <ComingSoonModal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
          feature={COMING_SOON_FEATURES[selectedFeature as keyof typeof COMING_SOON_FEATURES]}
        />
      )}
    </div>
  )
}
