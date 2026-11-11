<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <AppNavbar />

    <main class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="ds-card p-6 sm:p-8 shadow-xl">
          <div class="text-center space-y-2 mb-6">
            <h1 class="ds-h2">Вход в ExcelFlow</h1>
            <p class="ds-muted">Войдите в свой аккаунт или используйте быстрый демо-вход.</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label for="login-email" class="ds-label">Email</label>
              <input
                id="login-email"
                v-model="email"
                type="email"
                required
                placeholder="example@mail.com"
                class="ds-input"
              />
            </div>

            <div>
              <label for="login-pass" class="ds-label">Пароль</label>
              <input
                id="login-pass"
                v-model="password"
                type="password"
                required
                placeholder="Введите пароль"
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
              class="w-full ds-btn ds-btn-primary ds-btn-lg"
            >
              <span
                v-if="loading"
                class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              ></span>
              Войти
            </button>
          </form>

          <div class="relative my-5">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-slate-400 dark:bg-slate-900">или</span>
            </div>
          </div>

          <button
            type="button"
            @click="handleDemoLogin"
            :disabled="loading"
            class="w-full ds-btn ds-btn-outline ds-btn-md"
          >
            ⚡ Быстрый демо-вход (Demo Admin)
          </button>

          <div class="mt-6 flex flex-col gap-2 text-center text-sm text-slate-500 dark:text-slate-400">
            <router-link to="/recover" class="hover:text-brand-600 dark:hover:text-brand-400">
              Забыли пароль?
            </router-link>
            <router-link to="/register" class="font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Нет аккаунта? Зарегистрироваться
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

async function handleLogin() {
  loading.value = true
  message.value = ''

  try {
    await auth.login(email.value, password.value)
    message.value = 'Успешный вход! Перенаправление...'
    isSuccess.value = true
    setTimeout(() => {
      const redirect = route.query.redirect || '/dashboard'
      router.push(redirect)
    }, 600)
  } catch (err) {
    message.value = err.message
    isSuccess.value = false
  } finally {
    loading.value = false
  }
}

async function handleDemoLogin() {
  loading.value = true
  try {
    await auth.loginDemo()
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>
