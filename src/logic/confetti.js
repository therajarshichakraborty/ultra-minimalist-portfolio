import confetti from 'canvas-confetti'

export function createConfetti({
  during = 500,
  disableForReducedMotion = false
} = {}) {
  const end = Date.now() + during
  ;(function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      disableForReducedMotion
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      disableForReducedMotion
    })

    if (!disableForReducedMotion && Date.now() < end) {
      window.requestAnimationFrame(frame)
    }
  })()
}

export function resetConfetti() {
  confetti.reset()
}
