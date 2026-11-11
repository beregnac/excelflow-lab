<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="error-modal-title"
  >
    <div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" @click="close"></div>

    <div class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-2xl dark:border-rose-900/60 dark:bg-slate-900">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h3 id="error-modal-title" class="flex items-center gap-2 text-lg font-bold text-rose-600 dark:text-rose-400">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Ошибка
        </h3>
        <button
          type="button"
          @click="close"
          aria-label="Закрыть"
          class="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ✕
        </button>
      </div>

      <div class="p-6 space-y-3">
        <p class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ message }}</p>
        <div
          v-if="details"
          class="whitespace-pre-line rounded-xl border border-sky-200 bg-sky-50 p-3.5 text-xs text-sky-900 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-200"
        >
          {{ details }}
        </div>
      </div>

      <div class="flex justify-end border-t border-slate-200 px-6 py-3.5 dark:border-slate-800">
        <button type="button" class="ds-btn ds-btn-secondary ds-btn-sm" @click="close">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  message: { type: String, default: 'Произошла ошибка' },
  details: { type: String, default: '' }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

watch(
  () => props.visible,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  }
)
</script>
