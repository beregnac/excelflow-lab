<template>
  <!-- Task 2.1: Hero Section with animated aurora nebula, shooting meteors, drifting grid & interactive spotlight -->
  <section
    id="hero"
    @pointermove="onHeroMove"
    @pointerleave="heroSpot.active = false"
    class="relative overflow-hidden bg-slate-950/95 py-20 sm:py-28 lg:py-32 text-white"
    aria-labelledby="hero-title"
  >
    <!-- Drifting Background Dot Grid -->
    <div
      class="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px] opacity-30 animate-grid-pan"
      aria-hidden="true"
    ></div>

    <!-- Rotating Conic Nebula Glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] opacity-25 blur-3xl"
      aria-hidden="true"
    >
      <div class="h-full w-full rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#ec4899,#06b6d4,#6366f1)] animate-spin-slow"></div>
    </div>

    <!-- Dark Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/75 to-slate-950"
      aria-hidden="true"
    ></div>

    <!-- Decorative Animated Blur Circles (blur-3xl animate-pulse + aurora drift) -->
    <div
      class="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-500/35 blur-3xl animate-pulse"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse"
      style="animation-delay: 1.5s"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-aurora-2"
      aria-hidden="true"
    ></div>

    <!-- Shooting Meteor Light Streaks -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span
        v-for="m in meteors"
        :key="m.id"
        class="absolute h-0.5 w-24 rounded-full bg-gradient-to-r from-white via-sky-300 to-transparent opacity-0 shadow-[0_0_12px_2px_rgba(125,211,252,0.7)] animate-meteor"
        :style="{
          top: m.top,
          left: m.left,
          animationDelay: m.delay,
          animationDuration: m.duration
        }"
      ></span>
    </div>

    <!-- Interactive Hero Spotlight -->
    <div
      class="pointer-events-none absolute inset-0 transition-opacity duration-300"
      :style="{
        opacity: heroSpot.active ? 1 : 0,
        background: `radial-gradient(460px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(168, 85, 247, 0.22), rgba(56, 189, 248, 0.08) 45%, transparent 72%)`
      }"
      aria-hidden="true"
    ></div>

    <div class="ds-container relative z-10">
      <div class="mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-purple-200 backdrop-blur-md">
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Vue 3 + Tailwind CSS v3.4+ · ExcelFlow Platform</span>
        </div>

        <h1
          id="hero-title"
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance"
        >
          Превратите Excel-таблицы в
          <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            интерактивную аналитику
          </span>
        </h1>

        <p class="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Загружайте файлы <code class="rounded bg-white/10 px-1.5 py-0.5 text-pink-300">.xlsx</code>, управляйте данными в реальном времени, стройте дашборды, канбан-доски и отчёты в едином современном интерфейсе.
        </p>

        <!-- Primary + Outline CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#excel-upload"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            Загрузить Excel сейчас
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <router-link
            to="/dashboard"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Открыть Дашборд 4.1
          </router-link>
        </div>

        <!-- Backdrop-blur Glass Metrics Strip -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <div class="text-2xl font-extrabold text-white">16</div>
            <div class="text-xs text-slate-400 mt-0.5">Tailwind модулей</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <div class="text-2xl font-extrabold text-purple-300">v3.4+</div>
            <div class="text-xs text-slate-400 mt-0.5">@container &amp; has-*</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <div class="text-2xl font-extrabold text-pink-300">XLSX</div>
            <div class="text-xs text-slate-400 mt-0.5">Парсинг на клиенте</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <div class="text-2xl font-extrabold text-emerald-300">100%</div>
            <div class="text-xs text-slate-400 mt-0.5">Mobile-first (320px+)</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const heroSpot = reactive({ x: 0, y: 0, active: false })

const meteors = [
  { id: 1, top: '8%', left: '25%', delay: '0s', duration: '4.8s' },
  { id: 2, top: '14%', left: '58%', delay: '1.4s', duration: '5.6s' },
  { id: 3, top: '5%', left: '82%', delay: '2.7s', duration: '4.4s' },
  { id: 4, top: '26%', left: '92%', delay: '0.8s', duration: '6.2s' },
  { id: 5, top: '18%', left: '42%', delay: '3.6s', duration: '5.1s' },
  { id: 6, top: '34%', left: '72%', delay: '4.5s', duration: '5.9s' }
]

function onHeroMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  heroSpot.x = e.clientX - rect.left
  heroSpot.y = e.clientY - rect.top
  heroSpot.active = true
}
</script>
