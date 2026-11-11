<template>
  <!-- Task 3.1: Messenger Layout (flex, overflow-y-auto, sticky bottom-0, [&::-webkit-scrollbar]:w-2) -->
  <DashboardLayout>
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between gap-3">
        <div>
          <span class="ds-badge ds-badge-warning mb-1">Задание 3.1 · Мессенджер</span>
          <h1 class="ds-h2">Командный чат</h1>
        </div>
        <button
          type="button"
          class="md:hidden ds-btn ds-btn-outline ds-btn-sm"
          @click="mobileShowChat = !mobileShowChat"
        >
          {{ mobileShowChat ? '← Все диалоги' : 'Открыть чат →' }}
        </button>
      </div>

      <div class="flex h-[calc(100vh-13.5rem)] min-h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <!-- Left Dialog List -->
        <aside
          aria-label="Список диалогов"
          :class="mobileShowChat ? 'hidden md:flex' : 'flex'"
          class="w-full md:w-80 shrink-0 flex-col border-r border-slate-200 dark:border-slate-800"
        >
          <div class="border-b border-slate-200 p-3.5 dark:border-slate-800">
            <input
              v-model="dialogSearch"
              type="search"
              placeholder="Поиск диалога..."
              aria-label="Поиск диалога"
              class="ds-input py-2"
            />
          </div>

          <ul class="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
            <li v-for="dialog in filteredDialogs" :key="dialog.id">
              <button
                type="button"
                @click="selectDialog(dialog)"
                class="flex w-full items-center gap-3 p-3.5 text-left transition-colors"
                :class="
                  activeDialogId === dialog.id
                    ? 'bg-brand-50/80 dark:bg-brand-950/50'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                "
              >
                <div class="relative shrink-0">
                  <div
                    class="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                    :class="dialog.avatarBg"
                  >
                    {{ dialog.initials }}
                  </div>
                  <span
                    v-if="dialog.online"
                    class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
                  ></span>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <span class="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {{ dialog.name }}
                    </span>
                    <span class="shrink-0 text-[11px] text-slate-400">{{ dialog.time }}</span>
                  </div>
                  <div class="mt-0.5 flex items-center justify-between gap-2">
                    <p class="truncate text-xs text-slate-500 dark:text-slate-400">
                      {{ dialog.messages[dialog.messages.length - 1]?.text }}
                    </p>
                    <span
                      v-if="dialog.unread > 0"
                      class="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white"
                    >
                      {{ dialog.unread }}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </aside>

        <!-- Right Messages Area -->
        <section
          aria-label="Область сообщений"
          :class="mobileShowChat ? 'flex' : 'hidden md:flex'"
          class="flex-1 flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950/40"
        >
          <!-- Chat Header -->
          <div class="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                :class="activeDialog.avatarBg"
              >
                {{ activeDialog.initials }}
              </div>
              <div class="min-w-0">
                <h2 class="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {{ activeDialog.name }}
                </h2>
                <p class="text-xs text-emerald-600 dark:text-emerald-400">
                  {{ activeDialog.online ? 'В сети' : 'Был(а) недавно' }}
                </p>
              </div>
            </div>
            <span class="ds-badge ds-badge-brand hidden sm:inline-flex">{{ activeDialog.role }}</span>
          </div>

          <!-- Messages Feed with Custom Styled Scrollbar -->
          <div
            ref="feedRef"
            class="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700"
          >
            <div
              v-for="msg in activeDialog.messages"
              :key="msg.id"
              class="flex"
              :class="msg.mine ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm"
                :class="
                  msg.mine
                    ? 'rounded-br-sm bg-blue-600 text-white'
                    : 'rounded-bl-sm bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                "
              >
                <p class="leading-relaxed">{{ msg.text }}</p>
                <span
                  class="mt-1 block text-right text-[10px]"
                  :class="msg.mine ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'"
                >
                  {{ msg.time }}
                </span>
              </div>
            </div>
          </div>

          <!-- Sticky Bottom Input -->
          <form
            @submit.prevent="sendMessage"
            class="sticky bottom-0 flex items-center gap-2.5 border-t border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
          >
            <input
              v-model="draft"
              type="text"
              placeholder="Напишите сообщение..."
              aria-label="Текст сообщения"
              class="ds-input flex-1"
            />
            <button
              type="submit"
              :disabled="!draft.trim()"
              class="ds-btn ds-btn-primary ds-btn-md shrink-0"
            >
              Отправить
            </button>
          </form>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const dialogSearch = ref('')
const activeDialogId = ref(1)
const mobileShowChat = ref(false)
const draft = ref('')
const feedRef = ref(null)

const dialogs = ref([
  {
    id: 1,
    name: 'Алина Соколова',
    role: 'Lead Analyst',
    initials: 'АС',
    avatarBg: 'bg-gradient-to-tr from-indigo-500 to-purple-500',
    online: true,
    time: '11:14',
    unread: 2,
    messages: [
      { id: 1, mine: false, text: 'Привет! Ты уже проверил новый табель за ноябрь?', time: '11:10' },
      { id: 2, mine: true, text: 'Да, загрузил его в ExcelFlow — все 30 колонок выровнялись отлично.', time: '11:12' },
      { id: 3, mine: false, text: 'Супер! Перекинь потом карточку в колонку Done на Kanban-доске.', time: '11:14' }
    ]
  },
  {
    id: 2,
    name: 'Петр Волков',
    role: 'Data Engineer',
    initials: 'ПВ',
    avatarBg: 'bg-gradient-to-tr from-emerald-500 to-teal-500',
    online: true,
    time: '10:42',
    unread: 1,
    messages: [
      { id: 1, mine: false, text: 'Собрал парсер XLSX для отчёта по складу.', time: '10:42' }
    ]
  },
  {
    id: 3,
    name: 'Команда Дизайна',
    role: 'UI/UX',
    initials: 'КД',
    avatarBg: 'bg-gradient-to-tr from-pink-500 to-rose-500',
    online: false,
    time: 'Вчера',
    unread: 0,
    messages: [
      { id: 1, mine: false, text: 'Обновили токены brand и semantic цветов в tailwind.config.js', time: 'Вчера' },
      { id: 2, mine: true, text: 'Принято, подключил @layer components и dark mode!', time: 'Вчера' }
    ]
  }
])

const filteredDialogs = computed(() => {
  const q = dialogSearch.value.toLowerCase().trim()
  if (!q) return dialogs.value
  return dialogs.value.filter((d) => d.name.toLowerCase().includes(q))
})

const activeDialog = computed(
  () => dialogs.value.find((d) => d.id === activeDialogId.value) || dialogs.value[0]
)

function selectDialog(dialog) {
  activeDialogId.value = dialog.id
  dialog.unread = 0
  mobileShowChat.value = true
}

async function sendMessage() {
  const text = draft.value.trim()
  if (!text) return
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  activeDialog.value.messages.push({
    id: Date.now(),
    mine: true,
    text,
    time
  })
  activeDialog.value.time = time
  draft.value = ''
  await nextTick()
  if (feedRef.value) {
    feedRef.value.scrollTop = feedRef.value.scrollHeight
  }
}
</script>
