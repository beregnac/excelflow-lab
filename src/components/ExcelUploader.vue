<template>
  <div
    class="mx-auto max-w-xl rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300"
    :class="[
      isDragOver
        ? 'scale-[1.01] border-brand-500 bg-brand-50/70 dark:bg-brand-950/40'
        : hasFile
          ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30'
          : 'border-slate-300 bg-white/80 hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900/80'
    ]"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <div
      class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors"
      :class="hasFile ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400'"
    >
      <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 12 15 15" />
      </svg>
    </div>

    <p v-if="!hasFile" class="text-base font-medium text-slate-700 dark:text-slate-200">
      Перетащите Excel-файл сюда
      <span class="mt-1 block text-sm font-normal text-slate-500 dark:text-slate-400">
        Поддерживаются форматы .xlsx и .xls
      </span>
    </p>
    <p v-else class="text-base font-semibold text-emerald-700 dark:text-emerald-300">
      {{ fileName }}
      <span class="mt-1 block text-xs font-normal text-emerald-600/80 dark:text-emerald-400/80">
        Файл готов к обработке · нажмите ниже для замены
      </span>
    </p>

    <input
      ref="fileInput"
      type="file"
      accept=".xlsx,.xls"
      @change="handleFile"
      class="sr-only"
      aria-label="Выбрать Excel-файл"
    />

    <div class="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        class="w-full sm:w-auto ds-btn ds-btn-primary ds-btn-md"
        @click="$refs.fileInput.click()"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Выбрать файл
      </button>

      <button
        v-if="hasFile"
        type="button"
        class="w-full sm:w-auto ds-btn ds-btn-md bg-emerald-600 text-white hover:bg-emerald-700"
        @click="parseAndLoad"
        :disabled="loading"
      >
        <span
          v-if="loading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          aria-hidden="true"
        ></span>
        {{ loading ? 'Обработка...' : 'Загрузить и обработать' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/data'
import { parseExcelFile } from '@/utils/excelParser'

const emit = defineEmits(['error', 'parse'])
const dataStore = useDataStore()

const fileInput = ref(null)
const isDragOver = ref(false)
const selectedFile = ref(null)
const loading = ref(false)

const hasFile = computed(() => !!selectedFile.value)
const fileName = computed(() => selectedFile.value?.name || '')

function handleFile(event) {
  const file = event.target.files?.[0]
  validateAndSet(file)
}

function handleDrop(event) {
  isDragOver.value = false
  const file = event.dataTransfer.files?.[0]
  validateAndSet(file)
}

function validateAndSet(file) {
  if (!file) return

  const ext = file.name.split('.').pop().toLowerCase()
  if (ext !== 'xlsx' && ext !== 'xls') {
    emit('error', {
      message: 'Неподдерживаемый формат файла',
      details: `Файл "${file.name}" имеет формат .${ext}.\n\nПоддерживаемые форматы: .xlsx, .xls\n\nПожалуйста, сохраните файл в формате Microsoft Excel и попробуйте снова.`
    })
    return
  }

  selectedFile.value = file
}

async function parseAndLoad() {
  if (!selectedFile.value || loading.value) return

  loading.value = true
  try {
    const file = selectedFile.value
    const rows = await parseExcelFile(file)
    await dataStore.loadExcel(rows)

    const reader = new FileReader()
    await new Promise((resolve, reject) => {
      reader.onload = () => {
        try {
          localStorage.setItem('excelFile_' + file.name, reader.result)
        } catch (e) {
          // Ignore quota error for large files
        }
        resolve()
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    emit('parse', rows)
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''
  } catch (err) {
    emit('error', {
      message: 'Ошибка при загрузке файла',
      details: err.message
    })
  } finally {
    loading.value = false
  }
}
</script>
