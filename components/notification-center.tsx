"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { playSound } from "@/lib/sound-effects"
import type { NotificationType } from "./desktop-environment"

interface NotificationCenterProps {
  notifications: NotificationType[]
  soundEnabled: boolean
}

export function NotificationCenter({ notifications, soundEnabled }: NotificationCenterProps) {
  const [visible, setVisible] = useState<Set<string>>(new Set())

  useEffect(() => {
    notifications.forEach((notif) => {
      if (!visible.has(notif.id)) {
        setVisible((prev) => new Set(prev).add(notif.id))
        playSound("notification", soundEnabled)
        const timer = setTimeout(() => {
          setVisible((prev) => {
            const next = new Set(prev)
            next.delete(notif.id)
            return next
          })
        }, 4000)
        return () => clearTimeout(timer)
      }
    })
  }, [notifications, visible, soundEnabled])

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-2 z-30 pointer-events-none">
      {notifications.map(
        (notif) =>
          visible.has(notif.id) && (
            <div
              key={notif.id}
              className="bg-card border border-border rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-right pointer-events-auto"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-mono text-foreground">{notif.message}</p>
                <button
                  onClick={() =>
                    setVisible((prev) => {
                      const next = new Set(prev)
                      next.delete(notif.id)
                      return next
                    })
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ),
      )}
    </div>
  )
}
