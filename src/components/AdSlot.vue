<template>
  <!-- Belbet Stylized Promo AdSlot (keeps dashed AdSlot wrapper + "Рекламное место" label) -->
  <aside
    v-if="variant === 'belbet'"
    role="complementary"
    :aria-label="label"
    class="relative mx-auto flex max-w-full overflow-hidden rounded-xl border-2 border-dashed border-amber-400/60 bg-gradient-to-r from-[#140b2e] via-[#261152] to-[#110824] text-white shadow-lg transition-all duration-300 hover:border-amber-300 hover:shadow-amber-500/15"
    :class="isVertical ? 'flex-col justify-between p-5 text-center gap-3' : 'flex-col sm:flex-row items-center justify-between px-5 py-3.5 gap-4'"
    :style="{ width: resolvedWidth, minHeight: resolvedHeight }"
  >
    <!-- Decorative glow -->
    <div
      class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl"
      aria-hidden="true"
    ></div>

    <!-- Brand + Ad Badge -->
    <div class="relative z-10 flex items-center gap-3" :class="isVertical ? 'flex-col' : ''">
      <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 font-black text-slate-950 shadow-md ring-2 ring-amber-200/40">
        B7
      </div>
      <div :class="isVertical ? 'text-center' : 'text-center sm:text-left'">
        <div class="flex flex-wrap items-center gap-2" :class="isVertical ? 'justify-center' : 'justify-center sm:justify-start'">
          <span class="text-base font-black tracking-wide text-amber-300 uppercase">
            belbet
          </span>
          <span class="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-sm">
            {{ label }} · 18+
          </span>
        </div>
        <p class="mt-0.5 text-xs sm:text-sm font-medium text-purple-100">
          Колесо удачи и бонус к первому депозиту · Демо-баннер
        </p>
      </div>
    </div>

    <!-- CTA -->
    <div class="relative z-10 flex items-center gap-2.5 shrink-0" :class="isVertical ? 'w-full justify-center' : ''">
      <span v-if="showDimensions && !isVertical" class="hidden md:inline text-[11px] font-mono text-purple-300/70">
        {{ resolvedWidth }} × {{ resolvedHeight }}
      </span>
      <button
        type="button"
        @click="handleDemoClick"
        class="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-950 shadow transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        :class="isVertical ? 'w-full' : ''"
      >
        {{ clicked ? 'Демо-переход ✓' : 'Играть сейчас' }}
      </button>
    </div>
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
import { ref, computed } from 'vue'

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
    default: 'Рекламное место'
  },
  variant: {
    type: String,
    default: 'belbet',
    validator: (v) => ['placeholder', 'belbet'].includes(v)
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

const clicked = ref(false)
const preset = computed(() => SIZE_PRESETS[props.size] || SIZE_PRESETS.banner)
const resolvedWidth = computed(() => props.width || preset.value.width)
const resolvedHeight = computed(() => props.height || preset.value.height)
const isVertical = computed(() => props.size === 'sidebar' || props.size === 'square')

function handleDemoClick() {
  clicked.value = true
  setTimeout(() => {
    clicked.value = false
  }, 1500)
}
</script>
