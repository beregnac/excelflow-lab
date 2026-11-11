<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="data-modal-title"
  >
    <div
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      @click="close"
    ></div>

    <div class="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <h3 id="data-modal-title" class="text-lg font-bold text-slate-900 dark:text-white">
          {{ mode === 'create' ? 'Добавить запись' : 'Редактировать запись' }}
        </h3>
        <button
          type="button"
          @click="close"
          aria-label="Закрыть окно"
          class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="max-h-[60vh] overflow-y-auto scrollbar-thin p-6">
        <form @submit.prevent="submit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(_, index) in maxFields" :key="index">
            <label class="ds-label">Поле {{ index + 1 }}</label>
            <input
              type="text"
              class="ds-input"
              :value="rowData[index] ?? ''"
              @input="updateField(index, $event.target.value)"
              :placeholder="`Значение поля ${index + 1}`"
            />
          </div>
        </form>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
        <button type="button" class="ds-btn ds-btn-secondary ds-btn-md" @click="close">
          Отмена
        </button>
        <button
          type="button"
          class="ds-btn ds-btn-primary ds-btn-md"
          @click="submit"
          :disabled="saving"
        >
          <span
            v-if="saving"
            class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          ></span>
          {{ mode === 'create' ? 'Добавить' : 'Сохранить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  mode: { type: String, default: 'create' },
  rowData: { type: Array, default: () => [] },
  saving: Boolean
})

const emit = defineEmits(['close', 'save', 'update:row'])

const maxFields = computed(() => Math.max(props.rowData.length, 5))

function updateField(index, value) {
  const newRow = [...props.rowData]
  newRow[index] = value
  emit('update:row', newRow)
}

function submit() {
  emit('save', [...props.rowData])
}

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
