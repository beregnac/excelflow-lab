<template>
  <!-- Task 3.3 & 3.4: Comprehensive Landing Page with Dark Mode & @apply classes -->
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <!-- Task 1.2: Sticky Backdrop-blur Navbar -->
    <AppNavbar />

    <main class="flex-1">
      <!-- Task 2.1: Gradient Hero Section -->
      <HeroSection />

      <!-- #about: Original Excel Uploader Lab Integration -->
      <section id="about" class="ds-section bg-white dark:bg-slate-900" aria-labelledby="upload-heading">
        <div class="ds-container">
          <div id="excel-upload" class="mx-auto max-w-3xl text-center space-y-3 mb-10">
            <span class="ds-badge ds-badge-success">Интеграция с исходной лабой</span>
            <h2 id="upload-heading" class="ds-h2">Загрузка и обработка Excel-файлов</h2>
            <p class="ds-body">
              Загрузите реальный файл <code class="rounded bg-slate-100 px-1.5 py-0.5 text-brand-600 dark:bg-slate-800 dark:text-brand-400">.xlsx</code> / <code class="rounded bg-slate-100 px-1.5 py-0.5 text-brand-600 dark:bg-slate-800 dark:text-brand-400">.xls</code> для анализа в таблице и дашборде, либо используйте тестовый набор данных.
            </p>
          </div>

          <ExcelUploader
            @parse="handleParsed"
            @error="showError"
          />

          <div class="mt-4 text-center">
            <button
              type="button"
              @click="loadSample"
              :disabled="dataStore.loading"
              class="ds-btn ds-btn-ghost ds-btn-sm text-brand-600 dark:text-brand-400"
            >
              ⚡ Загрузить демонстрационный табель ({{ dataStore.totalItems }} записей сейчас в базе)
            </button>
          </div>

          <div
            v-if="uploadSuccessCount !== null"
            class="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
          >
            <strong>Успешно!</strong> Загружено {{ uploadSuccessCount }} записей.
            <router-link to="/data" class="ml-2 font-semibold underline hover:text-emerald-700 dark:hover:text-emerald-100">
              Перейти к таблице данных →
            </router-link>
          </div>
        </div>
      </section>

      <!-- #services: Task 3.3 Features (3 Columns with Icons) -->
      <section id="services" class="ds-section bg-slate-50 dark:bg-slate-950" aria-labelledby="features-heading">
        <div class="ds-container">
          <div class="mx-auto max-w-2xl text-center space-y-3 mb-12">
            <span class="ds-badge ds-badge-brand">Возможности платформы</span>
            <h2 id="features-heading" class="ds-h2">Всё необходимое для работы с данными</h2>
            <p class="ds-body">Единая архитектура на Vue 3, Pinia и Tailwind CSS v3.4+ с полной адаптивностью от 320px до 4K.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="ds-card group hover:-translate-y-1 hover:border-brand-300 dark:hover:border-brand-700">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-transform duration-300 group-hover:scale-110 dark:bg-brand-950 dark:text-brand-400">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <h3 class="ds-h3 mb-2">Умные Excel-таблицы</h3>
              <p class="ds-body">Фиксированные столбцы индекса и действий, пагинация, добавление и редактирование строк в модальных окнах.</p>
            </article>

            <article class="ds-card group hover:-translate-y-1 hover:border-purple-300 dark:hover:border-purple-700">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-950 dark:text-purple-400">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 20V10M18 20V4M6 20v-4" />
                </svg>
              </div>
              <h3 class="ds-h3 mb-2">Аналитика и Kanban</h3>
              <p class="ds-body">Интерактивный дашборд с 12-колоночной сеткой, тепловым графиком, канбан-доской и встроенным чатом команды.</p>
            </article>

            <article class="ds-card group hover:-translate-y-1 hover:border-pink-300 dark:hover:border-pink-700">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600 transition-transform duration-300 group-hover:scale-110 dark:bg-pink-950 dark:text-pink-400">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3 class="ds-h3 mb-2">Дизайн-система v3.4+</h3>
              <p class="ds-body">Селекторы <code class="text-xs">has-[:checked]</code>, <code class="text-xs">@container</code>-запросы, кастомные плагины и темная тема без резких скачков.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Task 1.3: 6 Product Cards Grid (1 -> 2 -> 3 -> 4 columns) -->
      <section id="products-grid" class="ds-section bg-white dark:bg-slate-900" aria-labelledby="products-heading">
        <div class="ds-container">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div class="space-y-2">
              <span class="ds-badge ds-badge-warning">Задание 1.3 · Сетка 1→2→3→4</span>
              <h2 id="products-heading" class="ds-h2">Популярные модули и шаблоны</h2>
              <p class="ds-body">6 карточек с <code class="text-xs">aspect-square</code> и адаптивной сеткой <code class="text-xs">grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4</code>.</p>
            </div>
            <router-link to="/catalog" class="ds-btn ds-btn-outline ds-btn-md shrink-0">
              Полный каталог с фильтрами 4.3 →
            </router-link>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="cart.addItem($event)"
            />
          </div>

          <!-- AdSlot Banner Integration -->
          <div class="mt-10">
            <AdSlot size="banner" label="Рекламное место · Партнёрский блок" />
          </div>
        </div>
      </section>

      <!-- Task 3.3: Testimonials Carousel (Pure CSS scroll-snap without JS) -->
      <section class="ds-section bg-slate-50 dark:bg-slate-950" aria-labelledby="testimonials-heading">
        <div class="ds-container">
          <div class="mx-auto max-w-2xl text-center space-y-2 mb-10">
            <span class="ds-badge ds-badge-brand">Отзывы · CSS Snap-карусель</span>
            <h2 id="testimonials-heading" class="ds-h2">Команды уже ускорили работу с Excel</h2>
            <p class="ds-muted">Листайте карточки горизонтально — карусель работает без JavaScript через <code class="text-xs">snap-x snap-mandatory</code>.</p>
          </div>

          <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin">
            <article
              v-for="item in testimonials"
              :key="item.author"
              class="snap-center shrink-0 w-[85%] sm:w-[46%] lg:w-[32%] ds-card flex flex-col justify-between gap-4"
            >
              <div class="space-y-3">
                <div class="flex items-center gap-1 text-amber-400 text-sm" aria-label="Оценка 5 из 5">
                  ★★★★★
                </div>
                <p class="ds-body">«{{ item.quote }}»</p>
              </div>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 text-xs font-bold text-white">
                  {{ item.initials }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ item.author }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.role }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Task 2.2: Pricing Table -->
      <PricingSection />

      <!-- Task 3.3: FAQ Accordion via <details> + group-open:* -->
      <section class="ds-section bg-white dark:bg-slate-900" aria-labelledby="faq-heading">
        <div class="ds-container max-w-3xl">
          <div class="text-center space-y-2 mb-10">
            <span class="ds-badge ds-badge-brand">FAQ · HTML &lt;details&gt;</span>
            <h2 id="faq-heading" class="ds-h2">Частые вопросы</h2>
          </div>

          <div class="space-y-3">
            <details
              v-for="faq in faqs"
              :key="faq.q"
              class="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-colors open:bg-white open:shadow-sm dark:border-slate-800 dark:bg-slate-950/60 dark:open:bg-slate-900"
            >
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
                <span>{{ faq.q }}</span>
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-slate-600 transition-transform duration-300 group-open:rotate-180 group-open:bg-brand-100 group-open:text-brand-600 dark:bg-slate-800 dark:text-slate-300 dark:group-open:bg-brand-950 dark:group-open:text-brand-400">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ faq.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- #contact: Task 1.1 Profile Card + Quick Contact CTA -->
      <section id="contact" class="ds-section bg-slate-50 dark:bg-slate-950" aria-labelledby="contact-heading">
        <div class="ds-container">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div class="max-w-xl space-y-4">
              <span class="ds-badge ds-badge-brand">Задание 1.1 · Карточка профиля</span>
              <h2 id="contact-heading" class="ds-h2">Готовы автоматизировать ваши таблицы?</h2>
              <p class="ds-body">
                Свяжитесь с руководителем разработки или откройте карту всех 16 модулей лабораторной работы, чтобы проверить каждый уровень Tailwind CSS.
              </p>
              <div class="flex flex-wrap gap-3 pt-2">
                <router-link to="/levels" class="ds-btn ds-btn-primary ds-btn-md">
                  Карта всех 16 заданий
                </router-link>
                <router-link to="/wizard" class="ds-btn ds-btn-outline ds-btn-md">
                  Многошаговая заявка 4.2
                </router-link>
              </div>
            </div>

            <!-- Task 1.1 ProfileCard -->
            <ProfileCard @message="$router.push('/messenger')" />
          </div>
        </div>
      </section>
    </main>

    <!-- Task 3.3: 4-Column Footer -->
    <footer class="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div class="ds-container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 text-white text-xs font-extrabold">
                EF
              </span>
              ExcelFlow
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Лабораторный проект на базе Vue 3, Pinia, SheetJS и Tailwind CSS v3.4+.
            </p>
          </div>

          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Платформа</h3>
            <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><router-link to="/dashboard" class="hover:text-brand-600 dark:hover:text-brand-400">Дашборд аналитики 4.1</router-link></li>
              <li><router-link to="/data" class="hover:text-brand-600 dark:hover:text-brand-400">Управление Excel</router-link></li>
              <li><router-link to="/catalog" class="hover:text-brand-600 dark:hover:text-brand-400">Каталог модулей 4.3</router-link></li>
              <li><router-link to="/admin" class="hover:text-brand-600 dark:hover:text-brand-400">Админ-панель</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Инструменты</h3>
            <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><router-link to="/messenger" class="hover:text-brand-600 dark:hover:text-brand-400">Мессенджер 3.1</router-link></li>
              <li><router-link to="/kanban" class="hover:text-brand-600 dark:hover:text-brand-400">Kanban-доска 3.2</router-link></li>
              <li><router-link to="/wizard" class="hover:text-brand-600 dark:hover:text-brand-400">Многошаговая форма 4.2</router-link></li>
              <li><router-link to="/design-system" class="hover:text-brand-600 dark:hover:text-brand-400">Дизайн-система 4.4</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Аккаунт</h3>
            <ul class="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><router-link to="/login" class="hover:text-brand-600 dark:hover:text-brand-400">Вход</router-link></li>
              <li><router-link to="/register" class="hover:text-brand-600 dark:hover:text-brand-400">Регистрация 2.4</router-link></li>
              <li><router-link to="/recover" class="hover:text-brand-600 dark:hover:text-brand-400">Восстановление пароля</router-link></li>
              <li><router-link to="/levels" class="hover:text-brand-600 dark:hover:text-brand-400">Карта уровней 1–4</router-link></li>
              <li><router-link to="/hosting-report" class="hover:text-brand-600 dark:hover:text-brand-400">Хостинг и AdSlot отчёт</router-link></li>
            </ul>
          </div>
        </div>

        <div class="mt-10 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:border-slate-800">
          <p>© 2026 ExcelFlow Lab. Все компоненты адаптированы от 320px до 4K.</p>
          <p>Vue 3 + Tailwind CSS v3.4 + @tailwindcss/container-queries</p>
        </div>
      </div>
    </footer>

    <ErrorModal
      :visible="showErrorModal"
      :message="errorModal.message"
      :details="errorModal.details"
      @close="showErrorModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/data'
