<template>
  <DashboardLayout>
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="ds-badge ds-badge-brand mb-2">Навигатор по лабораторной</span>
          <h1 class="ds-h2">Карта всех 16 заданий (Уровни 1–4)</h1>
          <p class="ds-body mt-1">
            Каждое задание из методички реализовано на Vue 3 + Tailwind CSS v3.4+ и встроено в единое приложение.
          </p>
        </div>
        <router-link to="/design-system" class="ds-btn ds-btn-primary ds-btn-md shrink-0">
          Открыть Дизайн-систему
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section
          v-for="group in LAB_LEVELS"
          :key="group.level"
          class="ds-card flex flex-col gap-4"
        >
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <span class="ds-badge" :class="group.badgeClass">{{ group.level }}</span>
              <h2 class="ds-h3 mt-1.5">{{ group.title }}</h2>
            </div>
            <span class="text-xs font-semibold text-slate-400">{{ group.tasks.length }} задания</span>
          </div>

          <ul class="space-y-3">
            <li
              v-for="task in group.tasks"
              :key="task.id"
              class="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition hover:border-brand-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-brand-700 dark:hover:bg-slate-900"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="font-semibold text-sm text-slate-900 dark:text-white truncate">
                    {{ task.id }} · {{ task.name }}
                  </p>
                  <div class="mt-2 flex flex-wrap gap-1.5">
                    <code
                      v-for="tag in task.tags"
                      :key="tag"
                      class="rounded bg-slate-200/70 px-1.5 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {{ tag }}
                    </code>
                  </div>
                </div>
                <router-link
                  :to="task.route"
                  class="ds-btn ds-btn-outline ds-btn-sm shrink-0"
                >
                  Открыть →
                </router-link>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import { LAB_LEVELS } from '@/data/mockContent'
</script>
