"use client"

import { useState } from "react"
import { DraggableWindow } from "./draggable-window"

import { TerminalWindow } from "./windows/terminal-window"
import { SystemInfoWindow } from "./windows/system-info-window"
import { ProjectsWindow } from "./windows/projects-window"
import { AboutWindow } from "./windows/about-window"
import { ResumeWindow } from "./windows/resume-window"
import { ExperienceWindow } from "./windows/experience-window"
import { CertificatesWindow } from "./windows/certificates-window"
import { SkillsWindow } from "./windows/skills-window"
import { GitHubStatsWindow } from "./windows/github-stats-window"
import { LeetCodeStatsWindow } from "./windows/leetcode-stats-window"

import type { WindowType } from "./desktop-environment"

interface WindowManagerProps {
  windows: WindowType[]
  activeWindowId: string | null
  onCloseWindow: (id: string) => void
  onFocusWindow: (id: string) => void
  onAddWindow: (window: WindowType) => void
  soundEnabled: boolean
}

export function WindowManager({
  windows,
  activeWindowId,
  onCloseWindow,
  onFocusWindow,
  onAddWindow,
  soundEnabled,
}: WindowManagerProps) {
  const [draggedWindow, setDraggedWindow] = useState<string | null>(null)

  const renderWindowContent = (window: WindowType) => {
    switch (window.type) {
      case "terminal":
        return (
          <TerminalWindow
            windowId={window.id}
            soundEnabled={soundEnabled}
            onAddWindow={onAddWindow}
          />
        )

      case "system-info":
        return <SystemInfoWindow />

      case "projects":
        return <ProjectsWindow />

      case "about":
        return <AboutWindow />

      case "resume":
        return <ResumeWindow />

      case "experience":
        return <ExperienceWindow />

      case "certificates":
        return <CertificatesWindow />

      case "skills":
        return <SkillsWindow />

      case "github-stats":
        return <GitHubStatsWindow />

      // ✅ FIXED: LeetCode window
      case "leetcode-stats":
        return <LeetCodeStatsWindow />

      default:
        return null
    }
  }

  return (
    <div className="relative w-full h-full">
      {windows.map((window) => (
        <DraggableWindow
          key={window.id}
          window={window}
          isActive={window.id === activeWindowId}
          onClose={() => onCloseWindow(window.id)}
          onFocus={() => onFocusWindow(window.id)}
          onDragStart={() => setDraggedWindow(window.id)}
          onDragEnd={() => setDraggedWindow(null)}
          soundEnabled={soundEnabled}
        >
          {renderWindowContent(window)}
        </DraggableWindow>
      ))}
    </div>
  )
}
