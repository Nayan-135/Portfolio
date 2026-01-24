"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { StatusBar } from "./status-bar"
import { WindowManager } from "./window-manager"
import { DesktopIcons } from "./desktop-icons"
import { NotificationCenter } from "./notification-center"
import { ContextMenu } from "./context-menu"
import { playSound } from "@/lib/sound-effects"
import type { WindowType, NotificationType } from "./desktop-environment"

interface DesktopProps {
  windows: WindowType[]
  activeWindowId: string | null
  notifications: NotificationType[]
  soundEnabled: boolean
  onAddWindow: (window: WindowType) => void
  onCloseWindow: (id: string) => void
  onFocusWindow: (id: string) => void
  onSoundToggle: (enabled: boolean) => void
  onAddNotification: (message: string, type: NotificationType["type"]) => void
}

export function Desktop({
  windows,
  activeWindowId,
  notifications,
  soundEnabled,
  onAddWindow,
  onCloseWindow,
  onFocusWindow,
  onSoundToggle,
  onAddNotification,
}: DesktopProps) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("soundEnabled")
    if (saved !== null) onSoundToggle(JSON.parse(saved))
  }, [onSoundToggle])

  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled))
  }, [soundEnabled])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeWindowId) {
        onCloseWindow(activeWindowId)
        playSound("windowClose", soundEnabled)
      }

      if (e.ctrlKey && e.key === "w" && activeWindowId) {
        e.preventDefault()
        onCloseWindow(activeWindowId)
        playSound("windowClose", soundEnabled)
      }

      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault()
        windows.forEach((w) => onCloseWindow(w.id))
      }

      if (e.ctrlKey && e.altKey && e.key === "t") {
        e.preventDefault()
        onAddWindow({
          id: `terminal-${Date.now()}`,
          title: "Terminal",
          type: "terminal",
          position: { x: 200, y: 80 },
          size: { width: 700, height: 500 },
          isMinimized: false,
        })
        playSound("windowOpen", soundEnabled)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeWindowId, windows, onCloseWindow, onAddWindow, soundEnabled])

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Untitled video - Made with Clipchamp (2).mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* DESKTOP CONTENT */}
      <div className="relative z-20 w-full h-full flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <DesktopIcons onAddWindow={onAddWindow} soundEnabled={soundEnabled} />

          <div className="flex-1 relative overflow-hidden">
            <WindowManager
              windows={windows}
              activeWindowId={activeWindowId}
              onCloseWindow={onCloseWindow}
              onFocusWindow={onFocusWindow}
              onAddWindow={onAddWindow}
              soundEnabled={soundEnabled}
            />
          </div>
        </div>

        <StatusBar
          soundEnabled={soundEnabled}
          onSoundToggle={onSoundToggle}
          activeWindowTitle={
            windows.find((w) => w.id === activeWindowId)?.title || "Portfolio OS"
          }
        />
      </div>

      <NotificationCenter notifications={notifications} soundEnabled={soundEnabled} />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAddWindow={onAddWindow}
          onCloseAll={() => windows.forEach((w) => onCloseWindow(w.id))}
          onClose={() => setContextMenu(null)}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  )
}
