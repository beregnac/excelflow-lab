<template>
  <!-- Task 4.1: Analytics Dashboard (grid-cols-12, col-span-*, min-w-0, truncate, scrollbar-thin, group/peer) -->
  <DashboardLayout>
    <template #default="{ searchQuery }">
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="min-w-0">
            <span class="ds-badge ds-badge-danger mb-1.5">Задание 4.1 · Дашборд 320px–4K</span>
            <h1 class="ds-h2 truncate">Аналитика и операции</h1>
            <p class="ds-muted truncate">Мониторинг Excel-импортов, транзакций и активности команды.</p>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <router-link to="/data" class="ds-btn ds-btn-outline ds-btn-sm">
              📑 Таблица Excel ({{ dataStore.totalItems }})
            </router-link>
            <button
              type="button"
              @click="dataStore.loadSampleData()"
              class="ds-btn ds-btn-primary ds-btn-sm"
            >
              ⚡ Обновить демо-данные
            </button>
          </div>
        </div>

        <!-- 12-Column Responsive Grid -->
        <div class="grid grid-cols-12 gap-5">
          <!-- 4 Stat Cards with Trends -->
          <article
            v-for="stat in stats"
            :key="stat.label"
            class="group col-span-12 sm:col-span-6 xl:col-span-3 ds-card min-w-0 hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-700"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {{ stat.label }}
                </p>
                <p class="mt-2 flex items-baseline gap-1.5 truncate text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  <span>{{ stat.value }}</span>
                  <BynSymbol v-if="stat.currency" />
                </p>
              </div>
              <span
                class="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold transition-transform duration-200 group-hover:scale-105"
                :class="
                  stat.up
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                "
              >
                {{ stat.trend }}
              </span>
            </div>
            <p class="mt-3 truncate text-xs text-slate-500 dark:text-slate-400">
              {{ stat.note }}
            </p>
          </article>

          <!-- CSS Grid Chart (grid + colored cells) -->
          <section
            class="col-span-12 xl:col-span-8 ds-card min-w-0 flex flex-col justify-between gap-5"
            aria-labelledby="chart-title"
          >
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="min-w-0">
                <h2 id="chart-title" class="ds-h3 truncate">Активность обработки таблиц (CSS Grid Heatmap)</h2>
                <p class="ds-muted truncate">Наведите на ячейку, чтобы увидеть объём обработанных строк за день</p>
              </div>
              <div class="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                <span>Меньше</span>
                <span class="h-3 w-3 rounded-sm bg-slate-100 dark:bg-slate-800"></span>
                <span class="h-3 w-3 rounded-sm bg-brand-200 dark:bg-brand-900"></span>
                <span class="h-3 w-3 rounded-sm bg-brand-400 dark:bg-brand-700"></span>
                <span class="h-3 w-3 rounded-sm bg-brand-600 dark:bg-brand-500"></span>
                <span>Больше</span>
              </div>
            </div>

            <!-- Grid of 12 weeks × 7 days = 84 colored cells -->
            <div class="overflow-x-auto scrollbar-thin pb-2">
              <div class="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
                <div
                  v-for="cell in heatmapCells"
                  :key="cell.id"
                  class="group relative h-6 rounded-md transition-transform duration-150 hover:scale-110 hover:z-10 cursor-pointer"
                  :class="cell.colorClass"
                  :title="`${cell.day}: ${cell.count} строк`"
                >
                  <span class="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-700">
                    {{ cell.count }} стр.
                  </span>
                </div>
              </div>
            </div>

            <!-- Bar Grid Breakdown -->
            <div class="grid grid-cols-6 sm:grid-cols-12 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 items-end h-28">
              <div
                v-for="bar in monthlyBars"
                :key="bar.month"
                class="group flex flex-col items-center justify-end gap-1.5 h-full"
              >
                <div class="w-full flex-1 flex items-end">
                  <div
                    class="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-purple-400 transition-all duration-300 group-hover:brightness-110"
                    :style="{ height: bar.pct + '%' }"
                    :title="`${bar.month}: ${bar.pct}%`"
                  ></div>
                </div>
                <span class="text-[10px] font-medium text-slate-400">{{ bar.month }}</span>
              </div>
            </div>
          </section>

          <!-- Live Excel Data Summary Widget -->
          <section class="col-span-12 xl:col-span-4 ds-card min-w-0 flex flex-col justify-between gap-4">
            <div class="flex items-center justify-between gap-2">
              <h2 class="ds-h3 truncate">База Excel-строк</h2>
              <span class="ds-badge ds-badge-brand">{{ dataStore.totalItems }} стр.</span>
            </div>

            <div class="space-y-3 flex-1 overflow-y-auto max-h-60 scrollbar-thin pr-1">
              <div
                v-if="dataStore.rows.length === 0"
                class="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400 dark:border-slate-800"
              >
                Нет загруженных Excel-файлов. Нажмите «Обновить демо-данные» или загрузите .xlsx на главной.
              </div>
              <div
                v-for="(row, idx) in dataStore.rows.slice(0, 5)"
                :key="idx"
                class="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60"
              >
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {{ row[0] || `Строка #${idx + 1}` }}
                  </p>
                  <p class="truncate text-xs text-slate-500 dark:text-slate-400">
                    {{ row.slice(1, 4).filter(Boolean).join(' · ') || 'Нет доп. полей' }}
                  </p>
                </div>
                <span class="shrink-0 text-xs font-mono text-slate-400">{{ row.length }} кол.</span>
              </div>
            </div>

            <router-link to="/data" class="w-full ds-btn ds-btn-secondary ds-btn-sm">
              Открыть полный редактор Excel →
            </router-link>
          </section>

          <!-- Recent Transactions Table with Filters & Search -->
          <section class="col-span-12 ds-card min-w-0 space-y-4" aria-labelledby="tx-title">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="min-w-0">
                <h2 id="tx-title" class="ds-h3 truncate">Последние транзакции и импорты</h2>
                <p class="ds-muted truncate">Фильтрация по статусу и поиск в реальном времени</p>
              </div>

              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <!-- Peer-driven Filter Pills -->
                <div class="flex flex-wrap gap-1.5">
                  <label
                    v-for="st in ['Все', 'Завершено', 'В обработке', 'Ошибка']"
                    :key="st"
                    class="cursor-pointer"
                  >
                    <input
                      v-model="statusFilter"
                      type="radio"
                      name="tx-status"
                      :value="st"
                      class="peer sr-only"
                    />
                    <span class="inline-block rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700 dark:border-slate-700 dark:text-slate-300 dark:peer-checked:bg-brand-950/60 dark:peer-checked:text-brand-300">
                      {{ st }}
                    </span>
                  </label>
                </div>

                <input
                  v-model="localSearch"
                  type="search"
                  placeholder="Фильтр по клиенту..."
                  aria-label="Поиск по таблице транзакций"
                  class="ds-input py-1.5 sm:w-52"
                />
              </div>
            </div>

            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400 dark:border-slate-800">
                    <th class="py-3 pr-4">ID</th>
                    <th class="py-3 pr-4">Операция / Клиент</th>
                    <th class="py-3 pr-4">Источник</th>
                    <th class="py-3 pr-4">Сумма</th>
                    <th class="py-3 pr-4">Статус</th>
                    <th class="py-3 text-right">Дата</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr
                    v-for="tx in filteredTransactions(searchQuery)"
                    :key="tx.id"
                    class="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td class="py-3.5 pr-4 font-mono text-xs text-slate-400">{{ tx.id }}</td>
                    <td class="py-3.5 pr-4 font-medium text-slate-900 dark:text-slate-100 max-w-[220px] truncate">
                      {{ tx.client }}
                    </td>
                    <td class="py-3.5 pr-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ tx.source }}</td>
                    <td class="py-3.5 pr-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      <span class="inline-flex items-baseline gap-1">{{ tx.amount }} <BynSymbol /></span>
                    </td>
                    <td class="py-3.5 pr-4 whitespace-nowrap">
                      <span
                        class="ds-badge"
                        :class="
                          tx.status === 'Завершено'
                            ? 'ds-badge-success'
                            : tx.status === 'В обработке'
                              ? 'ds-badge-warning'
                              : 'ds-badge-danger'
                        "
                      >
                        {{ tx.status }}
                      </span>
                    </td>
                    <td class="py-3.5 text-right text-xs text-slate-400 whitespace-nowrap">{{ tx.date }}</td>
                  </tr>
                  <tr v-if="filteredTransactions(searchQuery).length === 0">
                    <td colspan="6" class="py-8 text-center text-sm text-slate-400">
                      Нет транзакций, соответствующих фильтру.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </template>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/data'
