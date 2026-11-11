import { defineStore } from 'pinia'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const SAMPLE_EXCEL_ROWS = [
  ['ТАБЕЛЬ УЧЕТА РАБОЧЕГО ВРЕМЕНИ', 'Отдел разработки', 'Ноябрь 2026', '', '', '', ''],
  ['ФИО', 'Должность', 'Отдел', 'Пн', 'Вт', 'Ср', 'Итого часов'],
  ['Сидоров С.С.', 'Менеджер', 'Аналитика', 8, 8, 8, 168],
  ['Иванова А.П.', 'Frontend Lead', 'Продукт', 8, 9, 8, 176],
  ['Петров В.К.', 'Data Engineer', 'BI и Отчеты', 8, 8, 7, 160],
  ['Смирнова Е.Д.', 'UX/UI Дизайнер', 'Дизайн', 7, 8, 8, 164]
]

export const useDataStore = defineStore('data', {
  state: () => ({
    rows: loadFromStorage('excelData') || [],
    loading: false,
    page: 1,
    pageSize: 10
  }),

  getters: {
    totalItems: (state) => state.rows.length,
    totalPages: (state) => Math.ceil(state.totalItems / state.pageSize) || 1,
    paginatedRows: (state) => {
      const start = (state.page - 1) * state.pageSize
      const end = start + state.pageSize
      return state.rows.slice(start, end)
    },
    hasMore: (state) => state.page < state.totalPages,
    maxColumns: (state) =>
      state.rows.length ? Math.max(...state.rows.map((r) => r.length)) : 0
  },

  actions: {
    async loadExcel(rows) {
      this.loading = true
      await simulateDelay(300)
      this.rows = [...this.rows, ...rows]
      saveToStorage('excelData', this.rows)
      this.loading = false
      return this.rows
    },

    async loadSampleData() {
      this.loading = true
      await simulateDelay(250)
      this.rows = [...SAMPLE_EXCEL_ROWS]
      this.page = 1
      saveToStorage('excelData', this.rows)
      this.loading = false
      return this.rows
    },

    async addRow(row) {
      await simulateDelay(250)
      this.rows.push(row)
      saveToStorage('excelData', this.rows)
    },

    async updateRow(index, row) {
      await simulateDelay(250)
      const globalIndex = (this.page - 1) * this.pageSize + index
      if (globalIndex >= 0 && globalIndex < this.rows.length) {
        this.rows[globalIndex] = row
        saveToStorage('excelData', this.rows)
      }
    },

    async deleteRow(index) {
      await simulateDelay(250)
      const globalIndex = (this.page - 1) * this.pageSize + index
      if (globalIndex >= 0 && globalIndex < this.rows.length) {
        this.rows.splice(globalIndex, 1)
        saveToStorage('excelData', this.rows)
        if (this.paginatedRows.length === 0 && this.page > 1) {
          this.page--
        }
      }
    },

    async loadMore() {
      await simulateDelay(250)
      if (this.page < this.totalPages) {
        this.page++
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.page = page
      }
    },

    clearAll() {
      this.rows = []
      this.page = 1
      saveToStorage('excelData', [])
    }
  }
})

function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
