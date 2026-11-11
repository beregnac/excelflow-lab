<template>
  <!-- Tasks 4.4 & 1.1: Storybook-like Design System Documentation + ProfileCard Showcase -->
  <DashboardLayout>
    <div class="space-y-10 max-w-6xl">
      <!-- Header -->
      <div class="border-b border-slate-200 pb-6 dark:border-slate-800">
        <span class="ds-badge ds-badge-danger mb-2">Задание 4.4 · @layer components &amp; Custom Plugin</span>
        <h1 class="ds-h1">Дизайн-система ExcelFlow</h1>
        <p class="ds-body mt-2 max-w-2xl">
          Токены <code class="text-xs">brand</code> и <code class="text-xs">semantic</code> из <code class="text-xs">tailwind.config.js</code>, компоненты на <code class="text-xs">@apply</code>, кастомные утилиты плагина и интерактивные состояния.
        </p>
      </div>

      <!-- 1. Colors -->
      <section class="space-y-4" aria-labelledby="ds-colors">
        <h2 id="ds-colors" class="ds-h2">1. Цветовая палитра (Brand &amp; Semantic)</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="swatch in colorSwatches"
            :key="swatch.name"
            class="ds-card p-3 space-y-2.5"
          >
            <div class="h-16 w-full rounded-xl shadow-inner" :class="swatch.bg"></div>
            <div>
              <p class="text-xs font-bold text-slate-900 dark:text-white">{{ swatch.name }}</p>
              <p class="text-[11px] font-mono text-slate-400">{{ swatch.token }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Typography -->
      <section class="ds-card space-y-5" aria-labelledby="ds-type">
        <h2 id="ds-type" class="ds-h3 border-b border-slate-100 pb-3 dark:border-slate-800">
          2. Типографика (<code class="text-xs">@apply</code> компоненты)
        </h2>
        <div class="space-y-4">
          <div>
            <span class="text-[11px] font-mono text-slate-400">.ds-h1</span>
            <p class="ds-h1">Заголовок уровня H1</p>
          </div>
          <div>
            <span class="text-[11px] font-mono text-slate-400">.ds-h2</span>
            <p class="ds-h2">Заголовок раздела H2</p>
          </div>
          <div>
            <span class="text-[11px] font-mono text-slate-400">.ds-body</span>
            <p class="ds-body">Основной текст интерфейса с комфортным межстрочным интервалом и поддержкой светлой и тёмной темы.</p>
          </div>
        </div>
      </section>

      <!-- 3. Buttons Matrix (primary/secondary/ghost/danger × sm/md/lg) -->
      <section class="ds-card space-y-5" aria-labelledby="ds-buttons">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <h2 id="ds-buttons" class="ds-h3">3. Кнопки (4 варианта × 3 размера)</h2>
          <label class="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input v-model="buttonsDisabled" type="checkbox" class="ds-checkbox" />
            <span>Disabled состояние</span>
          </label>
        </div>

        <div class="space-y-4 overflow-x-auto scrollbar-thin">
          <div
            v-for="variant in buttonVariants"
            :key="variant.name"
            class="flex flex-wrap items-center gap-3"
          >
            <span class="w-24 text-xs font-mono text-slate-400 shrink-0">{{ variant.name }}</span>
            <button type="button" :disabled="buttonsDisabled" :class="['ds-btn ds-btn-sm', variant.cls]">
              Small (sm)
            </button>
            <button type="button" :disabled="buttonsDisabled" :class="['ds-btn ds-btn-md', variant.cls]">
              Medium (md)
            </button>
            <button type="button" :disabled="buttonsDisabled" :class="['ds-btn ds-btn-lg', variant.cls]">
              Large (lg)
            </button>
          </div>
        </div>
      </section>

      <!-- 4. Inputs, Checkboxes & Toggle Switch -->
      <section class="ds-card space-y-5" aria-labelledby="ds-controls">
        <h2 id="ds-controls" class="ds-h3 border-b border-slate-100 pb-3 dark:border-slate-800">
          4. Формы, чекбоксы и Toggle
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label for="ds-input-1" class="ds-label">Стандартный Input</label>
              <input id="ds-input-1" type="text" placeholder="Введите значение..." class="ds-input" />
            </div>
            <div>
              <label for="ds-input-2" class="ds-label">Disabled Input</label>
              <input id="ds-input-2" type="text" value="Только для чтения" disabled class="ds-input" />
            </div>
          </div>

          <div class="space-y-5 flex flex-col justify-center">
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="sampleCheckbox" type="checkbox" class="ds-checkbox" />
              <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                Кастомный чекбокс ({{ sampleCheckbox ? 'Вкл' : 'Выкл' }})
              </span>
            </label>

            <!-- Toggle Switch via peer -->
            <label class="inline-flex items-center gap-3 cursor-pointer">
              <input v-model="sampleToggle" type="checkbox" class="peer sr-only" />
              <span class="relative h-6 w-11 rounded-full bg-slate-300 transition-colors peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 dark:bg-slate-700">
                <span
                  class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                  :class="sampleToggle ? 'translate-x-5' : 'translate-x-0'"
                ></span>
              </span>
              <span class="text-sm font-medium text-slate-700 dark:text-slate-200">
                Toggle-переключатель ({{ sampleToggle ? 'Активен' : 'Выключен' }})
              </span>
            </label>
          </div>
        </div>
      </section>

      <!-- 5. Badges, Alerts & Modal Preview -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="ds-card space-y-4">
          <h2 class="ds-h3">5. Badges и Alerts</h2>
          <div class="flex flex-wrap gap-2">
            <span class="ds-badge ds-badge-brand">Brand</span>
            <span class="ds-badge ds-badge-success">Success</span>
            <span class="ds-badge ds-badge-warning">Warning</span>
            <span class="ds-badge ds-badge-danger">Danger</span>
          </div>
          <div class="space-y-3 pt-2">
            <div class="ds-alert border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
              <span>✓</span>
              <span>Файл Excel успешно импортирован и сохранён.</span>
            </div>
            <div class="ds-alert border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              <span>!</span>
              <span>В таблице обнаружены строки с разным числом колонок.</span>
            </div>
          </div>
        </div>

        <div class="ds-card flex flex-col justify-between gap-4">
          <div class="space-y-2">
            <h2 class="ds-h3">6. Модальное окно и Plugin-утилиты</h2>
            <p class="ds-body">
              Демонстрация доступного модального окна и кастомного плагина (<code class="text-xs">.scrollbar-thin</code>, <code class="text-xs">.glass-panel</code>, <code class="text-xs">.text-balance</code>).
            </p>
          </div>
          <div class="rounded-xl border border-slate-200 p-4 glass-panel dark:bg-slate-800/60 dark:border-slate-700">
            <p class="text-xs font-mono text-slate-600 dark:text-slate-300">
              .glass-panel · backdrop-filter: blur(12px)
            </p>
          </div>
          <button type="button" @click="modalOpen = true" class="ds-btn ds-btn-primary ds-btn-md self-start">
            Открыть Modal Demo
          </button>
        </div>
      </section>

      <!-- 7. Task 1.1 Profile Card Showcase -->
      <section id="profile-card" class="ds-card space-y-5" aria-labelledby="ds-profile">
        <div>
          <span class="ds-badge ds-badge-success mb-1.5">Задание 1.1 · Карточка профиля</span>
          <h2 id="ds-profile" class="ds-h3">Компонент ProfileCard (w-full на мобильных, md:w-80 = 320px на десктопе)</h2>
        </div>

        <div class="flex flex-col md:flex-row items-center gap-8 rounded-2xl bg-slate-100/80 p-6 dark:bg-slate-950/60">
          <ProfileCard @message="$router.push('/messenger')" />
          <div class="space-y-3 text-sm text-slate-600 dark:text-slate-300 max-w-md">
            <p><strong>Реализованные требования 1.1:</strong></p>
            <ul class="list-disc pl-5 space-y-1">
              <li>Аватар 80×80px (<code class="text-xs">h-20 w-20 rounded-full</code>)</li>
              <li>Имя, должность и краткое описание (bio)</li>
              <li>Интерактивная кнопка <strong>Follow</strong> и переход <strong>Message</strong> в мессенджер</li>
              <li>Ширина <code class="text-xs">w-full md:w-80</code> (320px на десктопе)</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 8. AdSlot Component Showcase -->
      <section class="ds-card space-y-5" aria-labelledby="ds-adslot">
        <div>
          <span class="ds-badge ds-badge-brand mb-1.5">Задание 1 · AdSlot.vue</span>
          <h2 id="ds-adslot" class="ds-h3">Пресеты рекламного плейсхолдера</h2>
          <p class="ds-muted mt-1">Настраивается через <code class="text-xs">size</code> (<code class="text-xs">banner</code>, <code class="text-xs">sidebar</code>, <code class="text-xs">square</code>) или произвольные <code class="text-xs">width</code> / <code class="text-xs">height</code>.</p>
        </div>
        <div class="space-y-6">
          <AdSlot size="banner" label="Рекламное место · Banner" />
          <div class="flex flex-wrap items-start justify-center gap-6">
            <AdSlot size="sidebar" label="Advertisement · Sidebar" />
            <AdSlot size="square" label="Рекламное место · Square" />
          </div>
        </div>
      </section>
    </div>

    <!-- Demo Modal -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ds-modal-title"
    >
      <div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" @click="modalOpen = false"></div>
      <div class="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4 dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <h3 id="ds-modal-title" class="ds-h3">Компонент Modal</h3>
          <button type="button" @click="modalOpen = false" class="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <p class="ds-body">
          Модальное окно дизайн-системы с <code class="text-xs">role="dialog"</code>, <code class="text-xs">aria-modal="true"</code> и плавным размытием фона.
        </p>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" @click="modalOpen = false" class="ds-btn ds-btn-secondary ds-btn-sm">Отмена</button>
          <button type="button" @click="modalOpen = false" class="ds-btn ds-btn-primary ds-btn-sm">Понятно</button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import AdSlot from '@/components/AdSlot.vue'

const buttonsDisabled = ref(false)
const sampleCheckbox = ref(true)
const sampleToggle = ref(true)
const modalOpen = ref(false)

const colorSwatches = [
  { name: 'Brand 500', token: 'bg-brand-500', bg: 'bg-brand-500' },
  { name: 'Brand 600', token: 'bg-brand-600', bg: 'bg-brand-600' },
  { name: 'Success', token: 'semantic-success', bg: 'bg-semantic-success-500' },
  { name: 'Warning', token: 'semantic-warning', bg: 'bg-semantic-warning-500' },
  { name: 'Danger', token: 'semantic-danger', bg: 'bg-semantic-danger-500' },
  { name: 'Info', token: 'semantic-info', bg: 'bg-semantic-info-500' }
]

const buttonVariants = [
  { name: 'Primary', cls: 'ds-btn-primary' },
  { name: 'Secondary', cls: 'ds-btn-secondary' },
  { name: 'Ghost', cls: 'ds-btn-ghost' },
  { name: 'Danger', cls: 'ds-btn-danger' }
]
</script>
