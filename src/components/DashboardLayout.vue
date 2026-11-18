<template>
  <!-- Task 2.3: Fixed Sidebar (w-64 = 256px, fixed inset-y-0 left-0, translate-x-*, h-screen, overflow-y-auto) + Topbar + Content -->
  <div class="min-h-screen bg-transparent text-slate-900 transition-colors duration-300 dark:text-slate-100">
    <!-- Mobile Backdrop -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
      aria-hidden="true"
    ></div>

    <!-- Fixed 256px Sidebar -->
    <aside
      aria-label="Боковая навигация"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      class="fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin dark:border-slate-800 dark:bg-slate-900"
    >
      <!-- Sidebar Brand -->
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <router-link
          to="/"
          class="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 text-white text-sm font-extrabold shadow-sm">
            EF
          </span>
          <span>ExcelFlow</span>
        </router-link>
        <button
          type="button"
          class="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          @click="sidebarOpen = false"
          aria-label="Закрыть меню"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 space-y-6 px-3 py-5">
        <div v-for="group in navGroups" :key="group.title" class="space-y-1">
          <p class="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {{ group.title }}
          </p>
          <router-link
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            @click="sidebarOpen = false"
            class="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            :class="
              route.path === item.to
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            "
          >
            <span class="flex items-center gap-3 min-w-0">
              <span class="text-base shrink-0" aria-hidden="true">{{ item.icon }}</span>
              <span class="truncate">{{ item.label }}</span>
            </span>
            <span
              v-if="item.badge"
              class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </nav>

      <!-- Bottom User Status -->
      <div class="border-t border-slate-200 p-4 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {{ userInitials }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {{ auth.currentUser?.name || 'Гость платформы' }}
            </p>
            <p class="truncate text-xs text-slate-500 dark:text-slate-400">
              {{ auth.currentUser?.email || 'Демо-режим' }}
            </p>
          </div>
          <button
            v-if="auth.isAuthenticated"
            type="button"
            @click="auth.logout(); $router.push('/')"
            class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
            title="Выйти"
            aria-label="Выйти из аккаунта"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
          <router-link
            v-else
            to="/login"
            class="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
          >
            Вход
          </router-link>
        </div>
      </div>
    </aside>

    <!-- Main Right Column -->
    <div class="lg:pl-64 flex min-h-screen flex-col">
      <!-- Topbar with mobile drawer button, search & avatar -->
      <header class="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/85 px-4 sm:px-6 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/85">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <button
            type="button"
            @click="sidebarOpen = true"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Открыть боковую панель"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div class="relative w-full max-w-md hidden sm:block">
            <svg
              class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Быстрый поиск по разделам и данным..."
              aria-label="Поиск по платформе"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div class="flex items-center gap-2.5 shrink-0">
          <slot name="topbar-actions" />
          <ThemeToggle />
          <router-link
            to="/design-system#profile-card"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-pink-500 text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900"
            title="Профиль пользователя"
          >
            {{ userInitials }}
          </router-link>
        </div>
      </header>

      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <slot :search-query="searchQuery" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const auth = useAuthStore()

const sidebarOpen = ref(false)
const searchQuery = ref('')

const userInitials = computed(() => {
  const name = auth.currentUser?.name || 'EF'
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const navGroups = [
  {
    title: 'Основное (Excel + BI)',
    items: [
      { to: '/', label: 'Лендинг 3.3', icon: '🏠', badge: '1.2/2.1' },
      { to: '/dashboard', label: 'Аналитика 4.1', icon: '📊', badge: '2.3/4.1' },
      { to: '/data', label: 'Excel-данные', icon: '📑', badge: 'XLSX' },
      { to: '/admin', label: 'Админ-панель', icon: '🛡️' }
    ]
  },
  {
    title: 'Tailwind Модули',
    items: [
      { to: '/catalog', label: 'Каталог', icon: '🛍️', badge: '1.3/4.3' },
      { to: '/messenger', label: 'Мессенджер', icon: '💬', badge: '3.1' },
      { to: '/kanban', label: 'Kanban-доска', icon: '🗂️', badge: '3.2' },
      { to: '/wizard', label: 'Мастер-форма', icon: '🧭', badge: '4.2' },
      { to: '/design-system', label: 'Дизайн-система', icon: '🎨', badge: '1.1/4.4' },
      { to: '/register', label: 'Регистрация', icon: '📝', badge: '2.4' },
      { to: '/levels', label: 'Карта заданий', icon: '✅', badge: '1–4' },
      { to: '/hosting-report', label: 'Хостинг & AdSlot', icon: '🚀', badge: 'Deploy' }
    ]
  }
]
</script>
