<template>
  <!-- Task 4.2: Multi-step Wizard Form with aria-*, has-[:checked]:*, data-[state=*]:* -->
  <DashboardLayout>
    <div class="mx-auto max-w-3xl space-y-6">
      <div>
        <span class="ds-badge ds-badge-danger mb-1.5">Задание 4.2 · Tailwind 3.4+ (has-* / data-[state=*])</span>
        <h1 class="ds-h2">Многошаговая форма подключения</h1>
        <p class="ds-muted mt-1">
          Степпер из 4 шагов с валидацией, доступностью <code class="text-xs">aria-*</code> и селекторами <code class="text-xs">has-[:checked]</code> / <code class="text-xs">data-[state=*]</code>.
        </p>
      </div>

      <!-- Progress Bar -->
      <div class="ds-card space-y-5">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-semibold">
            <span class="text-slate-600 dark:text-slate-300">Шаг {{ currentStep }} из 4</span>
            <span class="text-brand-600 dark:text-brand-400">{{ Math.round((currentStep / 4) * 100) }}%</span>
          </div>
          <div
            role="progressbar"
            :aria-valuenow="currentStep"
            aria-valuemin="1"
            aria-valuemax="4"
            aria-label="Прогресс заполнения формы"
            class="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          >
            <div
              class="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500 transition-all duration-300"
              :style="{ width: `${(currentStep / 4) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- 4-Step Stepper using data-[state=*]:* -->
        <nav aria-label="Шаги формы">
          <ol class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <li
              v-for="step in steps"
              :key="step.num"
              :data-state="getStepState(step.num)"
              :aria-current="currentStep === step.num ? 'step' : undefined"
              class="group flex items-center gap-2.5 rounded-xl border p-2.5 transition-all
                     data-[state=active]:border-brand-500 data-[state=active]:bg-brand-50/70 data-[state=active]:ring-2 data-[state=active]:ring-brand-500/20
                     data-[state=completed]:border-emerald-300 data-[state=completed]:bg-emerald-50/60
                     data-[state=error]:border-rose-400 data-[state=error]:bg-rose-50/60
                     data-[state=disabled]:border-slate-200 data-[state=disabled]:opacity-60
                     dark:data-[state=active]:bg-brand-950/40 dark:data-[state=completed]:border-emerald-800 dark:data-[state=completed]:bg-emerald-950/30
                     dark:data-[state=error]:border-rose-800 dark:data-[state=error]:bg-rose-950/30 dark:data-[state=disabled]:border-slate-800"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold
                       group-data-[state=active]:bg-brand-600 group-data-[state=active]:text-white
                       group-data-[state=completed]:bg-emerald-600 group-data-[state=completed]:text-white
                       group-data-[state=error]:bg-rose-600 group-data-[state=error]:text-white
                       group-data-[state=disabled]:bg-slate-200 group-data-[state=disabled]:text-slate-500
                       dark:group-data-[state=disabled]:bg-slate-800 dark:group-data-[state=disabled]:text-slate-400"
              >
                {{ getStepState(step.num) === 'completed' ? '✓' : getStepState(step.num) === 'error' ? '!' : step.num }}
              </span>
              <span class="min-w-0 truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                {{ step.label }}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Completed Screen -->
      <div
        v-if="submitted"
        class="ds-card border-emerald-300 bg-emerald-50/60 p-8 text-center space-y-4 dark:border-emerald-800 dark:bg-emerald-950/30"
        role="status"
      >
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white shadow">
          ✓
        </div>
        <h2 class="ds-h2">Заявка успешно оформлена!</h2>
        <p class="ds-body max-w-md mx-auto">
          Спасибо, <strong>{{ form.fullName }}</strong>! Подписка и доставка на адрес
          <strong>{{ form.city }}, {{ form.street }}</strong> подтверждены.
        </p>
        <button type="button" @click="resetWizard" class="ds-btn ds-btn-primary ds-btn-md">
          Заполнить заново
        </button>
      </div>

      <!-- Form Card -->
      <form v-else @submit.prevent="handleNext" class="ds-card space-y-6" novalidate>
        <!-- Step 1: Личные данные -->
        <fieldset v-if="currentStep === 1" class="space-y-4">
          <legend class="ds-h3 mb-2">1. Личные данные</legend>

          <div
            :data-state="errors.fullName ? 'error' : form.fullName.length >= 3 ? 'success' : 'idle'"
            class="group space-y-1.5"
          >
            <label for="wiz-name" class="ds-label">ФИО *</label>
            <input
              id="wiz-name"
              v-model="form.fullName"
              type="text"
              placeholder="Иванов Иван Иванович"
              :aria-invalid="!!errors.fullName"
              aria-describedby="wiz-name-hint"
              class="ds-input group-data-[state=error]:border-rose-500 group-data-[state=error]:ring-rose-500/20 group-data-[state=success]:border-emerald-500"
            />
            <p
              id="wiz-name-hint"
              class="text-xs group-data-[state=error]:text-rose-500 group-data-[state=success]:text-emerald-600 text-slate-400"
            >
              {{ errors.fullName || (form.fullName.length >= 3 ? 'Поле заполнено корректно ✓' : 'Минимум 3 символа') }}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div :data-state="errors.email ? 'error' : validEmail ? 'success' : 'idle'" class="group space-y-1.5">
              <label for="wiz-email" class="ds-label">Рабочий Email *</label>
              <input
                id="wiz-email"
                v-model="form.email"
                type="email"
                placeholder="name@company.ru"
                :aria-invalid="!!errors.email"
                class="ds-input group-data-[state=error]:border-rose-500 group-data-[state=success]:border-emerald-500"
              />
              <p v-if="errors.email" class="text-xs text-rose-500">{{ errors.email }}</p>
            </div>

            <div :data-state="errors.phone ? 'error' : form.phone.length >= 7 ? 'success' : 'idle'" class="group space-y-1.5">
              <label for="wiz-phone" class="ds-label">Телефон *</label>
              <input
                id="wiz-phone"
                v-model="form.phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                :aria-invalid="!!errors.phone"
                class="ds-input group-data-[state=error]:border-rose-500 group-data-[state=success]:border-emerald-500"
              />
              <p v-if="errors.phone" class="text-xs text-rose-500">{{ errors.phone }}</p>
            </div>
          </div>
        </fieldset>

        <!-- Step 2: Адрес -->
        <fieldset v-if="currentStep === 2" class="space-y-4">
          <legend class="ds-h3 mb-2">2. Адрес и способ доставки</legend>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div :data-state="errors.city ? 'error' : 'idle'" class="group space-y-1.5">
              <label for="wiz-city" class="ds-label">Город *</label>
              <input
                id="wiz-city"
                v-model="form.city"
                type="text"
                placeholder="Москва"
                :aria-invalid="!!errors.city"
                class="ds-input group-data-[state=error]:border-rose-500"
              />
              <p v-if="errors.city" class="text-xs text-rose-500">{{ errors.city }}</p>
            </div>

            <div :data-state="errors.street ? 'error' : 'idle'" class="group space-y-1.5">
              <label for="wiz-street" class="ds-label">Улица и дом *</label>
              <input
                id="wiz-street"
                v-model="form.street"
                type="text"
                placeholder="ул. Тверская, д. 12"
                :aria-invalid="!!errors.street"
                class="ds-input group-data-[state=error]:border-rose-500"
              />
              <p v-if="errors.street" class="text-xs text-rose-500">{{ errors.street }}</p>
            </div>
          </div>

          <!-- Tailwind 3.4 has-[:checked]:* Radio Cards -->
          <div class="space-y-2 pt-2">
            <span class="ds-label">Формат получения</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                v-for="opt in ['Цифровая лицензия (мгновенно)', 'Курьер + закрывающие документы']"
                :key="opt"
                class="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition-all hover:border-brand-300
                       has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50/70 has-[:checked]:ring-2 has-[:checked]:ring-brand-500/30
                       dark:border-slate-700 dark:has-[:checked]:bg-brand-950/50"
              >
                <input
                  v-model="form.delivery"
                  type="radio"
                  name="delivery"
                  :value="opt"
                  class="h-4 w-4 text-brand-600 focus:ring-brand-500"
                />
                <span class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ opt }}</span>
              </label>
            </div>
          </div>
        </fieldset>

        <!-- Step 3: Оплата (has-[:checked]:*) -->
        <fieldset v-if="currentStep === 3" class="space-y-4">
          <legend class="ds-h3 mb-2">3. Способ оплаты</legend>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label
              v-for="pay in paymentMethods"
              :key="pay.id"
              class="flex cursor-pointer flex-col gap-2 rounded-2xl border border-slate-200 p-4 transition-all hover:border-brand-300
                     has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50/70 has-[:checked]:ring-2 has-[:checked]:ring-brand-500
                     dark:border-slate-700 dark:has-[:checked]:bg-brand-950/40"
            >
              <div class="flex items-center justify-between">
                <span class="text-xl" aria-hidden="true">{{ pay.icon }}</span>
                <input
                  v-model="form.payment"
                  type="radio"
                  name="payment"
                  :value="pay.id"
                  class="h-4 w-4 text-brand-600 focus:ring-brand-500"
                />
              </div>
              <span class="text-sm font-bold text-slate-900 dark:text-white">{{ pay.title }}</span>
              <span class="text-xs text-slate-500 dark:text-slate-400">{{ pay.desc }}</span>
            </label>
          </div>

          <div v-if="form.payment === 'card'" :data-state="errors.cardLast4 ? 'error' : 'idle'" class="group space-y-1.5 pt-2">
            <label for="wiz-card" class="ds-label">Номер карты (последние 4 цифры для демо) *</label>
            <input
              id="wiz-card"
              v-model="form.cardLast4"
              type="text"
              maxlength="4"
              placeholder="4242"
              :aria-invalid="!!errors.cardLast4"
              class="ds-input sm:max-w-xs group-data-[state=error]:border-rose-500"
            />
            <p v-if="errors.cardLast4" class="text-xs text-rose-500">{{ errors.cardLast4 }}</p>
          </div>
        </fieldset>

        <!-- Step 4: Подтверждение -->
        <fieldset v-if="currentStep === 4" class="space-y-4">
          <legend class="ds-h3 mb-2">4. Подтверждение данных</legend>

          <dl class="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/70 px-4 dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950/60">
            <div class="flex justify-between py-3 text-sm">
              <dt class="text-slate-500 dark:text-slate-400">Получатель</dt>
              <dd class="font-semibold text-slate-900 dark:text-white">{{ form.fullName }}</dd>
            </div>
            <div class="flex justify-between py-3 text-sm">
              <dt class="text-slate-500 dark:text-slate-400">Контакты</dt>
              <dd class="font-medium text-slate-800 dark:text-slate-200">{{ form.email }} · {{ form.phone }}</dd>
            </div>
            <div class="flex justify-between py-3 text-sm">
              <dt class="text-slate-500 dark:text-slate-400">Адрес и формат</dt>
              <dd class="font-medium text-slate-800 dark:text-slate-200 text-right">{{ form.city }}, {{ form.street }} ({{ form.delivery }})</dd>
            </div>
            <div class="flex justify-between py-3 text-sm">
              <dt class="text-slate-500 dark:text-slate-400">Оплата</dt>
              <dd class="font-semibold text-brand-600 dark:text-brand-400">{{ form.payment.toUpperCase() }}</dd>
            </div>
          </dl>

          <label class="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 cursor-pointer has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/50 dark:border-slate-700 dark:has-[:checked]:bg-emerald-950/30">
            <input v-model="form.confirm" type="checkbox" class="ds-checkbox" />
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
              Подтверждаю корректность введённых данных
            </span>
          </label>
          <p v-if="errors.confirm" class="text-xs text-rose-500">{{ errors.confirm }}</p>
        </fieldset>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="button"
            @click="prevStep"
            :disabled="currentStep === 1"
            :aria-disabled="currentStep === 1"
            class="ds-btn ds-btn-outline ds-btn-md"
          >
            ← Back
          </button>

          <button type="submit" class="ds-btn ds-btn-primary ds-btn-md">
            {{ currentStep === 4 ? 'Подтвердить и отправить ✓' : 'Next →' }}
          </button>
        </div>
      </form>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const steps = [
  { num: 1, label: 'Личные данные' },
  { num: 2, label: 'Адрес' },
  { num: 3, label: 'Оплата' },
  { num: 4, label: 'Подтверждение' }
]

