"use client"

export function SkillsWindow() {
  const skillCategories = [
    {
      category: "FRONTEND",
      skills: [
        "React",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Lucide React",
      ],
    },
    {
      category: "BACKEND",
      skills: [
        "Node.js",
        "Express.js",
        "Flask",
        "REST APIs",
        "MongoDB",
        "PostgreSQL",
        "MongoDB Aggregation Framework",
      ],
    },
    {
      category: "DATA_AI",
      skills: [
        "Python",
        "SQL",
        "Deep Learning (Fundamentals)",
        "Data Engineering (Basics)",
      ],
    },
    {
      category: "CLOUD_DEVOPS",
      skills: [
        "AWS Cloud Fundamentals",
        "Docker",
        "Git",
        "GitHub",
        "CI/CD Basics",
        "Linux",
      ],
    },
    {
      category: "CYBERSECURITY_NETWORKING",
      skills: [
        "Networking Basics",
        "Network Support & Security",
        "Cybersecurity Architecture",
        "Risk Management",
        "DDoS Attacks & Defenses",
        "Industrial Cybersecurity (Fundamentals)",
      ],
    },
    {
      category: "SOFT_SKILLS",
      skills: [
        "Problem Solving",
        "Team Collaboration",
        "Communication",
        "Project Management",
        "Technical Documentation",
      ],
    },
  ]

  return (
    <div
      className="w-full h-full overflow-auto p-4 font-mono text-sm"
      style={{
        backgroundColor: "#000",
        color: "#00aa00",
        border: "2px solid #00aa00",
      }}
    >
      <div className="space-y-3">

        <div
          style={{
            backgroundColor: "#00aa00",
            color: "#000",
            padding: "4px",
            fontWeight: "bold",
          }}
        >
          ┌─ SKILLS.INVENTORY ──────────────────┐
        </div>

        {skillCategories.map((cat, i) => (
          <div key={i} style={{ border: "1px solid #004400", padding: "6px" }}>
            <p
              style={{
                color: "#00ff00",
                marginBottom: "4px",
                fontWeight: "bold",
              }}
            >
              [{cat.category}]
            </p>

            <div className="space-y-1">
              {cat.skills.map((skill) => (
                <div key={skill} className="text-xs">
                  ▪ {skill}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: "#00aa00",
            color: "#000",
            padding: "4px",
            textAlign: "center",
            fontSize: "11px",
          }}
        >
          └───────────────────────────────────┘
        </div>

      </div>
    </div>
  )
}
