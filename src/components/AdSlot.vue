<template>
  <!-- Styled Real Partner Ad inside dashed AdSlot wrapper (Light + Dark mode adaptive) -->
  <aside
    v-if="adConfig"
    role="complementary"
    :aria-label="`${label}: ${adConfig.brand}`"
    class="mx-auto max-w-full"
    :class="size === 'footer' ? 'h-full w-full' : ''"
    :style="size === 'footer' ? {} : { width: resolvedWidth }"
  >
    <a
      :href="adConfig.href"
      target="_blank"
      rel="noopener noreferrer sponsored"
      class="group relative flex w-full overflow-hidden rounded-xl border-2 border-dashed shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 dark:shadow-lg"
      :class="[
        adConfig.cardClass,
        size === 'footer'
          ? 'h-full flex-col justify-between p-4 text-center gap-3'
          : isVertical
            ? 'flex-col justify-between p-5 text-center gap-3.5'
            : 'flex-col sm:flex-row items-center justify-between px-5 py-3.5 gap-4'
      ]"
      :style="{ minHeight: resolvedHeight }"
    >
      <!-- Decorative Glows -->
      <div
        class="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full blur-2xl"
        :class="adConfig.glowLeft"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute -right-8 -bottom-8 h-28 w-28 rounded-full blur-2xl"
        :class="adConfig.glowRight"
        aria-hidden="true"
      ></div>

      <!-- Brand Crest + Copy -->
      <div class="relative z-10 flex items-center gap-3" :class="isVertical ? 'flex-col' : ''">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:scale-105"
          :class="adConfig.iconBoxClass"
          aria-hidden="true"
        >
          <!-- Sirus Shield -->
          <svg
            v-if="adConfig.icon === 'sirus'"
            class="h-6 w-6 text-amber-600 dark:text-amber-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
          >
            <path d="M12 2L4 5v6c0 5.25 3.4 10.1 8 11 4.6-.9 8-5.75 8-11V5l-8-3z" />
            <path d="M12 7v10M9 10l3-3 3 3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <!-- JetBrains Code -->
          <svg
            v-else-if="adConfig.icon === 'jetbrains'"
            class="h-6 w-6 text-cyan-700 dark:text-cyan-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
          <!-- Cloudflare Cloud -->
          <svg
            v-else-if="adConfig.icon === 'cloudflare'"
            class="h-6 w-6 text-orange-600 dark:text-orange-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          <!-- Steam Gamepad -->
          <svg
            v-else
            class="h-6 w-6 text-indigo-700 dark:text-sky-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
          >
            <line x1="6" y1="12" x2="10" y2="12" />
            <line x1="8" y1="10" x2="8" y2="14" />
            <circle cx="15" cy="13" r="1" fill="currentColor" />
            <circle cx="17" cy="11" r="1" fill="currentColor" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59l-.687 6.87A3 3 0 0 0 5 18.75a3 3 0 0 0 2.55-1.42l1.11-1.78a2 2 0 0 1 1.7-.95h3.28a2 2 0 0 1 1.7.95l1.11 1.78A3 3 0 0 0 19 18.75a3 3 0 0 0 2.985-3.29l-.687-6.87A4 4 0 0 0 17.32 5Z" />
          </svg>
        </div>

        <div :class="isVertical ? 'text-center' : 'text-center sm:text-left'">
          <div
            class="flex flex-wrap items-center gap-1.5"
            :class="isVertical ? 'justify-center' : 'justify-center sm:justify-start'"
          >
            <span
              class="bg-clip-text text-sm sm:text-base font-black tracking-wide text-transparent uppercase"
              :class="adConfig.titleGradient"
            >
              {{ adConfig.brand }}
            </span>
            <span
              class="rounded border px-1.5 py-0.5 text-[10px] font-bold"
              :class="adConfig.tagClass"
            >
              {{ adConfig.tag }}
            </span>
            <span class="rounded bg-slate-900/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:bg-white/10 dark:text-slate-200">
              {{ label }} · {{ adConfig.domain }}
            </span>
          </div>
          <p
            class="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-200/90"
            :class="size === 'footer' ? 'line-clamp-2' : 'sm:text-sm'"
          >
            {{ adConfig.description }}
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div
        class="relative z-10 flex items-center gap-3 shrink-0"
        :class="isVertical ? 'w-full justify-center' : ''"
      >
        <span v-if="showDimensions && !isVertical" class="hidden lg:inline text-[11px] font-mono text-slate-400 dark:text-white/50">
          {{ resolvedWidth }} × {{ resolvedHeight }}
        </span>
        <span
          class="relative overflow-hidden inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-sm transition-transform duration-200 group-hover:scale-105"
          :class="[adConfig.ctaClass, isVertical ? 'w-full' : '']"
        >
          <span
            class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine-sweep"
            aria-hidden="true"
          ></span>
          <span class="relative">{{ adConfig.cta }}</span>
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
  footer: { width: '100%', height: '188px' },
  fluid: { width: '100%', height: '100px' }
}

