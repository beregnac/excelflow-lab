<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header & Actions -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span class="ds-badge ds-badge-success mb-1.5">Исходная лаба · Tailwind версия</span>
          <h1 class="ds-h2">Управление Excel-данными</h1>
          <p class="ds-muted mt-1">
            Просмотр, добавление, редактирование строк, загрузка .xlsx и экспорт.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button type="button" class="ds-btn ds-btn-primary ds-btn-sm" @click="openCreate">
            ＋ Добавить запись
          </button>
          <button
            v-if="dataStore.totalItems === 0"
            type="button"
            class="ds-btn ds-btn-secondary ds-btn-sm"
            @click="dataStore.loadSampleData()"
          >
            ⚡ Загрузить пример
          </button>
          <button
            v-if="dataStore.totalItems > 0"
            type="button"
            class="ds-btn ds-btn-outline ds-btn-sm text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-400"
            @click="clearAll"
          >
            Очистить
          </button>
          <ExportButtons @email="handleEmailExport" @google="handleGoogleExport" />
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="ds-card text-center py-4">
          <p class="ds-muted">Всего записей</p>
          <p class="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">{{ dataStore.totalItems }}</p>
        </div>
        <div class="ds-card text-center py-4">
          <p class="ds-muted">Страница</p>
          <p class="mt-1 text-3xl font-extrabold text-brand-600 dark:text-brand-400">
            {{ dataStore.page }} / {{ dataStore.totalPages }}
          </p>
        </div>
        <div class="ds-card text-center py-4">
          <p class="ds-muted">На странице</p>
          <p class="mt-1 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {{ dataStore.paginatedRows.length }}
          </p>
        </div>
      </div>

      <!-- Inline Uploader toggle -->
      <details class="group ds-card p-4">
        <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-100">
          <span>📤 Загрузить ещё один Excel-файл (.xlsx / .xls)</span>
          <span class="transition-transform group-open:rotate-180">▼</span>
        </summary>
        <div class="pt-4">
          <ExcelUploader @error="showError" />
        </div>
      </details>

      <!-- Table -->
      <DataTable
        :data="dataStore.paginatedRows"
        :headers="headers"
        :page="dataStore.page"
        :page-size="dataStore.pageSize"
        :total-items="dataStore.totalItems"
        @edit="openEdit"
        @delete="confirmDelete"
        @update="openUpdate"
        @go-to-page="dataStore.goToPage"
      />

      <!-- Lazy Load -->
      <div v-if="dataStore.hasMore" class="text-center pt-2">
        <LazyLoadButton :loading="dataStore.loading" @load-more="dataStore.loadMore" />
      </div>

      <DataModal
        :visible="modalVisible"
        :mode="modalMode"
        :row-data="modalRow"
        :saving="modalSaving"
        @close="closeModal"
        @save="handleSave"
        @update:row="updateModalRow"
      />

      <ErrorModal
        :visible="errorModal.visible"
        :message="errorModal.message"
        :details="errorModal.details"
        @close="errorModal.visible = false"
      />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/data'
import DashboardLayout from '@/components/DashboardLayout.vue'
import DataTable from '@/components/DataTable.vue'
import DataModal from '@/components/DataModal.vue'
import LazyLoadButton from '@/components/LazyLoadButton.vue'
import ExportButtons from '@/components/ExportButtons.vue'
import ExcelUploader from '@/components/ExcelUploader.vue'
import ErrorModal from '@/components/ErrorModal.vue'

const dataStore = useDataStore()

const modalVisible = ref(false)
const modalMode = ref('create')
const modalRow = ref([])
const modalSaving = ref(false)
const editingIndex = ref(-1)
const errorModal = ref({ visible: false, message: '', details: '' })

const headers = computed(() => {
  if (dataStore.rows.length === 0) return []
  return Array.from(
    { length: Math.max(...dataStore.rows.map((r) => r.length)) },
    (_, i) => `Поле ${i + 1}`
  )
})

function openCreate() {
  modalMode.value = 'create'
  const count = headers.value.length || 5
  modalRow.value = Array.from({ length: count }, () => '')
  editingIndex.value = -1
  modalVisible.value = true
}

function openEdit(index, row) {
  modalMode.value = 'edit'
  const count = Math.max(headers.value.length, row.length)
  modalRow.value = Array.from({ length: count }, (_, i) => row[i] ?? '')
  const globalIndex = (dataStore.page - 1) * dataStore.pageSize + index
  editingIndex.value = globalIndex
  modalVisible.value = true
}

function openUpdate(index, row) {
  openEdit(index, row)
}

function confirmDelete(index) {
  if (confirm('Вы уверены, что хотите удалить эту запись?')) {
    dataStore.deleteRow(index)
  }
}

function clearAll() {
  if (confirm('Очистить все загруженные строки Excel?')) {
    dataStore.clearAll()
  }
}

function closeModal() {
  modalVisible.value = false
}

function updateModalRow(row) {
  modalRow.value = row
}

async function handleSave(row) {
  modalSaving.value = true
  try {
    if (modalMode.value === 'create') {
      await dataStore.addRow(row)
    } else if (editingIndex.value >= 0) {
      const localIndex = editingIndex.value - (dataStore.page - 1) * dataStore.pageSize
      if (localIndex >= 0 && localIndex < dataStore.paginatedRows.length) {
        await dataStore.updateRow(localIndex, row)
      }
    }
    closeModal()
  } catch (err) {
    showError({ message: 'Ошибка сохранения', details: err.message })
  } finally {
    modalSaving.value = false
  }
}

function showError({ message, details }) {
  errorModal.value = { visible: true, message, details }
}

function handleEmailExport(data) {
  alert('Экспорт на email: ' + data)
}

function handleGoogleExport(data) {
  alert('Экспорт на Google Диск: ' + data)
}
</script>
