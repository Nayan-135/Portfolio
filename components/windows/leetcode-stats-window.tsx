"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

interface Stats {
  easy: number
  medium: number
  hard: number
  calendar: Record<string, number>
}

export function LeetCodeStatsWindow() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/leetcode")
        const data = await res.json()

        if (data.error) throw new Error()

        setStats(data)
        setLoading(false)
      } catch {
        setError("Failed to fetch LeetCode stats")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="p-3 text-green-400">Loading LeetCode data…</div>
  }

  if (error || !stats) {
    return <div className="p-3 text-red-400">{error}</div>
  }

  const total = stats.easy + stats.medium + stats.hard

  const difficultyData = [
    { name: "Easy", value: stats.easy },
    { name: "Medium", value: stats.medium },
    { name: "Hard", value: stats.hard },
  ]

  const COLORS = ["#00ff00", "#ffaa00", "#ff4444"]

  // ✅ MONTHLY aggregation (NOT daily)
  const monthlyMap: Record<string, number> = {}

  Object.entries(stats.calendar).forEach(([ts, count]) => {
    const date = new Date(Number(ts) * 1000)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    monthlyMap[key] = (monthlyMap[key] || 0) + count
  })

  const monthlyData = Object.entries(monthlyMap)
    .map(([key, count]) => {
      const [year, month] = key.split("-").map(Number)
      return {
        month: new Date(year, month).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        count,
      }
    })
    .slice(-12)

  return (
    <div
      className="w-full h-full overflow-auto p-3 font-mono text-xs"
      style={{
        backgroundColor: "#000",
        color: "#00ff00",
        border: "2px solid #00ff00",
      }}
    >
      <div className="space-y-3">

        <div className="bg-green-400 text-black px-2 font-bold">
          ┌─ LEETCODE STATS ──────────────────────┐
        </div>

        <div className="border border-green-800 p-2">
          <p>Total Solved: {total}</p>
          <p>Easy: {stats.easy}</p>
          <p>Medium: {stats.medium}</p>
          <p>Hard: {stats.hard}</p>
        </div>

        <div style={{ height: 160 }}>
          <ResponsiveContainer>
            <BarChart data={difficultyData}>
              <XAxis dataKey="name" stroke="#00ff00" />
              <YAxis stroke="#00ff00" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00ff00" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: 160 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={difficultyData} dataKey="value" outerRadius={60} label>
                {difficultyData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: 170 }}>
          <ResponsiveContainer>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" stroke="#00ff00" />
              <YAxis stroke="#00ff00" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00ff00"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-green-400 text-black text-center text-xs">
          └────────────────────────────────────────┘
        </div>

      </div>
    </div>
  )
}
