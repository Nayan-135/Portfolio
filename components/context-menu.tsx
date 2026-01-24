"use client"

import { useEffect, useRef } from "react"
import {
  Terminal,
  Info,
  FolderOpen,
  X,
  RotateCcw,
  Briefcase,
  Code,
  Award,
  FileText,
  Github,
  Zap,
} from "lucide-react"
import { playSound } from "@/lib/sound-effects"
import type { WindowType } from "./desktop-environment"

interface ContextMenuProps {
  x: number
  y: number
  onAddWindow: (window: WindowType) => void
  onCloseAll: () => void
  onClose: () => void
  soundEnabled: boolean
}

export function ContextMenu({
  x,
  y,
  onAddWindow,
  onCloseAll,
  onClose,
  soundEnabled,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [onClose])

  const openWindow = (type: WindowType["type"], title: string) => {
    const windowId = `${type}-${Date.now()}`
    onAddWindow({
      id: windowId,
      title,
      type,
      position: { x: x - 300, y: y - 200 },
      size: { width: 700, height: 500 },
      isMinimized: false,
    })
    playSound("windowOpen", soundEnabled)
    onClose()
  }

  const menuItems = [
    // Profile
    { label: "About", icon: Info, action: () => openWindow("about", "About") },
    { label: "Resume", icon: FileText, action: () => openWindow("resume", "Resume") },

    // Dev
    { label: "Skills", icon: Code, action: () => openWindow("skills", "Skills") },
    { label: "Experience", icon: Briefcase, action: () => openWindow("experience", "Experience") },
    { label: "Certificates", icon: Award, action: () => openWindow("certificates", "Certificates") },
    { label: "Projects", icon: FolderOpen, action: () => openWindow("projects", "Projects") },

    // Stats
    { label: "GitHub Stats", icon: Github, action: () => openWindow("github-stats", "GitHub Stats") },
    {
      label: "LeetCode Stats",
      icon: Zap,
      action: () => openWindow("leetcode-stats", "LeetCode Stats"),
    },

    { label: "divider", icon: null, action: () => {} },

    // System
    { label: "Terminal", icon: Terminal, action: () => openWindow("terminal", "Terminal") },
    { label: "System Info", icon: Info, action: () => openWindow("system-info", "System Info") },

    { label: "divider", icon: null, action: () => {} },

    // Actions
    {
      label: "Refresh",
      icon: RotateCcw,
      action: () => window.location.reload(),
    },
    {
      label: "Close All Windows",
      icon: X,
      action: () => {
        onCloseAll()
        onClose()
      },
    },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl z-50 py-1 min-w-52 animate-in fade-in zoom-in-95"
      style={{
        left: `${Math.min(x, window.innerWidth - 220)}px`,
        top: `${Math.min(y, window.innerHeight - 350)}px`,
      }}
    >
      {menuItems.map((item, i) =>
        item.label === "divider" ? (
          <div key={i} className="h-px bg-slate-700/50 my-1" />
        ) : (
          <button
            key={i}
            onClick={item.action}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-200 hover:bg-blue-600/30 transition-colors text-left group"
          >
            {item.icon && (
              <item.icon
                size={16}
                className="text-blue-400 group-hover:text-blue-300 transition-colors"
              />
            )}
            <span className="group-hover:translate-x-0.5 transition-transform">
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  )
}
