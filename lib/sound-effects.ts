// Audio context for playing sound effects
let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioContext
}

// Create a simple beep/tone
function playTone(frequency: number, duration: number, volume = 0.3) {
  try {
    const context = getAudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.frequency.value = frequency
    oscillator.type = "sine"

    gain.gain.setValueAtTime(volume, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration)

    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + duration)
  } catch (e) {
    // Audio context not available
  }
}

export const soundEffects = {
  // Window open sound - ascending tone
  windowOpen: () => {
    playTone(400, 0.1, 0.2)
    setTimeout(() => playTone(500, 0.1, 0.2), 50)
  },

  // Window close sound - descending tone
  windowClose: () => {
    playTone(500, 0.1, 0.2)
    setTimeout(() => playTone(400, 0.1, 0.2), 50)
  },

  // Notification sound - two quick beeps
  notification: () => {
    playTone(600, 0.08, 0.2)
    setTimeout(() => playTone(600, 0.08, 0.2), 100)
  },

  // Terminal typing sound - low soft click
  terminalType: () => {
    playTone(200, 0.03, 0.1)
  },

  // Drag start sound - subtle high tone
  dragStart: () => {
    playTone(700, 0.06, 0.15)
  },

  // Snap sound - satisfying beep
  snap: () => {
    playTone(800, 0.12, 0.2)
  },
}

export function playSound(soundKey: keyof typeof soundEffects, enabled: boolean) {
  if (enabled) {
    soundEffects[soundKey]()
  }
}
