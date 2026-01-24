"use client"

import { useState, useEffect } from "react"

export function SystemInfoWindow() {
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const systemInfo = [
    { label: "OS Name", value: "Portfolio OS" },
    { label: "User", value: "Software Engineer Student" },
    { label: "System Version", value: "1.0.0" },
    { label: "Uptime", value: formatUptime(uptime) },
    { label: "Kernel", value: "React 19 on Next.js 16" },
    { label: "Build System", value: "Turbopack" },
    { label: "UI Framework", value: "Tailwind CSS v4" },
  ]

  const skills = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Next.js",
    "Node.js",
    "Web Design",
    "UI/UX",
    "Performance Optimization",
  ]

  const projects = [
    { name: "E-Commerce Platform", tech: ["React", "Node.js", "MongoDB"] },
    { name: "Design System", tech: ["TypeScript", "Tailwind CSS", "React"] },
    { name: "Analytics Dashboard", tech: ["Next.js", "TypeScript", "Chart.js"] },
  ]

  return (
    <div className="w-full h-full overflow-auto bg-slate-950 text-foreground p-6 font-mono">
      <div className="space-y-8 max-w-2xl">
        {/* System Info Section */}
        <section>
          <h2 className="text-lg font-bold text-primary mb-4">System Information</h2>
          <div className="space-y-3 text-sm">
            {systemInfo.map((item) => (
              <div key={item.label} className="flex justify-between gap-8">
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-lg font-bold text-primary mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded text-sm border border-primary/40"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-lg font-bold text-primary mb-4">Project Count</h2>
          <div className="text-foreground/80">
            <p className="text-2xl font-bold text-primary mb-4">{projects.length} projects</p>
            <div className="space-y-3 text-sm">
              {projects.map((project) => (
                <div key={project.name} className="p-3 bg-slate-900 rounded border border-border">
                  <p className="font-semibold text-foreground mb-2">{project.name}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
