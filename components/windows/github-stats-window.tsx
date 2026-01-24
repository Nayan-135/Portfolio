"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface Repo {
  name: string
  stars?: number
  language?: string
  url: string
  updatedAt?: string
}

interface GitHubData {
  publicRepos: number
  followers: number
  topRepos: Repo[]
  recentRepos: Repo[]
  dailyCommits: Record<string, number>
  monthlyCommits: Record<string, number>
}

type Mode = "daily" | "monthly"

export function GitHubStatsWindow() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [mode, setMode] = useState<Mode>("monthly")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github")
        const json = await res.json()
        if (json.error) throw new Error()
        setData(json)
        setLoading(false)
      } catch {
        setError("Failed to fetch GitHub stats")
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div className="p-3 text-green-400">Loading GitHub data…</div>
  if (error || !data) return <div className="p-3 text-red-400">{error}</div>

  const source = mode === "daily" ? data.dailyCommits : data.monthlyCommits

  const chartData = Object.entries(source)
    .map(([key, value]) => {
      const date =
        mode === "daily"
          ? new Date(key)
          : new Date(Number(key.split("-")[0]), Number(key.split("-")[1]))

      return {
        label:
          mode === "daily"
            ? date.toLocaleDateString()
            : date.toLocaleString("default", { month: "short", year: "numeric" }),
        commits: value,
      }
    })
    .slice(mode === "daily" ? -30 : -12)

  return (
    <div
      className="w-full h-full p-3 font-mono text-xs overflow-auto"
      style={{ background: "#000", color: "#00aa00", border: "2px solid #00aa00" }}
    >
      <div className="space-y-3">

        <div className="bg-green-400 text-black px-2 font-bold">
          ┌─ GITHUB STATS ───────────────────────┐
        </div>

        <div className="grid grid-cols-2 gap-2 border border-green-800 p-2">
          <p>Repos: {data.publicRepos}</p>
          <p>Followers: {data.followers}</p>
        </div>

        <div className="flex gap-2">
          {(["daily", "monthly"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-2 py-1 border"
              style={{
                backgroundColor: mode === m ? "#00aa00" : "transparent",
                color: mode === m ? "#000" : "#00aa00",
                borderColor: "#00aa00",
              }}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ height: 180 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="label" stroke="#00aa00" />
              <YAxis stroke="#00aa00" />
              <Tooltip />
              <Legend />
              <Line dataKey="commits" stroke="#00aa00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-green-800 p-2">
          <p className="font-bold">Top Repositories</p>
          {data.topRepos.map((r) => (
            <p
              key={r.name}
              className="underline cursor-pointer"
              onClick={() => window.open(r.url, "_blank")}
            >
              {r.name} • ⭐ {r.stars} • {r.language}
            </p>
          ))}
        </div>

        <div className="border border-green-800 p-2">
          <p className="font-bold">Recently Updated</p>
          {data.recentRepos.map((r) => (
            <p
              key={r.name}
              className="underline cursor-pointer"
              onClick={() => window.open(r.url, "_blank")}
            >
              {r.name} •{" "}
              {r.updatedAt && new Date(r.updatedAt).toLocaleDateString()}
            </p>
          ))}
        </div>

        <div className="bg-green-400 text-black text-center text-xs">
          └──────────────────────────────────────┘
        </div>

      </div>
    </div>
  )
}