const AD_VARIANTS = {
  sirus: {
    brand: 'WoW Sirus',
    tag: '3.3.5a+',
    domain: 'sirus.su',
    href: 'https://sirus.su/',
    description: 'Бесплатный WotLK с кастомными расами, рейдами, HD-графикой и режимом «Один шанс»',
    cta: 'Начать игру',
    icon: 'sirus',
    cardClass:
      'border-sky-300 bg-gradient-to-r from-sky-50 via-blue-50/90 to-amber-50/80 text-slate-900 hover:border-amber-400 focus-visible:ring-sky-500 dark:border-sky-400/60 dark:from-[#061124] dark:via-[#0e274d] dark:to-[#07152b] dark:text-white dark:hover:border-amber-300/90 dark:hover:shadow-sky-500/20 dark:focus-visible:ring-amber-300',
    glowLeft: 'bg-sky-300/35 dark:bg-sky-400/20',
    glowRight: 'bg-amber-300/30 dark:bg-amber-400/15',
    iconBoxClass:
      'border-amber-300 bg-gradient-to-br from-sky-100 via-white to-amber-100 ring-2 ring-sky-200/70 dark:border-amber-300/60 dark:from-sky-500/30 dark:via-blue-900 dark:to-slate-950 dark:ring-sky-400/30',
    titleGradient:
      'bg-gradient-to-r from-blue-800 via-sky-700 to-amber-600 dark:from-amber-200 dark:via-yellow-300 dark:to-sky-300',
    tagClass:
      'bg-sky-100 border-sky-300 text-sky-800 dark:bg-sky-400/20 dark:border-sky-300/30 dark:text-sky-200',
    ctaClass:
      'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400'
  },
  jetbrains: {
    brand: 'WebStorm',
    tag: 'IDE',
    domain: 'jetbrains.com',
    href: 'https://www.jetbrains.com/webstorm/',
    description: 'Умная IDE для Vue 3, TypeScript и Tailwind CSS · Бесплатно для некоммерческой разработки',
    cta: 'Скачать IDE',
    icon: 'jetbrains',
    cardClass:
      'border-cyan-300 bg-gradient-to-r from-cyan-50 via-sky-50/90 to-fuchsia-50/70 text-slate-900 hover:border-cyan-500 focus-visible:ring-cyan-500 dark:border-cyan-400/60 dark:from-[#09192b] dark:via-[#102c47] dark:to-[#1a1033] dark:text-white dark:hover:border-cyan-300 dark:hover:shadow-cyan-500/20 dark:focus-visible:ring-cyan-300',
    glowLeft: 'bg-cyan-300/30 dark:bg-cyan-400/20',
    glowRight: 'bg-fuchsia-300/25 dark:bg-fuchsia-500/20',
    iconBoxClass:
      'border-cyan-300 bg-gradient-to-br from-cyan-100 via-white to-fuchsia-100 ring-2 ring-cyan-200/70 dark:border-cyan-300/50 dark:from-cyan-500/25 dark:via-blue-900 dark:to-slate-950 dark:ring-cyan-400/25',
    titleGradient:
      'bg-gradient-to-r from-cyan-700 via-sky-700 to-fuchsia-600 dark:from-cyan-300 dark:via-sky-200 dark:to-fuchsia-300',
    tagClass:
      'bg-cyan-100 border-cyan-300 text-cyan-800 dark:bg-cyan-400/20 dark:border-cyan-300/30 dark:text-cyan-200',
    ctaClass:
      'bg-gradient-to-r from-cyan-600 to-sky-600 text-white dark:from-cyan-400 dark:to-sky-300 dark:text-slate-950'
  },
  cloudflare: {
    brand: 'Cloudflare Pages',
    tag: 'FREE CDN',
    domain: 'pages.cloudflare.com',
    href: 'https://pages.cloudflare.com/',
    description: 'Безлимитный трафик, мгновенный деплой из GitHub и глобальный SSL для статических сайтов',
    cta: 'Развернуть',
    icon: 'cloudflare',
    cardClass:
      'border-orange-300 bg-gradient-to-r from-orange-50 via-amber-50/90 to-yellow-50/70 text-slate-900 hover:border-orange-500 focus-visible:ring-orange-500 dark:border-orange-400/60 dark:from-[#1c1008] dark:via-[#301909] dark:to-[#180d07] dark:text-white dark:hover:border-orange-300 dark:hover:shadow-orange-500/20 dark:focus-visible:ring-orange-300',
    glowLeft: 'bg-orange-300/30 dark:bg-orange-500/20',
    glowRight: 'bg-amber-300/25 dark:bg-amber-400/15',
    iconBoxClass:
      'border-orange-300 bg-gradient-to-br from-orange-100 via-white to-amber-100 ring-2 ring-orange-200/70 dark:border-orange-300/50 dark:from-orange-500/30 dark:via-amber-900 dark:to-slate-950 dark:ring-orange-400/25',
    titleGradient:
      'bg-gradient-to-r from-orange-700 via-amber-600 to-orange-600 dark:from-orange-300 dark:via-amber-200 dark:to-yellow-300',
    tagClass:
      'bg-orange-100 border-orange-300 text-orange-800 dark:bg-orange-400/20 dark:border-orange-300/30 dark:text-orange-200',
    ctaClass:
      'bg-gradient-to-r from-orange-600 to-amber-500 text-white dark:from-orange-400 dark:to-amber-300 dark:text-slate-950'
  },
  steam: {
    brand: 'Steam Store',
    tag: 'PC GAMES',
    domain: 'store.steampowered.com',
    href: 'https://store.steampowered.com/',
    description: 'Тысячи игр, сезонные скидки, облачные сохранения и библиотека лучших инди- и AAA-хитов',
    cta: 'В магазин',
    icon: 'steam',
    cardClass:
      'border-indigo-300 bg-gradient-to-r from-slate-50 via-indigo-50/85 to-sky-50/85 text-slate-900 hover:border-indigo-500 focus-visible:ring-indigo-500 dark:border-indigo-400/60 dark:from-[#0d1829] dark:via-[#172a45] dark:to-[#0f1d33] dark:text-white dark:hover:border-sky-300 dark:hover:shadow-indigo-500/20 dark:focus-visible:ring-sky-300',
    glowLeft: 'bg-indigo-300/30 dark:bg-blue-500/20',
    glowRight: 'bg-sky-300/30 dark:bg-sky-400/20',
    iconBoxClass:
      'border-indigo-300 bg-gradient-to-br from-indigo-100 via-white to-sky-100 ring-2 ring-indigo-200/70 dark:border-sky-300/50 dark:from-blue-600/30 dark:via-slate-900 dark:to-slate-950 dark:ring-blue-400/25',
    titleGradient:
      'bg-gradient-to-r from-indigo-800 via-blue-700 to-sky-600 dark:from-sky-200 dark:via-blue-300 dark:to-indigo-300',
    tagClass:
      'bg-indigo-100 border-indigo-300 text-indigo-800 dark:bg-blue-400/20 dark:border-blue-300/30 dark:text-sky-200',
    ctaClass:
      'bg-gradient-to-r from-indigo-600 to-blue-600 text-white dark:from-sky-400 dark:to-blue-400 dark:text-slate-950'
  }
}

const props = defineProps({
  label: {
    type: String,
    default: 'Реклама'
  },
  variant: {
    type: String,
    default: 'sirus',
    validator: (v) => ['placeholder', 'sirus', 'jetbrains', 'cloudflare', 'steam'].includes(v)
  },
  size: {
    type: String,
    default: 'banner',
    validator: (v) => ['banner', 'leaderboard', 'sidebar', 'square', 'footer', 'fluid'].includes(v)
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

const adConfig = computed(() => AD_VARIANTS[props.variant] || null)
const preset = computed(() => SIZE_PRESETS[props.size] || SIZE_PRESETS.banner)
const resolvedWidth = computed(() => props.width || preset.value.width)
const resolvedHeight = computed(() => props.height || preset.value.height)
const isVertical = computed(() => ['sidebar', 'square', 'footer'].includes(props.size))
</script>
