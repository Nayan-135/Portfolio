"use client"

import {
  FileText,
  Terminal,
  Info,
  FolderOpen,
  Award,
  Briefcase,
  Code,
  Github,
  Zap,
} from "lucide-react"
import { playSound } from "@/lib/sound-effects"
import type { WindowType } from "./desktop-environment"

interface DesktopIconsProps {
  onAddWindow: (window: WindowType) => void
  soundEnabled: boolean
}

const icons = [
  { id: "about", label: "About", icon: Info, type: "about" as const },
  { id: "skills", label: "Skills", icon: Code, type: "skills" as const },
  { id: "resume", label: "Resume", icon: FileText, type: "resume" as const },
  { id: "experience", label: "Experience", icon: Briefcase, type: "experience" as const },
  { id: "certificates", label: "Certificates", icon: Award, type: "certificates" as const },
  { id: "projects", label: "Projects", icon: FolderOpen, type: "projects" as const },
  { id: "github-stats", label: "GitHub Stats", icon: Github, type: "github-stats" as const },

  // ✅ FIXED: LeetCode icon + correct window type
  { id: "leetcode", label: "LeetCode", icon: Zap, type: "leetcode-stats" as const },

  { id: "terminal", label: "Terminal", icon: Terminal, type: "terminal" as const },
]

export function DesktopIcons({ onAddWindow, soundEnabled }: DesktopIconsProps) {
  const handleIconClick = (icon: (typeof icons)[0]) => {
    const windowId = `${icon.type}-${Date.now()}`

    const newWindow: WindowType = {
      id: windowId,
      title: icon.label,
      type: icon.type,
      position: { x: 400, y: 80 },
      size: { width: 700, height: 500 },
      isMinimized: false,
    }

    onAddWindow(newWindow)
    playSound("windowOpen", soundEnabled)
  }

  return (
    <div
      className="w-27 border-r p-2 flex flex-col gap-3 overflow-y-auto"
      style={{
        backgroundColor: "#000",
        borderColor: "#004400",
        borderWidth: "2px",
      }}
    >
      {icons.map((icon, index) => (
        <button
          key={icon.id}
          onClick={() => handleIconClick(icon)}
          className="flex h- flex-col items-center  gap-1 p-2 transition-all active:scale-95"
          style={{
            backgroundColor: "#000",
            border: "1px solid #004400",
            color: "#00aa00",
            cursor: "pointer",
            animation: `slideUp 0.3s ease-out ${index * 0.05}s both`,
          }}
          title={icon.label}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#004400"
            e.currentTarget.style.color = "#00ff00"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#000"
            e.currentTarget.style.color = "#00aa00"
          }}
        >
          <icon.icon size={20} />
          <span className="text-xs text-center whitespace-normal break-words">
            {icon.label}
          </span>
        </button>
      ))}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
