<template>
  <!-- Task 1.2: Sticky backdrop-blur navbar with CSS-only mobile burger menu (hidden md:flex) -->
  <header
    id="navbar"
    class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/80"
  >
    <div class="ds-container relative flex flex-wrap items-center justify-between gap-4 py-3.5">
      <!-- Logo left -->
      <router-link
        to="/"
        class="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg dark:text-white"
      >
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-pink-500 text-white shadow-sm">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M3 3v18h18" />
            <path d="M18 17V9M13 17V5M8 17v-3" />
          </svg>
        </span>
        <span>Excel<span class="text-brand-600 dark:text-brand-400">Flow</span></span>
      </router-link>

      <!-- CSS-only mobile menu checkbox trigger (no JS!) -->
      <input
        id="mobile-nav-toggle"
        type="checkbox"
        class="peer sr-only"
        aria-label="Открыть мобильное меню"
      />

      <!-- Right actions & mobile burger button -->
      <div class="flex items-center gap-2 md:order-3">
        <ThemeToggle />

        <router-link
          to="/catalog"
          aria-label="Каталог и корзина"
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span
            v-if="cart.totalCount > 0"
            class="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white shadow"
          >
            {{ cart.totalCount }}
          </span>
        </router-link>

        <template v-if="auth.isAuthenticated">
          <router-link to="/dashboard" class="hidden sm:inline-flex ds-btn ds-btn-secondary ds-btn-sm">
            Дашборд
          </router-link>
          <button
            type="button"
            @click="handleLogout"
            class="ds-btn ds-btn-outline ds-btn-sm"
          >
            Выход
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="ds-btn ds-btn-primary ds-btn-sm">
            Sign In
          </router-link>
        </template>

        <!-- Burger label visible on < md -->
        <label
          for="mobile-nav-toggle"
          class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          title="Меню"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </label>
      </div>

      <!-- Center navigation: hidden on mobile unless checkbox peer-checked, always visible md:flex -->
      <nav
        aria-label="Основная навигация"
        class="hidden w-full flex-col gap-1 border-t border-slate-200 pt-3 peer-checked:flex md:order-2 md:flex md:w-auto md:flex-row md:items-center md:gap-1 md:border-t-0 md:pt-0 dark:border-slate-800"
      >
        <router-link to="/#hero" class="ds-nav-link">Home</router-link>
        <router-link to="/#about" class="ds-nav-link">About</router-link>
        <router-link to="/#services" class="ds-nav-link">Services</router-link>
        <router-link to="/#contact" class="ds-nav-link">Contact</router-link>
        <span class="hidden h-4 w-px bg-slate-200 md:inline-block mx-1 dark:bg-slate-700" aria-hidden="true"></span>
        <router-link to="/dashboard" class="ds-nav-link text-brand-600 dark:text-brand-400 font-semibold">
          Платформа
        </router-link>
        <router-link to="/levels" class="ds-nav-link">
          Уровни 1–4
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import ThemeToggle from './ThemeToggle.vue'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>
