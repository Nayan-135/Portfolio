"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Bell } from "lucide-react"

interface StatusBarProps {
  soundEnabled: boolean
  onSoundToggle: (enabled: boolean) => void
  activeWindowTitle: string
}

export function StatusBar({ soundEnabled, onSoundToggle, activeWindowTitle }: StatusBarProps) {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-10 flex items-center justify-between px-3 relative z-40 text-xs font-mono"
      style={{
        backgroundColor: "#00aa00",
        color: "#000000",
        borderTop: "2px solid #004400",
      }}
    >
      {/* Left - Portfolio OS name */}
      <div className="flex items-center gap-2">
        <span>▣</span>
        <span>Portfolio OS</span>
      </div>

      {/* Center - Active window */}
      <div className="flex-1 text-center">{activeWindowTitle}</div>

      {/* Right - Time and controls */}
      <div className="flex items-center gap-3">
        <span>{time}</span>
        <button
          onClick={() => onSoundToggle(!soundEnabled)}
          className="p-1 transition-colors"
          title={soundEnabled ? "Mute" : "Unmute"}
          style={{
            backgroundColor: soundEnabled ? "#004400" : "#664400",
            color: "#000000",
            border: "1px solid #000000",
          }}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>
        <button
          className="p-1 transition-colors"
          title="Notifications"
          style={{
            backgroundColor: "#004400",
            color: "#000000",
            border: "1px solid #000000",
          }}
        >
          <Bell size={14} />
        </button>
      </div>
    </div>
  )
}
