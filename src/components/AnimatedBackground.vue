<template>
  <div
    ref="rootRef"
    class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Drifting subtle dot grid -->
    <div
      class="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(129,140,248,0.16)_1px,transparent_1px)] [background-size:28px_28px] animate-grid-pan opacity-70"
    ></div>

    <!-- Morphing Aurora Gradient Blobs -->
    <div
      class="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-brand-400/25 via-purple-400/20 to-pink-400/20 blur-3xl animate-aurora-1 dark:from-brand-600/25 dark:via-purple-600/20 dark:to-pink-600/15"
    ></div>
    <div
      class="absolute top-1/3 -right-28 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-sky-400/20 via-indigo-400/20 to-fuchsia-400/20 blur-3xl animate-aurora-2 dark:from-cyan-500/20 dark:via-indigo-600/20 dark:to-fuchsia-600/15"
    ></div>
    <div
      class="absolute -bottom-36 left-1/4 h-[26rem] w-[34rem] rounded-full bg-gradient-to-r from-emerald-400/15 via-brand-400/20 to-purple-400/20 blur-3xl animate-aurora-3 dark:from-emerald-500/12 dark:via-brand-500/20 dark:to-purple-600/18"
    ></div>

    <!-- Subtle Horizontal Light Beams -->
    <div class="absolute top-[28%] inset-x-0 h-px overflow-hidden opacity-40 dark:opacity-50">
      <div class="h-full w-1/3 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-beam-slide"></div>
    </div>
    <div class="absolute top-[72%] inset-x-0 h-px overflow-hidden opacity-35 dark:opacity-45">
      <div
        class="h-full w-1/3 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-beam-slide"
        style="animation-delay: 4.5s; animation-duration: 12s;"
      ></div>
    </div>

    <!-- Interactive Cursor Spotlight -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :style="spotlightStyle"
    ></div>

    <!-- Interactive Constellation & Floating Particles Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const rootRef = ref(null)
const canvasRef = ref(null)

const pointer = { x: -9999, y: -9999, active: false }
const spotX = ref(-500)
const spotY = ref(-500)
const spotVisible = ref(false)

const spotlightStyle = computed(() => ({
  opacity: spotVisible.value ? 1 : 0,
  background: theme.isDark
    ? `radial-gradient(520px circle at ${spotX.value}px ${spotY.value}px, rgba(99, 102, 241, 0.14), rgba(236, 72, 153, 0.05) 45%, transparent 72%)`
    : `radial-gradient(520px circle at ${spotX.value}px ${spotY.value}px, rgba(99, 102, 241, 0.11), rgba(168, 85, 247, 0.04) 45%, transparent 72%)`
}))

let rafId = null
let particles = []
let width = 0
let height = 0
let reducedMotion = false

function initParticles() {
  const count = Math.min(60, Math.max(24, Math.floor((width * height) / 28000)))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.8 + 1.1,
    hue: Math.random() > 0.5 ? 0 : 1
  }))
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initParticles()
}

function drawFrame() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, width, height)

  const dark = theme.isDark
  const dotPrimary = dark ? 'rgba(129, 140, 248, 0.55)' : 'rgba(79, 70, 229, 0.35)'
  const dotAccent = dark ? 'rgba(244, 114, 182, 0.5)' : 'rgba(168, 85, 247, 0.32)'
  const maxDist = 135
  const cursorDist = 170

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    // Gentle cursor interaction
    if (pointer.active) {
      const dx = p.x - pointer.x
      const dy = p.y - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist > 0 && dist < cursorDist) {
        const force = ((cursorDist - dist) / cursorDist) * 0.035
        p.x += (dx / dist) * force * 16
        p.y += (dy / dist) * force * 16
      }
    }

    // Draw links between nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j]
      const dx = p.x - q.x
      const dy = p.y - q.y
      const d = Math.hypot(dx, dy)
      if (d < maxDist) {
        const alpha = (1 - d / maxDist) * (dark ? 0.22 : 0.14)
        ctx.strokeStyle = dark
          ? `rgba(129, 140, 248, ${alpha.toFixed(3)})`
          : `rgba(99, 102, 241, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(q.x, q.y)
        ctx.stroke()
      }
    }

    // Draw link to cursor
    if (pointer.active) {
      const cd = Math.hypot(p.x - pointer.x, p.y - pointer.y)
      if (cd < cursorDist) {
        const alpha = (1 - cd / cursorDist) * (dark ? 0.35 : 0.22)
        ctx.strokeStyle = dark
          ? `rgba(244, 114, 182, ${alpha.toFixed(3)})`
          : `rgba(168, 85, 247, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(pointer.x, pointer.y)
        ctx.stroke()
      }
    }

    ctx.fillStyle = p.hue === 0 ? dotPrimary : dotAccent
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }

  rafId = requestAnimationFrame(drawFrame)
}

function handlePointerMove(e) {
  pointer.x = e.clientX
  pointer.y = e.clientY
  pointer.active = true
  spotX.value = e.clientX
  spotY.value = e.clientY
  spotVisible.value = true
}

function handlePointerLeave() {
  pointer.active = false
  spotVisible.value = false
}

function handleVisibility() {
  if (document.hidden) {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = null
  } else if (!reducedMotion && !rafId) {
    rafId = requestAnimationFrame(drawFrame)
  }
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.addEventListener('pointerleave', handlePointerLeave)
  document.addEventListener('visibilitychange', handleVisibility)

  if (!reducedMotion) {
    rafId = requestAnimationFrame(drawFrame)
  }
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('pointermove', handlePointerMove)
  document.removeEventListener('pointerleave', handlePointerLeave)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>
