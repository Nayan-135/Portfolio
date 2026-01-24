"use client"

export function ResumeWindow() {
  const handleDownload = () => {
    window.open("/resume/Nayan_Ghate_Resume.pdf", "_blank")
  }

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
            padding: "2px 6px",
            fontWeight: "bold",
          }}
        >
          ┌─ RESUME.DAT ─────────────────────────┐
        </div>

        {/* HEADER */}
        <div style={{ borderLeft: "2px solid #00aa00", paddingLeft: "8px" }}>
          <p className="font-bold text-sm">NAYAN GHATE</p>
          <p>Software Development Engineer | Full Stack | AI</p>
          <p className="text-xs opacity-75">
            📧 ghatenayan5@gmail.com | 📞 +91 7875166676
          </p>
          <p className="text-xs opacity-75">
            🌐 GitHub | LinkedIn | Portfolio
          </p>
        </div>

        {/* SUMMARY */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [PROFESSIONAL_SUMMARY]
          </p>
          <p className="text-xs leading-relaxed">
            Software Development Engineer with strong hands-on experience in
            full-stack web development, backend systems, and AI-driven
            applications. Skilled in building scalable, production-ready
            applications using modern frameworks and cloud fundamentals.
            Demonstrated ability to work in collaborative environments, solve
            complex problems, and deliver end-to-end solutions during industry
            internships and academic projects.
          </p>
        </div>

        {/* EDUCATION */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [EDUCATION]
          </p>
          <p className="font-semibold">
            Shri Ramdeobaba College of Engineering and Management, Nagpur
          </p>
          <p>B.Tech (Honors) in Information Technology</p>
          <p className="text-xs opacity-75">
            2023 – 2027 | CGPA: 8.83
          </p>
        </div>

        {/* EXPERIENCE */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [EXPERIENCE]
          </p>
          <p className="font-semibold">
            Software Engineering Intern – Summer Industry Innovation Internship
          </p>
          <p className="text-xs opacity-75">
            RCOEM Technology Business Incubators Foundation × TechWalnut
            Innovations LLP × IEEE RBU
          </p>
          <p className="text-xs opacity-75">
            May 2025 – August 2025
          </p>

          <ul className="list-disc list-inside text-xs mt-2 space-y-1">
            <li>
              Designed and developed a Font Recognition System using CNNs and
              transfer learning (MobileNetV2) achieving ~93% accuracy.
            </li>
            <li>
              Implemented preprocessing pipelines including image normalization,
              augmentation, and feature extraction.
            </li>
            <li>
              Built model training and evaluation workflows using
              TensorFlow/Keras and OpenCV.
            </li>
            <li>
              Collaborated with mentors and peers, following agile development
              practices and technical documentation.
            </li>
          </ul>
        </div>

        {/* PROJECTS */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [PROJECTS]
          </p>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>
              <b>AI-Based Exam Evaluation Platform</b> – Next.js, Supabase, SQL,
              NLP; automated subjective answer evaluation.
            </li>
            <li>
              <b>FontSense</b> – Deep Learning, CNN, OpenCV; font classification
              system for printed documents.
            </li>
            <li>
              <b>Multimodal Surveillance System</b> – Computer Vision, Audio
              Processing, DL-based event detection.
            </li>
            <li>
              <b>Air Quality Prediction System</b> – Machine Learning regression
              models for AQI forecasting.
            </li>
          </ul>
        </div>

        {/* SKILLS SNAPSHOT */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [TECHNICAL_SKILLS]
          </p>
          <p className="text-xs">
            React, Next.js, JavaScript, TypeScript, Node.js, Flask, MongoDB,
            PostgreSQL, Python, Deep Learning, REST APIs, Git, Docker, AWS
            Fundamentals
          </p>
        </div>

        {/* CERTIFICATIONS */}
        <div style={{ border: "1px solid #004400", padding: "6px" }}>
          <p style={{ color: "#00ff00", fontWeight: "bold", marginBottom: "4px" }}>
            [CERTIFICATIONS]
          </p>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>AWS Academy Graduate – Cloud Foundations</li>
            <li>AWS Academy Graduate – Data Engineering</li>
            <li>IBM, Google, Cisco, MongoDB (Coursera)</li>
          </ul>
        </div>

        {/* DOWNLOAD */}
        <button
          onClick={handleDownload}
          className="w-full mt-2 text-xs font-bold"
          style={{
            backgroundColor: "#00aa00",
            color: "#000",
            padding: "6px",
            border: "1px solid #00aa00",
            cursor: "pointer",
          }}
        >
          ⬇ DOWNLOAD FULL RESUME (PDF)
        </button>

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