const paymentMethods = [
  { id: 'card', icon: '💳', title: 'Банковская карта', desc: 'Visa, MasterCard, МИР' },
  { id: 'sbp', icon: '⚡', title: 'СБП по QR', desc: 'Без комиссии 0%' },
  { id: 'invoice', icon: '🏢', title: 'Счёт для юрлиц', desc: 'Закрывающие документы' }
]

const currentStep = ref(1)
const submitted = ref(false)
const stepError = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  delivery: 'Цифровая лицензия (мгновенно)',
  payment: 'card',
  cardLast4: '',
  confirm: false
})

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  cardLast4: '',
  confirm: ''
})

const validEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))

function getStepState(num) {
  if (num === currentStep.value) return stepError.value ? 'error' : 'active'
  if (num < currentStep.value) return 'completed'
  return 'disabled'
}

function clearErrors() {
  Object.keys(errors).forEach((k) => {
    errors[k] = ''
  })
  stepError.value = false
}

function validateCurrentStep() {
  clearErrors()
  if (currentStep.value === 1) {
    if (form.fullName.trim().length < 3) errors.fullName = 'Введите ФИО (минимум 3 символа)'
    if (!validEmail.value) errors.email = 'Введите корректный Email'
    if (form.phone.trim().length < 7) errors.phone = 'Введите номер телефона'
  } else if (currentStep.value === 2) {
    if (form.city.trim().length < 2) errors.city = 'Укажите город'
    if (form.street.trim().length < 4) errors.street = 'Укажите улицу и дом'
  } else if (currentStep.value === 3) {
    if (form.payment === 'card' && !/^\d{4}$/.test(form.cardLast4)) {
      errors.cardLast4 = 'Введите 4 цифры карты'
    }
  } else if (currentStep.value === 4) {
    if (!form.confirm) errors.confirm = 'Необходимо подтвердить данные перед отправкой'
  }

  const hasErr = Object.values(errors).some(Boolean)
  stepError.value = hasErr
  return !hasErr
}

function handleNext() {
  if (!validateCurrentStep()) return
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    submitted.value = true
  }
}

function prevStep() {
  clearErrors()
  if (currentStep.value > 1) currentStep.value--
}

function resetWizard() {
  currentStep.value = 1
  submitted.value = false
  clearErrors()
}
</script>
