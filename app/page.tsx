"use client"

import { useState, useEffect } from "react"
import { BootScreen } from "@/components/boot-screen"
import { DesktopEnvironment } from "@/components/desktop-environment"

export default function Home() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!booted) return

      // Esc -> close active window
      if (e.key === "Escape") {
        // Handled in desktop context
      }
      // Ctrl+W -> close active window
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault()
      }
      // Ctrl+Shift+C -> close all windows
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault()
      }
      // Ctrl+Alt+T -> open terminal
      if (e.ctrlKey && e.altKey && e.key === "t") {
        e.preventDefault()
      }
      // Ctrl+Alt+I -> open system info
      if (e.ctrlKey && e.altKey && e.key === "i") {
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [booted])

  return (
    <main className="w-full h-screen overflow-hidden" style={{ backgroundColor: "#000000" }}>
      {!booted ? <BootScreen onBootComplete={() => setBooted(true)} /> : <DesktopEnvironment />}
    </main>
  )
}
