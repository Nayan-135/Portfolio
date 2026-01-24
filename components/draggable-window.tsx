"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { playSound } from "@/lib/sound-effects"
import type { WindowType } from "./desktop-environment"

interface DraggableWindowProps {
  window: WindowType
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  onDragStart: () => void
  onDragEnd: () => void
  soundEnabled: boolean
  children: React.ReactNode
}

export function DraggableWindow({
  window,
  isActive,
  onClose,
  onFocus,
  onDragStart,
  onDragEnd,
  soundEnabled,
  children,
}: DraggableWindowProps) {
  const SCALE = 1.3 // 🔥 slightly bigger than before

  const [position, setPosition] = useState({
    x: window.position.x,
    y: window.position.y,
  })

  const [size] = useState(() => ({
    width: Math.floor(window.size.width * SCALE),
    height: Math.floor(window.size.height * SCALE),
  }))

  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const windowRef = useRef<HTMLDivElement>(null)
  const titleBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!windowRef.current || !windowRef.current.parentElement) return

    const parentRect = windowRef.current.parentElement.getBoundingClientRect()

    const centeredX = Math.max(20, (parentRect.width - size.width) / 2)
    const centeredY = Math.max(70, (parentRect.height - size.height) / 3)

    setPosition({ x: centeredX, y: centeredY })
  }, [size])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const rect = titleBarRef.current?.getBoundingClientRect()
    if (!rect) return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    onFocus()
    onDragStart()
    playSound("dragStart", soundEnabled)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!windowRef.current || !windowRef.current.parentElement) return

      const parentRect = windowRef.current.parentElement.getBoundingClientRect()
      const windowRect = windowRef.current.getBoundingClientRect()

      let newX = e.clientX - parentRect.left - dragOffset.x
      let newY = e.clientY - parentRect.top - dragOffset.y

      newX = Math.max(0, Math.min(newX, parentRect.width - windowRect.width))
      newY = Math.max(50, Math.min(newY, parentRect.height - windowRect.height))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      onDragEnd()
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset, onDragEnd])

  return (
    <div
      ref={windowRef}
      className="absolute overflow-hidden transition-all duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: isActive ? 100 : 50,
        border: `2px solid ${isActive ? "#00ff00" : "#004400"}`,
        backgroundColor: "#000000",
        boxShadow: isActive
          ? "0 0 18px rgba(0,255,0,0.65), inset 0 0 8px rgba(0,170,0,0.3)"
          : "0 0 8px rgba(0,170,0,0.25)",
        animation: "windowOpen 0.25s ease-out",
      }}
      onClick={onFocus}
    >
      {/* TITLE BAR */}
      <div
        ref={titleBarRef}
        className="flex items-center justify-between px-3 py-2 cursor-move select-none"
        style={{
          backgroundColor: isActive ? "#00aa00" : "#004400",
          color: isActive ? "#000000" : "#00aa00",
          fontWeight: "bold",
          fontSize: "13px",
          borderBottom: "1px solid #00aa00",
        }}
        onMouseDown={handleMouseDown}
      >
        <span className="truncate">{window.title}</span>
        <div className="flex gap-1">
          <button
            onClick={(e) => e.stopPropagation()}
            className="px-1 text-xs"
            style={{ color: isActive ? "#000" : "#00aa00" }}
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
              playSound("windowClose", soundEnabled)
            }}
            className="px-1 text-xs"
            style={{ color: isActive ? "#000" : "#00aa00" }}
          >
            X
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="w-full overflow-auto"
        style={{
          height: "calc(100% - 30px)",
          backgroundColor: "#000000",
          color: "#00aa00",
          fontSize: "13px",
          lineHeight: "1.55",
          fontFamily: "'Courier New', monospace",
        }}
      >
        {children}
      </div>
    </div>
  )
}
