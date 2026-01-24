"use client"

export function ExperienceWindow() {
  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "RCOEM Technology Business Incubators Foundation & Techwalnut Innovations LLP, Nagpur",
      period: "May 2025 – August 2025",
      description:
        "Completed a Summer Internship Program focused on real-world software development. Worked on building web applications and technical solutions using modern frontend, backend, and AI technologies. Collaborated with mentors and peers in a team-based environment while solving practical engineering problems.",
      skills: [
        "React",
        "Lucid React",
        "Flask",
        "Deep Learning",
        "Problem Solving",
        "Team Collaboration",
      ],
    },
    {
      role: "Cloud & Data Engineering Virtual Intern",
      company: "AWS Academy",
      period: "June 2025",
      description:
        "Completed AWS Academy virtual internship programs covering cloud computing fundamentals and data engineering concepts. Gained hands-on exposure to AWS services, cloud architecture, data pipelines, and industry best practices through guided labs and assessments.",
      skills: [
        "AWS Cloud Fundamentals",
        "Data Engineering Basics",
        "Cloud Architecture",
        "Hands-on Labs",
        "Virtual Internship",
      ],
    },
  ]

  return (
    <div
      className="w-full h-full overflow-auto p-4 font-mono text-xs"
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
            padding: "2px 4px",
            fontWeight: "bold",
          }}
        >
          ┌─ EXPERIENCE.LOG ─────────────────────┐
        </div>

        {experiences.map((exp, i) => (
          <div key={i} style={{ border: "1px solid #004400", padding: "6px" }}>
            <p className="font-semibold" style={{ color: "#00ff00" }}>
              {exp.role}
            </p>
            <p>{exp.company}</p>
            <p className="text-xs opacity-75">{exp.period}</p>

            <p className="text-xs leading-relaxed mt-2">
              {exp.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-1">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs"
                  style={{
                    backgroundColor: "#004400",
                    padding: "2px 4px",
                    border: "1px solid #00aa00",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            backgroundColor: "#00aa00",
            color: "#000",
            padding: "2px 4px",
            textAlign: "center",
            fontSize: "11px",
          }}
        >
          └──────────────────────────────────────┘
        </div>

      </div>
    </div>
  )
}
