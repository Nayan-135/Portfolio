"use client"

import { useState, useCallback } from "react"
import { MonitorFrame } from "./monitor-frame"
import { Desktop } from "./desktop"

export function DesktopEnvironment() {
  const [windows, setWindows] = useState<WindowType[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)

  const addWindow = useCallback((window: WindowType) => {
    setWindows((prev) => [...prev, window])
    setActiveWindowId(window.id)
  }, [])

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id)
    setWindows((prev) => {
      const window = prev.find((w) => w.id === id)
      if (window) {
        return [...prev.filter((w) => w.id !== id), window]
      }
      return prev
    })
  }, [])

  const addNotification = useCallback((message: string, type: NotificationType["type"] = "info") => {
    const id = `notify-${Date.now()}`
    setNotifications((prev) => [
      ...prev,
      {
        id,
        message,
        type,
      },
    ])
  }, [])

  return (
    <MonitorFrame>
      <Desktop
        windows={windows}
        activeWindowId={activeWindowId}
        notifications={notifications}
        soundEnabled={soundEnabled}
        onAddWindow={addWindow}
        onCloseWindow={closeWindow}
        onFocusWindow={focusWindow}
        onSoundToggle={setSoundEnabled}
        onAddNotification={addNotification}
      />
    </MonitorFrame>
  )
}

export type WindowType = {
  id: string
  title: string
  type:
    | "terminal"
    | "system-info"
    | "projects"
    | "about"
    | "resume"
    | "experience"
    | "certificates"
    | "skills"
    | "github-stats"
    | "leetcode-stats"
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
}

export type NotificationType = {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
}