import { useCartStore } from '@/stores/cart'
import { CATALOG_PRODUCTS } from '@/data/mockContent'
import AppNavbar from '@/components/AppNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ExcelUploader from '@/components/ExcelUploader.vue'
import ProductCard from '@/components/ProductCard.vue'
import PricingSection from '@/components/PricingSection.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import AdSlot from '@/components/AdSlot.vue'
import ErrorModal from '@/components/ErrorModal.vue'

const dataStore = useDataStore()
const cart = useCartStore()

const featuredProducts = CATALOG_PRODUCTS.slice(0, 6)
const uploadSuccessCount = ref(null)
const showErrorModal = ref(false)
const errorModal = ref({ message: '', details: '' })

const testimonials = [
  {
    quote: 'Перенесли табели из десятков Excel-файлов в ExcelFlow. Адаптивная таблица и дашборд сэкономили команде 6 часов в неделю.',
    author: 'Дмитрий Волков',
    role: 'Операционный директор, FinTech Lab',
    initials: 'ДВ'
  },
  {
    quote: 'Тёмная тема, быстрая загрузка XLSX прямо в браузере и удобный Kanban для согласования отчётов — всё работает молниеносно.',
    author: 'Мария Крылова',
    role: 'Руководитель аналитики, RetailGrid',
    initials: 'МК'
  },
  {
    quote: 'Дизайн-система на Tailwind CSS v3.4 с @container и has-[:checked] сделала интерфейс одинаково аккуратным на телефоне и 4K-мониторе.',
    author: 'Игорь Белов',
    role: 'Lead Frontend Developer',
    initials: 'ИБ'
  },
  {
    quote: 'Многошаговая форма подключения и мессенджер прямо внутри рабочей области избавили нас от переписки в сторонних чатах.',
    author: 'Елена Морозова',
    role: 'Product Manager, CloudSheet',
    initials: 'ЕМ'
  }
]

