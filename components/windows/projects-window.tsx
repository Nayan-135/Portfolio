"use client"

import { useEffect, useState } from "react"

interface Project {
  name: string
  description: string
  language: string
  stars: number
  updatedAt: string
  url: string
}

export function ProjectsWindow() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/github/repos")
        const json = await res.json()

        if (json.error) throw new Error(json.error)

        setProjects(json.projects)
        setLoading(false)
      } catch {
        setError("Failed to load projects")
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div
      className="w-full h-full overflow-auto p-3 font-mono text-xs"
      style={{ backgroundColor: "#000", color: "#00aa00" }}
    >
      <div
        style={{
          borderBottom: "1px solid #004400",
          marginBottom: "10px",
          paddingBottom: "5px",
          fontWeight: "bold",
          color: "#00ff00",
        }}
      >
        PROJECTS.DAT
      </div>

      {loading ? (
        <p>Loading GitHub projects…</p>
      ) : error ? (
        <p style={{ color: "#ff4444" }}>{error}</p>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {projects.map((project) => (
            <div
              key={project.name}
              style={{
                padding: "8px",
                border: "1px solid #004400",
                backgroundColor: "#000",
              }}
            >
              <div
                className="cursor-pointer underline"
                style={{
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#00ff00",
                  marginBottom: "4px",
                }}
                onClick={() => window.open(project.url, "_blank")}
              >
                {project.name}
              </div>

              <p style={{ fontSize: "10px", marginBottom: "6px" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                <span
                  style={{
                    padding: "2px 4px",
                    backgroundColor: "#004400",
                    border: "1px solid #00aa00",
                    fontSize: "9px",
                  }}
                >
                  {project.language}
                </span>
                <span
                  style={{
                    padding: "2px 4px",
                    backgroundColor: "#004400",
                    border: "1px solid #00aa00",
                    fontSize: "9px",
                  }}
                >
                  ⭐ {project.stars}
                </span>
              </div>

              <p style={{ fontSize: "9px", opacity: 0.8 }}>
                Updated: {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
