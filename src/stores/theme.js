import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark:
      typeof document !== 'undefined'
        ? document.documentElement.classList.contains('dark')
        : false
  }),

  actions: {
    initTheme() {
      const saved = localStorage.getItem('theme')
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      const dark = saved ? saved === 'dark' : prefersDark
      this.setTheme(dark)
    },

    setTheme(dark) {
      this.isDark = dark
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', dark)
      }
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    },

    toggleTheme() {
      this.setTheme(!this.isDark)
    }
  }
})