const faqs = [
  {
    q: 'Какие форматы Excel поддерживаются?',
    a: 'Поддерживаются файлы Microsoft Excel .xlsx и .xls. Разбор данных выполняется локально в браузере через библиотеку SheetJS (xlsx) с сохранением в localStorage.'
  },
  {
    q: 'Как работает тёмная тема (Dark Mode)?',
    a: 'В конфигурации Tailwind используется darkMode: "class". Переключатель в шапке и сайдбаре добавляет класс dark к корневому элементу <html> и запоминает выбор в localStorage.'
  },
  {
    q: 'Где находятся все 16 заданий лабораторной работы?',
    a: 'Все задания органично встроены в страницы приложения (Лендинг, Дашборд, Каталог, Мессенджер, Kanban, Мастер-форма, Дизайн-система, Регистрация). Полный список со ссылками доступен на странице «Уровни 1–4».'
  },
  {
    q: 'Адаптивен ли интерфейс на узких экранах (320px)?',
    a: 'Да, вёрстка построена по принципу mobile-first: навигация сворачивается в бургер-меню без JS, сайдбар выезжает поверх экрана, а широкая Excel-таблица имеет горизонтальный скролл и липкие кнопки действий.'
  }
]

function handleParsed(rows) {
  uploadSuccessCount.value = rows.length
}

async function loadSample() {
  const rows = await dataStore.loadSampleData()
  uploadSuccessCount.value = rows.length
}

function showError({ message, details }) {
  errorModal.value = { message, details }
  showErrorModal.value = true
}
</script>
