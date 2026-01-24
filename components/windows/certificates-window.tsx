"use client"

export function CertificatesWindow() {
  const certificates = [
    {
      name: "AWS Academy Graduate – Cloud Foundations",
      issuer: "Amazon Web Services (AWS Academy)",
      date: "June 2025",
      hours: "20 Hours",
      link: "https://www.credly.com/go/Q9KTElbQ",
    },
    {
      name: "AWS Academy Graduate – Data Engineering",
      issuer: "Amazon Web Services (AWS Academy)",
      date: "June 2025",
      hours: "40 Hours",
      link: "https://www.credly.com/go/oHNXPHcI",
    },
    {
      name: "Industrial Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      date: "December 2025",
    },
    {
      name: "Networking Basics",
      issuer: "Cisco Networking Academy",
      date: "December 2025",
    },
    {
      name: "Networking Devices and Basic Configuration",
      issuer: "Cisco Networking Academy",
      date: "December 2025",
    },
    {
      name: "Network Support and Security",
      issuer: "Cisco Networking Academy",
      date: "December 2025",
    },
    {
      name: "Introduction to Cybersecurity for Business",
      issuer: "University of Colorado – Coursera",
      date: "September 2024",
      link: "https://coursera.org/verify/EYAJM2YOS3XI",
    },
    {
      name: "Cybersecurity Architecture",
      issuer: "IBM – Coursera",
      date: "August 2024",
      link: "https://coursera.org/verify/HVZZIJWRHF98",
    },
    {
      name: "Cybersecurity Foundations for Risk Management",
      issuer: "Kennesaw State University – Coursera",
      date: "August 2024",
      link: "https://coursera.org/verify/3N33RMQBZQ8G",
    },
    {
      name: "DDoS Attacks and Defenses",
      issuer: "University of Colorado – Coursera",
      date: "August 2024",
      link: "https://coursera.org/verify/8FC25DM1POEM",
    },
    {
      name: "Crash Course on Python",
      issuer: "Google – Coursera",
      date: "November 2023",
      link: "https://coursera.org/verify/PSLM2G6M6R52",
    },
    {
      name: "HTML, CSS, and JavaScript for Web Developers",
      issuer: "Johns Hopkins University – Coursera",
      date: "December 2023",
      link: "https://coursera.org/verify/YM7K7SKZYSHE",
    },
    {
      name: "Blockchain Basics",
      issuer: "University at Buffalo (SUNY) – Coursera",
      date: "October 2025",
      link: "https://coursera.org/verify/4LVJZ7CZG8Q2",
    },
    {
      name: "Blockchain Platforms",
      issuer: "University at Buffalo (SUNY) – Coursera",
      date: "October 2025",
      link: "https://coursera.org/verify/EMHIW3ND2Q16",
    },
    {
      name: "Smart Contracts",
      issuer: "University at Buffalo (SUNY) – Coursera",
      date: "October 2025",
      link: "https://coursera.org/verify/MLP847MK8VU0",
    },
    {
      name: "Developing Back-End Apps with Node.js and Express",
      issuer: "IBM – Coursera",
      date: "March 2025",
      link: "https://coursera.org/verify/P01Y7ZFOHQSM",
    },
    {
      name: "MongoDB Aggregation Framework",
      issuer: "MongoDB Inc. – Coursera",
      date: "March 2025",
      link: "https://coursera.org/verify/ICTGYPJBUMR1",
    },
  ]

  return (
    <div
      className="w-full h-full overflow-auto p-4 font-mono text-xs"
      style={{ backgroundColor: "#000", color: "#00aa00", border: "2px solid #00aa00" }}
    >
      <div className="space-y-3">

        <div style={{ backgroundColor: "#00aa00", color: "#000", padding: "2px 6px", fontWeight: "bold" }}>
          ┌─ CERTIFICATIONS.DAT ─────────────────────────┐
        </div>

        {certificates.map((cert, i) => (
          <div key={i} style={{ border: "1px solid #004400", padding: "6px" }}>
            <p style={{ color: "#00ff00", fontWeight: "bold" }}>{cert.name}</p>
            <p>{cert.issuer}</p>

            <div className="flex justify-between mt-2 text-xs opacity-75">
              <span>{cert.date}</span>
              {cert.hours && <span>{cert.hours}</span>}
            </div>

            {cert.link && (
              <p
                className="underline cursor-pointer mt-1"
                onClick={() => window.open(cert.link, "_blank")}
              >
                Verify Certificate
              </p>
            )}
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
          └──────────────────────────────────────────────┘
        </div>

      </div>
    </div>
  )
}
