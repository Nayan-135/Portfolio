"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { playSound } from "@/lib/sound-effects"
import type { WindowType } from "../desktop-environment"

interface TerminalWindowProps {
  windowId: string
  soundEnabled: boolean
  onAddWindow?: (window: WindowType) => void
}

const COMMANDS: Record<string, { description: string; action?: string }> = {
  about: { description: "Learn more about me", action: "about" },
  skills: { description: "Display tech skills", action: "skills" },
  projects: { description: "Show my projects", action: "projects" },
  resume: { description: "Show resume", action: "resume" },
  experience: { description: "Show experience", action: "experience" },
  certificates: { description: "Show certificates", action: "certificates" },
  github: { description: "Show GitHub stats", action: "github-stats" },

  // ✅ ADDED: LeetCode command
  leetcode: { description: "Show LeetCode stats", action: "leetcode-stats" },

  "system-info": { description: "Display system info", action: "system-info" },
  help: { description: "Show available commands" },
  clear: { description: "Clear terminal" },
}

type CommandKey = keyof typeof COMMANDS

export function TerminalWindow({
  windowId,
  soundEnabled,
  onAddWindow,
}: TerminalWindowProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<
    { type: "command" | "output"; content: string }[]
  >([
    { type: "output", content: "Portfolio OS Terminal v1.0.0" },
    { type: "output", content: 'Type "help" for available commands' },
    { type: "output", content: "" },
  ])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [output])

  const updateSuggestions = (value: string) => {
    if (!value) {
      setSuggestions([])
      return
    }

    const matching = Object.keys(COMMANDS).filter((cmd) =>
      cmd.startsWith(value.toLowerCase())
    )
    setSuggestions(matching)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    updateSuggestions(value)
    playSound("terminalType", soundEnabled)
  }

  const handleCommandSubmit = (command: string) => {
    const trimmed = command.trim()
    if (!trimmed) return

    setOutput((prev) => [
      ...prev,
      { type: "command", content: `$ ${trimmed}` },
    ])

    const cmd = trimmed.toLowerCase() as CommandKey

    if (cmd === "clear") {
      setOutput([])
    } else if (cmd === "help") {
      setOutput((prev) => [
        ...prev,
        { type: "output", content: "Available commands:" },
        ...Object.entries(COMMANDS).map(([key, val]) => ({
          type: "output" as const,
          content: `  ${key.padEnd(12)} - ${val.description}`,
        })),
        { type: "output", content: "" },
      ])
    } else if (cmd in COMMANDS) {
      const cmdObj = COMMANDS[cmd]

      setOutput((prev) => [
        ...prev,
        { type: "output", content: `Executing: ${cmdObj.description}...` },
      ])

      if (cmdObj.action && onAddWindow) {
        const id = `${cmdObj.action}-${Date.now()}`
        onAddWindow({
          id,
          title: cmdObj.description,
          type: cmdObj.action as any,
          position: { x: 500, y: 150 },
          size: { width: 700, height: 500 },
          isMinimized: false,
        })

        setOutput((prev) => [
          ...prev,
          { type: "output", content: `Window "${cmdObj.description}" opened.` },
        ])
      }

      setOutput((prev) => [...prev, { type: "output", content: "" }])
    } else {
      setOutput((prev) => [
        ...prev,
        { type: "output", content: `Command not found: ${trimmed}` },
        { type: "output", content: "" },
      ])
    }

    setInput("")
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommandSubmit(input)
    } else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault()
      setInput(suggestions[0])
      setSuggestions([])
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-black font-mono text-sm border-2 border-green-400">
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 space-y-1 scrollbar-thin scrollbar-track-black scrollbar-thumb-green-400"
      >
        {output.map((line, i) => (
          <div
            key={i}
            className={`${
              line.type === "command"
                ? "text-green-400 font-semibold"
                : "text-green-300"
            } whitespace-pre-wrap break-words`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="border-t-2 border-green-400 px-4 py-2 bg-black">
          <div className="text-green-300/60 text-xs mb-1">Suggestions:</div>
          <div className="flex gap-2 flex-wrap">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s)
                  setSuggestions([])
                  inputRef.current?.focus()
                }}
                className="px-2 py-1 bg-green-400/20 text-green-400 rounded text-xs hover:bg-green-400/30 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t-2 border-green-400 px-4 py-3 flex items-center gap-2 bg-black">
        <span className="text-green-400 font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 focus:outline-none font-mono"
          placeholder="Type command..."
          autoFocus
        />
        <span className="animate-pulse text-green-400 font-bold">_</span>
      </div>
    </div>
  )
}
