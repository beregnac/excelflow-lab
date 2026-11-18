<template>
  <!-- Styled Real Partner Ad inside dashed AdSlot wrapper -->
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
      class="group relative flex w-full overflow-hidden rounded-xl border-2 border-dashed text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2"
      :class="[
        adConfig.cardClass,
        size === 'footer' ? 'h-full flex-col justify-between p-4 text-center gap-3' : isVertical ? 'flex-col justify-between p-5 text-center gap-3.5' : 'flex-col sm:flex-row items-center justify-between px-5 py-3.5 gap-4'
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
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-md transition-transform duration-300 group-hover:scale-105"
          :class="adConfig.iconBoxClass"
          aria-hidden="true"
        >
          <!-- Sirus Shield -->
          <svg v-if="adConfig.icon === 'sirus'" class="h-6 w-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 2L4 5v6c0 5.25 3.4 10.1 8 11 4.6-.9 8-5.75 8-11V5l-8-3z" />
            <path d="M12 7v10M9 10l3-3 3 3" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <!-- JetBrains Code -->
          <svg v-else-if="adConfig.icon === 'jetbrains'" class="h-6 w-6 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
          <!-- Cloudflare Cloud -->
          <svg v-else-if="adConfig.icon === 'cloudflare'" class="h-6 w-6 text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          <!-- Steam Gamepad -->
          <svg v-else class="h-6 w-6 text-sky-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
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
            <span class="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200">
              {{ label }} · {{ adConfig.domain }}
            </span>
          </div>
          <p class="mt-1 text-xs leading-snug text-slate-200/90" :class="size === 'footer' ? 'line-clamp-2' : 'sm:text-sm'">
            {{ adConfig.description }}
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div
        class="relative z-10 flex items-center gap-3 shrink-0"
        :class="isVertical ? 'w-full justify-center' : ''"
      >
        <span v-if="showDimensions && !isVertical" class="hidden lg:inline text-[11px] font-mono text-white/50">
          {{ resolvedWidth }} × {{ resolvedHeight }}
        </span>
        <span
          class="relative overflow-hidden inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-md transition-transform duration-200 group-hover:scale-105"
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
      'border-sky-400/60 bg-gradient-to-r from-[#061124] via-[#0e274d] to-[#07152b] hover:border-amber-300/90 hover:shadow-sky-500/20 focus-visible:ring-amber-300',
    glowLeft: 'bg-sky-400/20',
    glowRight: 'bg-amber-400/15',
    iconBoxClass: 'border-amber-300/60 bg-gradient-to-br from-sky-500/30 via-blue-900 to-slate-950 ring-2 ring-sky-400/30',
    titleGradient: 'bg-gradient-to-r from-amber-200 via-yellow-300 to-sky-300',
    tagClass: 'bg-sky-400/20 border-sky-300/30 text-sky-200',
    ctaClass: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950'
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
      'border-cyan-400/60 bg-gradient-to-r from-[#09192b] via-[#102c47] to-[#1a1033] hover:border-cyan-300 hover:shadow-cyan-500/20 focus-visible:ring-cyan-300',
    glowLeft: 'bg-cyan-400/20',
    glowRight: 'bg-fuchsia-500/20',
    iconBoxClass: 'border-cyan-300/50 bg-gradient-to-br from-cyan-500/25 via-blue-900 to-slate-950 ring-2 ring-cyan-400/25',
    titleGradient: 'bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300',
    tagClass: 'bg-cyan-400/20 border-cyan-300/30 text-cyan-200',
    ctaClass: 'bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950'
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
      'border-orange-400/60 bg-gradient-to-r from-[#1c1008] via-[#301909] to-[#180d07] hover:border-orange-300 hover:shadow-orange-500/20 focus-visible:ring-orange-300',
    glowLeft: 'bg-orange-500/20',
    glowRight: 'bg-amber-400/15',
    iconBoxClass: 'border-orange-300/50 bg-gradient-to-br from-orange-500/30 via-amber-900 to-slate-950 ring-2 ring-orange-400/25',
    titleGradient: 'bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-300',
    tagClass: 'bg-orange-400/20 border-orange-300/30 text-orange-200',
    ctaClass: 'bg-gradient-to-r from-orange-400 to-amber-300 text-slate-950'
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
      'border-indigo-400/60 bg-gradient-to-r from-[#0d1829] via-[#172a45] to-[#0f1d33] hover:border-sky-300 hover:shadow-indigo-500/20 focus-visible:ring-sky-300',
    glowLeft: 'bg-blue-500/20',
    glowRight: 'bg-sky-400/20',
    iconBoxClass: 'border-sky-300/50 bg-gradient-to-br from-blue-600/30 via-slate-900 to-slate-950 ring-2 ring-blue-400/25',
    titleGradient: 'bg-gradient-to-r from-sky-200 via-blue-300 to-indigo-300',
    tagClass: 'bg-blue-400/20 border-blue-300/30 text-sky-200',
    ctaClass: 'bg-gradient-to-r from-sky-400 to-blue-400 text-slate-950'
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