import DashboardLayout from '@/components/DashboardLayout.vue'
import BynSymbol from '@/components/BynSymbol.vue'

const dataStore = useDataStore()
const statusFilter = ref('Все')
const localSearch = ref('')

const stats = computed(() => [
  {
    label: 'Выручка за месяц',
    value: '1 248 500',
    currency: true,
    trend: '+12%',
    up: true,
    note: 'По сравнению с прошлым месяцем'
  },
  {
    label: 'Строк Excel в базе',
    value: String(dataStore.totalItems || 1420),
    trend: '+24%',
    up: true,
    note: `${dataStore.maxColumns || 7} колонок в активной книге`
  },
  {
    label: 'Среднее время разбора',
    value: '0.28 сек',
    trend: '-3%',
    up: false,
    note: 'Небольшой рост на книгах >10 МБ'
  },
  {
    label: 'Активные команды',
    value: '342',
    trend: '+8.4%',
    up: true,
    note: '98.4% без ошибок валидации'
  }
])

const heatmapLevels = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-brand-200 dark:bg-brand-900/70',
  'bg-brand-400 dark:bg-brand-700',
  'bg-brand-600 dark:bg-brand-500'
]

const heatmapCells = Array.from({ length: 84 }, (_, i) => {
  const count = ((i * 17 + 9) % 45) + 2
  const lvl = count > 34 ? 3 : count > 22 ? 2 : count > 10 ? 1 : 0
  return {
    id: i,
    day: `День ${i + 1}`,
    count,
    colorClass: heatmapLevels[lvl]
  }
})

