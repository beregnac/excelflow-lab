<template>
  <!-- Task 2.4: Registration form with peer-invalid, peer-focus, password strength bars, group loading state -->
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <AppNavbar />

    <main class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <div class="ds-card p-6 sm:p-8 shadow-xl">
          <div class="text-center space-y-2 mb-6">
            <span class="ds-badge ds-badge-brand">Задание 2.4 · Валидация Tailwind</span>
            <h1 class="ds-h2">Создать аккаунт</h1>
            <p class="ds-muted">Зарегистрируйтесь для доступа к Excel-хранилищу и админ-панели.</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Name -->
            <div>
              <label for="reg-name" class="ds-label">Имя</label>
              <input
                id="reg-name"
                v-model="name"
                type="text"
                required
                minlength="2"
                placeholder="Ваше имя"
                class="peer ds-input focus:ring-2 [&:not(:placeholder-shown)]:invalid:border-red-500"
              />
              <p class="mt-1 hidden text-xs text-red-500 peer-invalid:block peer-placeholder-shown:!hidden peer-focus:text-amber-500">
                Имя должно содержать минимум 2 символа
              </p>
            </div>

            <!-- Email with peer-invalid & peer-focus -->
            <div>
              <label for="reg-email" class="ds-label">Email</label>
              <div class="relative">
                <input
                  id="reg-email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="example@mail.com"
                  class="peer ds-input focus:ring-2 [&:not(:placeholder-shown)]:invalid:border-red-500"
                />
                <span class="mt-1.5 hidden rounded-lg border border-transparent px-2.5 py-1 text-xs text-red-600 peer-invalid:block peer-invalid:border-red-500 peer-invalid:bg-red-50/70 peer-placeholder-shown:!hidden peer-focus:text-brand-600 dark:peer-invalid:bg-red-950/30 dark:peer-invalid:text-red-400 dark:peer-focus:text-brand-400">
                  Укажите корректный адрес электронной почты (например, user@domain.com)
                </span>
                <span class="mt-1 hidden text-xs text-emerald-600 peer-valid:block dark:text-emerald-400">
                  Email корректен ✓
                </span>
              </div>
            </div>

            <!-- Password + Strength Indicator Bars -->
            <div>
              <label for="reg-password" class="ds-label">Пароль</label>
              <input
                id="reg-password"
                v-model="password"
                type="password"
                required
                minlength="6"
                placeholder="Минимум 6 символов"
                class="peer ds-input focus:ring-2 [&:not(:placeholder-shown)]:invalid:border-red-500"
              />
              <p class="mt-1 hidden text-xs text-red-500 peer-invalid:block peer-placeholder-shown:!hidden peer-focus:text-amber-500">
                Минимум 6 символов
              </p>

              <!-- Password strength indicator bars -->
              <div class="mt-2.5 space-y-1.5" aria-live="polite">
                <div class="grid grid-cols-4 gap-1.5">
                  <div
                    v-for="bar in 4"
                    :key="bar"
                    class="h-1.5 rounded-full transition-all duration-300"
                    :class="bar <= passwordStrength.score ? passwordStrength.colorClass : 'bg-slate-200 dark:bg-slate-800'"
                  ></div>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 dark:text-slate-400">Надёжность пароля:</span>
                  <span class="font-semibold" :class="passwordStrength.textClass">
                    {{ passwordStrength.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="reg-confirm" class="ds-label">Подтверждение пароля</label>
              <input
                id="reg-confirm"
                v-model="confirmPassword"
                type="password"
                required
                placeholder="Повторите пароль"
                class="peer ds-input focus:ring-2"
                :class="confirmPassword && confirmPassword !== password ? 'border-red-500 focus:ring-red-500' : ''"
              />
              <p
                v-if="confirmPassword && confirmPassword !== password"
                class="mt-1 text-xs text-red-500"
              >
                Пароли не совпадают
              </p>
              <p
                v-else-if="confirmPassword && confirmPassword === password"
                class="mt-1 text-xs text-emerald-600 dark:text-emerald-400"
              >
                Пароли совпадают ✓
              </p>
            </div>

            <!-- Agreement Checkbox with peer styling -->
            <div class="pt-1">
              <label class="flex items-start gap-2.5 cursor-pointer text-sm text-slate-600 dark:text-slate-300">
                <input
                  v-model="agreed"
                  type="checkbox"
                  required
                  class="peer ds-checkbox mt-0.5"
                />
                <span class="peer-checked:text-slate-900 dark:peer-checked:text-white transition-colors">
                  Я согласен с условиями использования и политикой обработки данных
                </span>
              </label>
            </div>

            <!-- Feedback Alert -->
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

            <!-- Submit Button with group loading state + disabled:opacity-50 -->
            <button
              type="submit"
              :disabled="loading || !agreed"
              :data-loading="loading"
              class="group w-full ds-btn ds-btn-primary ds-btn-lg disabled:opacity-50"
            >
              <span
                class="hidden h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent group-data-[loading=true]:inline-block"
                aria-hidden="true"
              ></span>
              <span class="group-data-[loading=true]:hidden">Зарегистрироваться</span>
              <span class="hidden group-data-[loading=true]:inline">Создание аккаунта...</span>
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Уже есть аккаунт?
            <router-link to="/login" class="font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Войти
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppNavbar from '@/components/AppNavbar.vue'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreed = ref(false)
const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

const passwordStrength = computed(() => {
  const val = password.value
  if (!val) {
    return { score: 0, label: 'Не задан', colorClass: 'bg-slate-300', textClass: 'text-slate-400' }
  }
  let score = 0
  if (val.length >= 6) score++
  if (val.length >= 10) score++
  if (/[A-ZА-Я0-9]/.test(val)) score++
  if (/[^a-zA-Zа-яА-Я0-9]/.test(val)) score++

  if (score <= 1) {
    return { score: 1, label: 'Слабый', colorClass: 'bg-rose-500', textClass: 'text-rose-500' }
  }
  if (score === 2) {
    return { score: 2, label: 'Средний', colorClass: 'bg-amber-500', textClass: 'text-amber-500' }
  }
  if (score === 3) {
    return { score: 3, label: 'Хороший', colorClass: 'bg-sky-500', textClass: 'text-sky-500' }
  }
  return { score: 4, label: 'Отличный', colorClass: 'bg-emerald-500', textClass: 'text-emerald-500' }
})

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    message.value = 'Пароли не совпадают'
    isSuccess.value = false
    return
  }

  loading.value = true
  message.value = ''

  try {
    await auth.register(name.value, email.value, password.value)
    message.value = 'Регистрация успешна! Перенаправление на вход...'
    isSuccess.value = true
    setTimeout(() => router.push('/login'), 1200)
  } catch (err) {
    message.value = err.message
    isSuccess.value = false
  } finally {
    loading.value = false
  }
}
</script>
