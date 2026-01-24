"use client"
import Image from "next/image"

export function AboutWindow() {
  return (
    <div
      className="w-full h-full overflow-auto p-4 font-mono text-sm"
      style={{ backgroundColor: "#000000", color: "#00aa00", border: "2px solid #00aa00" }}
    >
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#00aa00",
          color: "#000000",
          padding: "4px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        ┌─ ABOUT ─────────────────────────────┐
      </div>

      <div className="space-y-4">
        {/* Profile Section */}
        <div style={{ border: "1px solid #004400", padding: "8px" }}>
          <div className="text-center mb-4">
            <div
              className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4"
              style={{ border: "2px solid #00aa00" }}
            >
              <Image
                src="/photo.png"
                alt="Nayan Ghate"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div style={{ color: "#00aa00" }}>
              <p className="text-lg font-bold">Nayan Ghate</p>
              <p className="text-sm">Computer Science Student</p>
              <p className="text-xs">Full-Stack Web Developer</p>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div style={{ border: "1px solid #004400", padding: "8px" }}>
          <p style={{ color: "#00aa00", marginBottom: "8px" }}>About Me</p>
          <p className="text-xs leading-relaxed">
            Results-driven Computer Science student specializing in full-stack
            web development and software engineering. Passionate about building
            scalable, maintainable applications using modern technologies.
          </p>
          <p className="text-xs leading-relaxed mt-2">
            Strong foundation in data structures, algorithms, and problem-solving,
            with hands-on experience in real-world projects and collaborative
            development.
          </p>
        </div>

        {/* Core Competencies */}
        <div style={{ border: "1px solid #004400", padding: "8px" }}>
          <p style={{ color: "#00aa00", marginBottom: "4px" }}>Core Competencies</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              "React & Next.js",
              "Database Systems",
              "AWS",
              "DevSecOps",
              "DSA & Algorithms",
            ].map((skill) => (
              <div
                key={skill}
                style={{
                  color: "#00aa00",
                  borderLeft: "2px solid #004400",
                  paddingLeft: "4px",
                }}
              >
                ▸ {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ border: "1px solid #004400", padding: "8px" }}>
          <p style={{ color: "#00aa00", marginBottom: "4px" }}>Quick Stats</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div>
              <p className="font-bold">8.9</p>
              <p className="text-[10px]">GPA</p>
            </div>
            <div>
              <p className="font-bold">10+</p>
              <p className="text-[10px]">Projects</p>
            </div>
            <div>
              <p className="font-bold">1+</p>
              <p className="text-[10px]">Years Coding</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ border: "1px solid #004400", padding: "8px" }}>
          <p style={{ color: "#00aa00", marginBottom: "4px" }}>Get In Touch</p>
          <div className="space-y-2 text-xs">
            <a href="mailto:ghatenayan5@gmail.com" className="hover:underline">
              {">"} EMAIL: ghatenayan5@gmail.com
            </a>
            <a
              href="https://github.com/Nayan-135"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {">"} GITHUB: github.com/Nayan-135
            </a>
            <a
              href="www.linkedin.com/in/nayan-ghate-720273321"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {">"} LINKEDIN: linkedin.com/in/nayan-ghate-720273321
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#00aa00",
            color: "#000000",
            padding: "4px",
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
