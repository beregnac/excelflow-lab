<template>
  <aside
    role="complementary"
    :aria-label="label"
    class="mx-auto flex max-w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/60"
    :style="{ width: resolvedWidth, height: resolvedHeight }"
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
    default: 'Рекламное место'
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
</script>
