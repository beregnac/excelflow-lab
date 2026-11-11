<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <AppNavbar />

    <main class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="ds-card p-6 sm:p-8 shadow-xl">
          <div class="text-center space-y-2 mb-6">
            <h1 class="ds-h2">Восстановление пароля</h1>
            <p class="ds-muted">Введите email, указанный при регистрации.</p>
          </div>

          <form @submit.prevent="handleRecover" class="space-y-4">
            <div>
              <label for="rec-email" class="ds-label">Email</label>
              <input
                id="rec-email"
                v-model="email"
                type="email"
                required
                placeholder="example@mail.com"
                class="ds-input"
              />
            </div>

            <div
              v-if="message"
              role="alert"
              class="ds-alert"
              :class="
                isSuccess
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                  : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
              "
            >
              {{ message }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full ds-btn ds-btn-lg bg-amber-500 text-white hover:bg-amber-600"
            >
              <span
                v-if="loading"
                class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              ></span>
              Восстановить
            </button>
          </form>

          <div class="mt-6 text-center text-sm">
            <router-link to="/login" class="font-medium text-brand-600 hover:underline dark:text-brand-400">
              ← Вернуться ко входу
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'

const auth = useAuthStore()

const email = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

async function handleRecover() {
  loading.value = true
  message.value = ''

  try {
    const result = await auth.recoverPassword(email.value)
    message.value = `Новый пароль для ${result.email}: ${result.newPassword}`
    isSuccess.value = true
  } catch (err) {
    message.value = err.message
    isSuccess.value = false
  } finally {
    loading.value = false
  }
}
</script>
