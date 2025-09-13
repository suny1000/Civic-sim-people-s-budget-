"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown } from "lucide-react"

interface LeaderboardEntry {
  id: string
  rank: number
  score: number
  user_id: string
  created_at: string
  profiles: {
    full_name: string
    email: string
  }
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId?: string
}

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Award className="h-5 w-5 text-gray-300" />
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-yellow-100 text-yellow-800 border-yellow-200",
        2: "bg-gray-100 text-gray-800 border-gray-200",
        3: "bg-amber-100 text-amber-800 border-amber-200",
      }
      return colors[rank as keyof typeof colors]
    }
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 font-bold"
    if (score >= 80) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    if (score >= 60) return "text-orange-600"
    return "text-red-600"
  }

  const getInitials = (name: string, email: string) => {
    if (name && name.trim()) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                entry.user_id === currentUserId
                  ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getRankIcon(entry.rank)}
                  <Badge className={`${getRankBadge(entry.rank)} border font-mono`}>#{entry.rank}</Badge>
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                    {getInitials(entry.profiles.full_name, entry.profiles.email)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium text-gray-900">
                    {entry.profiles.full_name || entry.profiles.email}
                    {entry.user_id === currentUserId && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">You</Badge>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>{entry.score}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No leaderboard entries yet.</p>
              <p className="text-sm">Be the first to submit a budget simulation!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
