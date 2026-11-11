<template>
  <button
    type="button"
    @click="theme.toggleTheme()"
    :aria-label="theme.isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
    :title="theme.isDark ? 'Светлая тема' : 'Тёмная тема'"
    class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-all duration-300 hover:bg-slate-100 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-amber-300 dark:hover:bg-slate-700"
  >
    <!-- Sun icon (shown in dark mode to switch to light) -->
    <svg
      v-if="theme.isDark"
      class="h-5 w-5 transition-transform duration-300 rotate-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
    <!-- Moon icon (shown in light mode to switch to dark) -->
    <svg
      v-else
      class="h-5 w-5 transition-transform duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>
