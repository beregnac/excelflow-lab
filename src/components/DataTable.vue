<template>
  <div v-if="data.length" class="space-y-4">
    <!-- Horizontal scroll wrapper with sticky # and Actions columns -->
    <div class="overflow-x-auto scrollbar-thin rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <table class="w-full border-collapse text-left text-sm">
        <thead class="bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-100 dark:bg-slate-950">
          <tr>
            <th class="sticky left-0 z-20 w-14 min-w-[56px] bg-slate-900 px-3 py-3.5 text-center shadow-[2px_0_6px_rgba(0,0,0,0.12)] dark:bg-slate-950">
              #
            </th>
            <th
              v-for="(header, i) in headers"
              :key="i"
              class="whitespace-nowrap border-l border-slate-700/60 px-4 py-3.5"
            >
              {{ header }}
            </th>
            <th class="sticky right-0 z-20 w-32 min-w-[128px] border-l border-slate-700/60 bg-slate-900 px-3 py-3.5 text-center shadow-[-2px_0_6px_rgba(0,0,0,0.12)] dark:bg-slate-950">
              Действия
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="group transition-colors odd:bg-white even:bg-slate-50/70 hover:bg-brand-50/50 dark:odd:bg-slate-900 dark:even:bg-slate-900/60 dark:hover:bg-slate-800/70"
          >
            <td class="sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-brand-50 px-3 py-3 text-center font-semibold text-slate-500 shadow-[2px_0_6px_rgba(0,0,0,0.05)] dark:bg-slate-900 dark:group-even:bg-slate-900 dark:group-hover:bg-slate-800 dark:text-slate-400">
              {{ (page - 1) * pageSize + index + 1 }}
            </td>
            <td
              v-for="(_, i) in headers"
              :key="i"
              class="whitespace-nowrap border-l border-slate-100 px-4 py-3 text-slate-700 dark:border-slate-800/80 dark:text-slate-200"
            >
              {{ row[i] !== undefined && row[i] !== null ? row[i] : '' }}
            </td>
            <td class="sticky right-0 z-10 border-l border-slate-100 bg-white group-even:bg-slate-50 group-hover:bg-brand-50 px-3 py-2.5 text-center shadow-[-2px_0_6px_rgba(0,0,0,0.05)] dark:border-slate-800 dark:bg-slate-900 dark:group-even:bg-slate-900 dark:group-hover:bg-slate-800">
              <div class="inline-flex items-center gap-1">
                <button
                  type="button"
                  @click="$emit('edit', index, row)"
                  title="Редактировать"
                  aria-label="Редактировать строку"
                  class="rounded-lg border border-slate-200 p-1.5 text-xs hover:bg-brand-50 hover:border-brand-300 dark:border-slate-700 dark:hover:bg-slate-700"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  @click="$emit('delete', index)"
                  title="Удалить"
                  aria-label="Удалить строку"
                  class="rounded-lg border border-slate-200 p-1.5 text-xs hover:bg-rose-50 hover:border-rose-300 dark:border-slate-700 dark:hover:bg-rose-950/60"
                >
                  🗑️
                </button>
                <button
                  type="button"
                  @click="$emit('update', index, row)"
                  title="Обновить"
                  aria-label="Обновить строку"
                  class="rounded-lg border border-slate-200 p-1.5 text-xs hover:bg-emerald-50 hover:border-emerald-300 dark:border-slate-700 dark:hover:bg-emerald-950/60"
                >
                  🔄
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav
      v-if="totalPages > 1"
      aria-label="Навигация по страницам таблицы"
      class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1"
    >
      <span class="ds-muted">
        Страница {{ page }} из {{ totalPages }} ({{ data.length }} из {{ totalItems }})
      </span>
      <ul class="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            class="ds-btn ds-btn-outline ds-btn-sm"
            :disabled="page <= 1"
            @click="$emit('goToPage', page - 1)"
          >
            ← Назад
          </button>
        </li>
        <li v-for="p in visiblePages" :key="p">
          <button
            type="button"
            class="ds-btn ds-btn-sm min-w-[34px]"
            :class="p === page ? 'ds-btn-primary' : 'ds-btn-outline'"
            :aria-current="p === page ? 'page' : undefined"
            @click="$emit('goToPage', p)"
          >
            {{ p }}
          </button>
        </li>
        <li>
          <button
            type="button"
            class="ds-btn ds-btn-outline ds-btn-sm"
            :disabled="page >= totalPages"
            @click="$emit('goToPage', page + 1)"
          >
            Вперёд →
          </button>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Empty state -->
  <div
    v-else
    class="rounded-2xl border border-dashed border-slate-300 bg-white/70 py-14 px-6 text-center dark:border-slate-700 dark:bg-slate-900/50"
  >
    <svg
      class="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
    <p class="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
      Нет данных. Загрузите Excel-файл или загрузите демонстрационный табель.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, default: () => [] },
  headers: { type: Array, default: () => [] },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  totalItems: { type: Number, default: 0 }
})

defineEmits(['edit', 'delete', 'update', 'goToPage'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize) || 1)
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.page - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})
</script>
