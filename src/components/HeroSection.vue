<template>
  <!-- Task 2.1 & 3.4: Hero Section adapted for both Light and Dark themes with animated aurora, meteors & spotlight -->
  <section
    id="hero"
    @pointermove="onHeroMove"
    @pointerleave="heroSpot.active = false"
    class="relative overflow-hidden bg-gradient-to-b from-indigo-50/90 via-white/85 to-slate-50/90 py-20 sm:py-28 lg:py-32 text-slate-900 transition-colors duration-300 dark:from-slate-950/95 dark:via-slate-950/95 dark:to-slate-950 dark:text-white"
    aria-labelledby="hero-title"
  >
    <!-- Drifting Background Dot Grid -->
    <div
      class="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px] opacity-25 dark:opacity-30 animate-grid-pan"
      aria-hidden="true"
    ></div>

    <!-- Rotating Conic Nebula Glow -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] opacity-20 dark:opacity-25 blur-3xl"
      aria-hidden="true"
    >
      <div class="h-full w-full rounded-full bg-[conic-gradient(from_0deg,#6366f1,#a855f7,#ec4899,#06b6d4,#6366f1)] animate-spin-slow"></div>
    </div>

    <!-- Soft Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-slate-50/90 dark:from-slate-950/55 dark:via-slate-950/75 dark:to-slate-950"
      aria-hidden="true"
    ></div>

    <!-- Decorative Animated Blur Circles (blur-3xl animate-pulse + aurora drift) -->
    <div
      class="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-400/25 dark:bg-purple-500/35 blur-3xl animate-pulse"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-400/25 dark:bg-pink-500/30 blur-3xl animate-pulse"
      style="animation-delay: 1.5s"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-sky-400/20 dark:bg-cyan-500/20 blur-3xl animate-aurora-2"
      aria-hidden="true"
    ></div>

    <!-- Shooting Meteor Light Streaks -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span
        v-for="m in meteors"
        :key="m.id"
        class="absolute h-0.5 w-24 rounded-full bg-gradient-to-r from-brand-500 via-purple-400 to-transparent opacity-0 shadow-[0_0_10px_1px_rgba(99,102,241,0.45)] dark:from-white dark:via-sky-300 dark:shadow-[0_0_12px_2px_rgba(125,211,252,0.7)] animate-meteor"
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
      :style="heroSpotlightStyle"
      aria-hidden="true"
    ></div>

    <div class="ds-container relative z-10">
      <div class="mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
        <div class="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-700 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-purple-200">
          <span class="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping"></span>
          <span>Vue 3 + Tailwind CSS v3.4+ · ExcelFlow Platform</span>
        </div>

        <h1
          id="hero-title"
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance text-slate-900 dark:text-white"
        >
          Превратите Excel-таблицы в
          <span class="bg-gradient-to-r from-purple-600 via-pink-500 to-brand-600 dark:from-purple-400 dark:via-pink-500 dark:to-cyan-400 bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
            интерактивную аналитику
          </span>
        </h1>

        <p class="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Загружайте файлы
          <code class="rounded bg-brand-100/80 px-1.5 py-0.5 text-brand-700 dark:bg-white/10 dark:text-pink-300">.xlsx</code>,
          управляйте данными в реальном времени, стройте дашборды, канбан-доски и отчёты в едином современном интерфейсе.
        </p>

        <!-- Primary + Outline CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#excel-upload"
            class="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <span
              class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine-sweep"
              aria-hidden="true"
            ></span>
            <span class="relative">Загрузить Excel сейчас</span>
            <svg class="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <router-link
            to="/dashboard"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-7 py-3.5 text-base font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:border-white/40 dark:focus-visible:ring-white/60"
          >
            Открыть Дашборд 4.1
          </router-link>
        </div>

        <!-- Backdrop-blur Glass Metrics Strip -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
          <div class="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-400/50 dark:hover:bg-white/10 animate-fade-in-up" style="animation-delay: 120ms">
            <div class="text-2xl font-extrabold text-slate-900 dark:text-white">16</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tailwind модулей</div>
          </div>
          <div class="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-400/50 dark:hover:bg-white/10 animate-fade-in-up" style="animation-delay: 220ms">
            <div class="text-2xl font-extrabold text-purple-600 dark:text-purple-300">v3.4+</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">@container &amp; has-*</div>
          </div>
          <div class="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-pink-400/50 dark:hover:bg-white/10 animate-fade-in-up" style="animation-delay: 320ms">
            <div class="text-2xl font-extrabold text-pink-600 dark:text-pink-300">XLSX</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Парсинг на клиенте</div>
          </div>
          <div class="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/50 dark:hover:bg-white/10 animate-fade-in-up" style="animation-delay: 420ms">
            <div class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-300">100%</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mobile-first (320px+)</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const heroSpot = reactive({ x: 0, y: 0, active: false })

const heroSpotlightStyle = computed(() => ({
  opacity: heroSpot.active ? 1 : 0,
  background: theme.isDark
    ? `radial-gradient(460px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(168, 85, 247, 0.22), rgba(56, 189, 248, 0.08) 45%, transparent 72%)`
    : `radial-gradient(460px circle at ${heroSpot.x}px ${heroSpot.y}px, rgba(99, 102, 241, 0.14), rgba(236, 72, 153, 0.06) 45%, transparent 72%)`
}))

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
