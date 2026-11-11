<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class="ds-btn ds-btn-outline ds-btn-sm text-sky-700 border-sky-300 hover:bg-sky-50 dark:text-sky-300 dark:border-sky-800 dark:hover:bg-sky-950/50"
      @click="exportToEmail"
      :disabled="loading"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
      Отправить на email
    </button>
    <button
      type="button"
      class="ds-btn ds-btn-outline ds-btn-sm text-amber-700 border-amber-300 hover:bg-amber-50 dark:text-amber-300 dark:border-amber-800 dark:hover:bg-amber-950/50"
      @click="exportToGoogleDrive"
      :disabled="loading"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2z" />
        <polyline points="8 13 12 9 16 13" />
        <line x1="12" y1="9" x2="12" y2="17" />
      </svg>
      Google Диск
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['email', 'google'])
const loading = ref(false)

async function exportToEmail() {
  loading.value = true
  try {
    const data = JSON.stringify({ exportedAt: new Date().toISOString(), type: 'email' })
    emit('email', data)
  } finally {
    loading.value = false
  }
}

async function exportToGoogleDrive() {
  loading.value = true
  try {
    const data = JSON.stringify({ exportedAt: new Date().toISOString(), type: 'google-drive' })
    emit('google', data)
  } finally {
    loading.value = false
  }
}
</script>
