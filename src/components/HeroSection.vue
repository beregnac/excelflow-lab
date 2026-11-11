<template>
  <!-- Task 2.1: Hero Section with gradient text, background overlay, blur-3xl pulse circles, backdrop-blur -->
  <section
    id="hero"
    class="relative overflow-hidden bg-slate-950 py-20 sm:py-28 lg:py-32 text-white"
    aria-labelledby="hero-title"
  >
    <!-- Background Grid / Abstract Visual + Dark Gradient Overlay -->
    <div
      class="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:28px_28px] opacity-25"
      aria-hidden="true"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950"
      aria-hidden="true"
    ></div>

    <!-- Decorative Blur Circles (blur-3xl animate-pulse) -->
    <div
      class="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-500/35 blur-3xl animate-pulse"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl animate-pulse"
      style="animation-delay: 1.5s"
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
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div class="text-2xl font-extrabold text-white">16</div>
            <div class="text-xs text-slate-400 mt-0.5">Tailwind модулей</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div class="text-2xl font-extrabold text-purple-300">v3.4+</div>
            <div class="text-xs text-slate-400 mt-0.5">@container &amp; has-*</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div class="text-2xl font-extrabold text-pink-300">XLSX</div>
            <div class="text-xs text-slate-400 mt-0.5">Парсинг на клиенте</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div class="text-2xl font-extrabold text-emerald-300">100%</div>
            <div class="text-xs text-slate-400 mt-0.5">Mobile-first (320px+)</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
