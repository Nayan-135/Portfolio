"use client"

import type { ReactNode } from "react"

export function MonitorFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex items-center justify-center font-mono" style={{ backgroundColor: "#000000" }}>
      {/* Monitor bezel - matching boot screen styling */}
      <div className="rounded-3xl shadow-2xl overflow-hidden" style={{ width: "90%", maxWidth: "1440px", aspectRatio: "16/10", backgroundColor: "#1a1a1a", border: "8px solid #1a1a1a" }}>
        {/* Screen */}
        <div className="w-full h-full" style={{ backgroundColor: "#000000" }}>{children}</div>

        {/* Monitor stand */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-16 rounded-t-2xl" style={{ backgroundColor: "#1a1a1a" }}></div>
      </div>
    </div>
  )
}
