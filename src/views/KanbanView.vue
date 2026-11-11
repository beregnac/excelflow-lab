<template>
  <!-- Task 3.2: Kanban Board (3 columns, snap-x snap-mandatory, min-w-[300px], group-hover:*, line-clamp-2) -->
  <DashboardLayout>
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="ds-badge ds-badge-warning mb-1.5">Задание 3.2 · Kanban-доска</span>
          <h1 class="ds-h2">Доска задач по данным</h1>
          <p class="ds-muted mt-1">
            Перетаскивайте карточки между колонками или используйте быстрые стрелки при наведении. На мобильных — горизонтальный snap-скролл.
          </p>
        </div>

        <form @submit.prevent="addTask" class="flex items-center gap-2 w-full sm:w-auto">
          <input
            v-model="newTaskTitle"
            type="text"
            placeholder="Новая задача..."
            aria-label="Название новой задачи"
            class="ds-input sm:w-56"
          />
          <button type="submit" class="ds-btn ds-btn-primary ds-btn-md shrink-0">
            ＋ Добавить
          </button>
        </form>
      </div>

      <!-- Horizontal snap-x scroll on mobile, 3-col grid on lg -->
      <div class="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible scrollbar-thin">
        <section
          v-for="(col, colIdx) in columns"
          :key="col.id"
          class="min-w-[300px] flex-1 snap-center rounded-2xl border border-slate-200/90 bg-slate-100/70 p-4 dark:border-slate-800 dark:bg-slate-900/70"
          @dragover.prevent
          @drop="onDrop(col.id)"
        >
          <!-- Column Header + Counter -->
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="h-3 w-3 rounded-full" :class="col.dotClass"></span>
              <h2 class="text-sm font-bold uppercase tracking-wide text-slate-800 dark:text-slate-100">
                {{ col.title }}
              </h2>
            </div>
            <span class="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
              {{ tasksByCol(col.id).length }}
            </span>
          </div>

          <!-- Cards -->
          <div class="space-y-3 min-h-[200px]">
            <article
              v-for="task in tasksByCol(col.id)"
              :key="task.id"
              draggable="true"
              @dragstart="draggedId = task.id"
              class="group relative cursor-grab active:cursor-grabbing rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
            >
              <!-- Top Row: Priority + Visual Drag Handle -->
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    class="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase"
                    :class="priorityClass(task.priority)"
                  >
                    {{ task.priority }}
                  </span>
                  <span
                    v-for="tag in task.tags"
                    :key="tag"
                    class="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Visual Drag Handle -->
                <span
                  class="text-slate-300 opacity-60 transition-opacity group-hover:opacity-100 group-hover:text-slate-500 dark:text-slate-600"
                  title="Перетащите карточку"
                  aria-hidden="true"
                >
                  ⋮⋮
                </span>
              </div>

              <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                {{ task.title }}
              </h3>
              <p class="mt-1.5 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                {{ task.description }}
              </p>

              <!-- Footer: Avatars & group-hover move controls -->
              <div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div class="flex -space-x-2">
                  <span
                    v-for="av in task.avatars"
                    :key="av"
                    class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand-600 text-[10px] font-bold text-white dark:border-slate-900"
                  >
                    {{ av }}
                  </span>
                </div>

                <div class="flex items-center gap-1 opacity-100 sm:opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    v-if="colIdx > 0"
                    type="button"
                    @click="moveTask(task.id, columns[colIdx - 1].id)"
                    class="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    title="Назад"
                  >
                    ←
                  </button>
                  <button
                    v-if="colIdx < columns.length - 1"
                    type="button"
                    @click="moveTask(task.id, columns[colIdx + 1].id)"
                    class="rounded-md border border-slate-200 px-2 py-0.5 text-xs hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    title="Вперёд"
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const columns = [
  { id: 'todo', title: 'To Do', dotClass: 'bg-slate-400' },
  { id: 'progress', title: 'In Progress', dotClass: 'bg-amber-500' },
  { id: 'done', title: 'Done', dotClass: 'bg-emerald-500' }
]

const draggedId = ref(null)
const newTaskTitle = ref('')

const tasks = ref([
  {
    id: 1,
    col: 'todo',
    title: 'Проверить формулы в табеле за ноябрь',
    description: 'Сверить переработки и ночные смены перед финальным экспортом в PDF и отправкой бухгалтерии.',
    priority: 'High',
    tags: ['Excel', 'Отчёт'],
    avatars: ['АС', 'ПВ']
  },
  {
    id: 2,
    col: 'todo',
    title: 'Настроить автовыгрузку на Google Диск',
    description: 'Подключить OAuth-токен для резервного копирования загруженных книг XLSX.',
    priority: 'Medium',
    tags: ['API'],
    avatars: ['ИБ']
  },
  {
    id: 3,
    col: 'progress',
    title: 'Интеграция фильтров каталога @container',
    description: 'Адаптировать карточки модулей под узкие и широкие контейнеры с помощью Tailwind Container Queries.',
    priority: 'High',
    tags: ['Tailwind', 'UI'],
    avatars: ['АС', 'ЕМ']
  },
  {
    id: 4,
    col: 'progress',
    title: 'Валидация многошаговой формы',
    description: 'Добавить состояния data-[state=error] и has-[:checked] для выбора способа оплаты.',
    priority: 'Low',
    tags: ['Forms'],
    avatars: ['ДВ']
  },
  {
    id: 5,
    col: 'done',
    title: 'Закрепить колонки # и Действия в таблице',
    description: 'Исправлен горизонтальный скролл таблицы при масштабе 100% для широких Excel-книг.',
    priority: 'High',
    tags: ['Fix', 'Table'],
    avatars: ['АС']
  }
])

function tasksByCol(colId) {
  return tasks.value.filter((t) => t.col === colId)
}

function priorityClass(p) {
  if (p === 'High') return 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300'
  if (p === 'Medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300'
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
}

function moveTask(id, targetCol) {
  const item = tasks.value.find((t) => t.id === id)
  if (item) item.col = targetCol
}

function onDrop(colId) {
  if (draggedId.value !== null) {
    moveTask(draggedId.value, colId)
    draggedId.value = null
  }
}

function addTask() {
  const title = newTaskTitle.value.trim()
  if (!title) return
  tasks.value.unshift({
    id: Date.now(),
    col: 'todo',
    title,
    description: 'Создана пользователем прямо на доске. Перетащите в следующую колонку после старта работы.',
    priority: 'Medium',
    tags: ['New'],
    avatars: ['EF']
  })
  newTaskTitle.value = ''
}
</script>
