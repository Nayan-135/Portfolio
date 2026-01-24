"use client"

import { useState, useEffect } from "react"

export function BootScreen({ onBootComplete }: { onBootComplete: () => void }) {
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const bootMessages = [
    "Award BIOS v1.88",
    "Copyright (C) 1985-1993 Award Software, Inc.",
    "",
    "Memory Test: 256K OK",
    "Initializing CPU...",
    "Loading Portfolio OS v1.0...",
    "Checking System Files...",
    "Mounting directories...",
    "Starting Desktop Environment...",
  ]

  useEffect(() => {
    if (!started) return

    // Simulate boot sequence with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 300)

    return () => clearInterval(interval)
  }, [started])

  useEffect(() => {
    if (!started) return

    // Cycle through boot messages
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev >= bootMessages.length - 1) {
          setTimeout(onBootComplete, 500)
          return prev
        }
        return prev + 1
      })
    }, 400)

    return () => clearInterval(interval)
  }, [started, onBootComplete])

  const displayProgress = Math.min(Math.round(progress), 100)

  return (
    <div className="w-full h-full flex items-center justify-center font-mono" style={{ backgroundColor: "#000000" }}>
      {/* Monitor bezel */}
      <div className="rounded-3xl shadow-2xl overflow-hidden" style={{ width: "90%", maxWidth: "1440px", aspectRatio: "16/10", backgroundColor: "#1a1a1a", border: "8px solid #1a1a1a" }}>
        {!started ? (
          // Click to start screen
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-8 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setStarted(true)}
            onKeyDown={(e) => e.key === "Enter" && setStarted(true)}
            role="button"
            tabIndex={0}
            style={{ backgroundColor: "#000000", color: "#00aa00" }}
          >
            <div className="text-center">
              <div className="text-2xl mb-4 tracking-wider">PORTFOLIO OS v1.0</div>
              <div className="text-sm mb-8 opacity-75">Press ENTER or CLICK to start boot sequence</div>
              <div className="animate-pulse text-xl">►</div>
            </div>
          </div>
        ) : (
          // Monitor screen
          <div
            className="w-full h-full flex flex-col justify-center px-8 text-sm"
            style={{ backgroundColor: "#000000", color: "#00aa00" }}
          >
            {bootMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${index <= currentMessage ? "opacity-100" : "opacity-0"} transition-opacity`}
              >
                {message === "" ? (
                  <br />
                ) : (
                  <>
                    {message}
                    {index === currentMessage && <span className="animate-pulse">_</span>}
                  </>
                )}
              </div>
            ))}

            {/* Progress bar section */}
            <div className="mt-8 mb-4">
              <div className="border-2 border-green-700" style={{ borderColor: "#00aa00", height: "20px" }}>
                <div
                  className="h-full transition-all duration-300 flex items-center justify-center text-xs font-bold"
                  style={{
                    width: `${displayProgress}%`,
                    backgroundColor: "#00aa00",
                    color: "#000000",
                  }}
                >
                  {displayProgress > 10 && `${displayProgress}%`}
                </div>
              </div>
            </div>

            {/* Boot status */}
            <div className="text-center mt-4">
              <div>System Ready. Press any key to continue...</div>
              <div className="mt-4 text-xs opacity-75">Portfolio OS v1.0 © 1991-2024</div>
            </div>
          </div>
        )}

        {/* Monitor stand */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-16 rounded-t-2xl" style={{ backgroundColor: "#1a1a1a" }}></div>
      </div>
    </div>
  )
}
