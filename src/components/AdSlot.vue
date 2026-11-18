<template>
  <!-- Real WoW Sirus (sirus.su) Ad Banner inside dashed AdSlot wrapper -->
  <aside
    v-if="variant === 'sirus'"
    role="complementary"
    :aria-label="label"
    class="mx-auto max-w-full"
    :style="{ width: resolvedWidth }"
  >
    <a
      href="https://sirus.su/"
      target="_blank"
      rel="noopener noreferrer sponsored"
      class="group relative flex w-full overflow-hidden rounded-xl border-2 border-dashed border-sky-400/60 bg-gradient-to-r from-[#061124] via-[#0e274d] to-[#07152b] text-white shadow-lg transition-all duration-300 hover:border-amber-300/90 hover:shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      :class="isVertical ? 'flex-col justify-between p-5 text-center gap-3.5' : 'flex-col sm:flex-row items-center justify-between px-5 py-3.5 gap-4'"
      :style="{ minHeight: resolvedHeight }"
    >
      <!-- Frost & Gold Decorative Glows -->
      <div
        class="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-amber-400/15 blur-2xl"
        aria-hidden="true"
      ></div>

      <!-- Brand Crest + Copy -->
      <div class="relative z-10 flex items-center gap-3.5" :class="isVertical ? 'flex-col' : ''">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-300/60 bg-gradient-to-br from-sky-500/30 via-blue-900 to-slate-950 shadow-md ring-2 ring-sky-400/30 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <svg class="h-7 w-7 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2L4 5v6c0 5.25 3.4 10.1 8 11 4.6-.9 8-5.75 8-11V5l-8-3z" />
            <path d="M12 7v10M9 10l3-3 3 3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <div :class="isVertical ? 'text-center' : 'text-center sm:text-left'">
          <div
            class="flex flex-wrap items-center gap-2"
            :class="isVertical ? 'justify-center' : 'justify-center sm:justify-start'"
          >
            <span class="bg-gradient-to-r from-amber-200 via-yellow-300 to-sky-300 bg-clip-text text-base font-black tracking-wide text-transparent uppercase">
              WoW Sirus
            </span>
            <span class="rounded bg-sky-400/20 border border-sky-300/30 px-1.5 py-0.5 text-[10px] font-bold text-sky-200">
              3.3.5a+
            </span>
            <span class="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200">
              {{ label }} · sirus.su
            </span>
          </div>
          <p class="mt-1 text-xs sm:text-sm font-medium text-sky-100/90 leading-snug">
            Бесплатный WotLK с кастомными расами, рейдами, HD-графикой и режимом «Один шанс»
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div
        class="relative z-10 flex items-center gap-3 shrink-0"
        :class="isVertical ? 'w-full justify-center' : ''"
      >
        <span v-if="showDimensions && !isVertical" class="hidden lg:inline text-[11px] font-mono text-sky-300/60">
          {{ resolvedWidth }} × {{ resolvedHeight }}
        </span>
        <span
          class="relative overflow-hidden inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow-md transition-transform duration-200 group-hover:scale-105"
          :class="isVertical ? 'w-full' : ''"
        >
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent animate-shine-sweep"
            aria-hidden="true"
          ></span>
          <span class="relative">Начать игру</span>
          <span class="relative transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  </aside>

  <!-- Default Dashed Placeholder AdSlot -->
  <aside
    v-else
    role="complementary"
    :aria-label="label"
    class="mx-auto flex max-w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/60"
    :style="{ width: resolvedWidth, minHeight: resolvedHeight }"
  >
    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
      {{ label }}
    </span>
    <span v-if="showDimensions" class="text-[11px] font-mono text-slate-400/80 dark:text-slate-500/80">
      {{ resolvedWidth }} × {{ resolvedHeight }}
    </span>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const SIZE_PRESETS = {
  banner: { width: '728px', height: '90px' },
  leaderboard: { width: '970px', height: '90px' },
  sidebar: { width: '300px', height: '250px' },
  square: { width: '250px', height: '250px' },
  fluid: { width: '100%', height: '100px' }
}

const props = defineProps({
  label: {
    type: String,
    default: 'Реклама'
  },
  variant: {
    type: String,
    default: 'sirus',
    validator: (v) => ['placeholder', 'sirus'].includes(v)
  },
  size: {
    type: String,
    default: 'banner',
    validator: (v) => ['banner', 'leaderboard', 'sidebar', 'square', 'fluid'].includes(v)
  },
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  showDimensions: {
    type: Boolean,
    default: true
  }
})

const preset = computed(() => SIZE_PRESETS[props.size] || SIZE_PRESETS.banner)
const resolvedWidth = computed(() => props.width || preset.value.width)
const resolvedHeight = computed(() => props.height || preset.value.height)
const isVertical = computed(() => props.size === 'sidebar' || props.size === 'square')
</script>