const monthlyBars = [
  { month: 'Янв', pct: 42 },
  { month: 'Фев', pct: 58 },
  { month: 'Мар', pct: 49 },
  { month: 'Апр', pct: 74 },
  { month: 'Май', pct: 66 },
  { month: 'Июн', pct: 81 },
  { month: 'Июл', pct: 70 },
  { month: 'Авг', pct: 88 },
  { month: 'Сен', pct: 79 },
  { month: 'Окт', pct: 94 },
  { month: 'Ноя', pct: 91 },
  { month: 'Дек', pct: 64 }
]

const transactions = [
  { id: '#TX-9481', client: 'ООО «ТехноЛогистик» — Табель.xlsx', source: 'Excel Импорт', amount: '49 900', status: 'Завершено', date: '11.11.2026' },
  { id: '#TX-9480', client: 'Аналитика продаж Q4 (RetailGrid)', source: 'Тариф Pro', amount: '14 900', status: 'Завершено', date: '11.11.2026' },
  { id: '#TX-9479', client: 'Прайс-лист поставщиков.xls', source: 'API Конвертер', amount: '19 900', status: 'В обработке', date: '10.11.2026' },
  { id: '#TX-9478', client: 'Выгрузка остатков (битый формат)', source: 'Валидатор', amount: '0', status: 'Ошибка', date: '10.11.2026' },
  { id: '#TX-9477', client: 'Студия «Вектор» — Подписка Enterprise', source: 'Тариф Enterprise', amount: '49 900', status: 'Завершено', date: '09.11.2026' }
]

function filteredTransactions(globalSearch) {
  const q = (localSearch.value || globalSearch || '').toLowerCase().trim()
  return transactions.filter((t) => {
    const matchStatus = statusFilter.value === 'Все' || t.status === statusFilter.value
    const matchQuery = !q || t.client.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    return matchStatus && matchQuery
  })
}
</script>
