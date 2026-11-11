<template>
  <div class="space-y-6">
    <div>
      <h1 class="ds-h2">Административная панель</h1>
      <p class="ds-muted mt-1">Обзор зарегистрированных пользователей, записей Excel и сохранённых файлов.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div class="ds-card text-center">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Пользователи</p>
        <p class="mt-2 text-4xl font-extrabold text-brand-600 dark:text-brand-400">{{ userCount }}</p>
        <p class="mt-1 text-xs text-slate-400">зарегистрировано</p>
      </div>
      <div class="ds-card text-center">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Записи данных</p>
        <p class="mt-2 text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ dataCount }}</p>
        <p class="mt-1 text-xs text-slate-400">в базе</p>
      </div>
      <div class="ds-card text-center">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Загруженные файлы</p>
        <p class="mt-2 text-4xl font-extrabold text-sky-600 dark:text-sky-400">{{ fileCount }}</p>
        <p class="mt-1 text-xs text-slate-400">в хранилище</p>
      </div>
    </div>

    <div class="ds-card">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 dark:border-slate-800">
        <h2 class="ds-h3">Пользователи</h2>
        <span class="ds-badge ds-badge-brand">{{ userCount }} всего</span>
      </div>

      <div v-if="users.length" class="overflow-x-auto scrollbar-thin">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <th class="py-2.5 pr-4">Имя</th>
              <th class="py-2.5 pr-4">Email</th>
              <th class="py-2.5">Дата регистрации</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr v-for="u in users" :key="u.email" class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <td class="py-3 pr-4 font-medium text-slate-900 dark:text-slate-100">{{ u.name }}</td>
              <td class="py-3 pr-4 text-slate-600 dark:text-slate-300">{{ u.email }}</td>
              <td class="py-3 text-slate-500 dark:text-slate-400">
                {{ new Date(u.createdAt).toLocaleDateString('ru-RU') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else class="text-sm text-slate-500 dark:text-slate-400">Нет зарегистрированных пользователей.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/data'
import { useAuthStore } from '@/stores/auth'

const dataStore = useDataStore()
const authStore = useAuthStore()

const users = computed(() => authStore.users)
const userCount = computed(() => users.value.length)
const dataCount = computed(() => dataStore.totalItems)
const fileCount = computed(() => Object.keys(localStorage).filter((k) => k.startsWith('excelFile_')).length)
</script>
