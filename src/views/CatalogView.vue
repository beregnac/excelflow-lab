<template>
  <!-- Tasks 1.3 & 4.3: E-commerce Catalog with Filters, @container cards, Bottom Drawer (translate-y-full, backdrop-blur-sm), Skeleton animate-pulse -->
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="ds-badge ds-badge-danger mb-1.5">Задания 1.3 &amp; 4.3 · @container + Bottom Drawer + Skeleton</span>
          <h1 class="ds-h2">Каталог модулей и шаблонов</h1>
          <p class="ds-muted mt-1">Адаптивная сетка с фильтрацией, сортировкой, пагинацией и поддержкой @container.</p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            @click="triggerSkeletonDemo"
            class="ds-btn ds-btn-outline ds-btn-sm"
          >
            ⏳ Показать Skeleton
          </button>

          <button
            type="button"
            @click="mobileFiltersOpen = true"
            class="lg:hidden ds-btn ds-btn-primary ds-btn-sm"
          >
            🎛️ Фильтры
          </button>
        </div>
      </div>

      <!-- Cart Summary Banner -->
      <div
        v-if="cart.totalCount > 0"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-800 dark:bg-brand-950/40"
      >
        <div class="text-sm text-brand-900 dark:text-brand-100">
          🛒 В корзине <strong>{{ cart.totalCount }}</strong> шт. на сумму
          <strong>{{ cart.totalPrice.toLocaleString('ru-RU') }} ₽</strong>
        </div>
        <button type="button" @click="cart.clearCart()" class="ds-btn ds-btn-outline ds-btn-sm">
          Очистить корзину
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <!-- Desktop Filters Sidebar -->
        <aside class="hidden lg:block w-72 shrink-0 ds-card space-y-6 sticky top-24">
          <div class="flex items-center justify-between">
            <h2 class="ds-h3">Фильтры</h2>
            <button type="button" @click="resetFilters" class="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400">
              Сбросить
            </button>
          </div>

          <!-- Category -->
          <div class="space-y-2.5">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Категория</h3>
            <div class="space-y-1.5">
              <label
                v-for="cat in categories"
                :key="cat"
                class="flex cursor-pointer items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm transition hover:bg-slate-50
                       has-[:checked]:border-brand-200 has-[:checked]:bg-brand-50 has-[:checked]:font-semibold has-[:checked]:text-brand-700
                       dark:hover:bg-slate-800 dark:has-[:checked]:border-brand-800 dark:has-[:checked]:bg-brand-950/50 dark:has-[:checked]:text-brand-300"
              >
                <span class="flex items-center gap-2.5">
                  <input v-model="selectedCategory" type="radio" name="desk-cat" :value="cat" class="text-brand-600 focus:ring-brand-500" />
                  {{ cat }}
                </span>
              </label>
            </div>
          </div>

          <!-- Price Slider -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Макс. цена</span>
              <span class="text-slate-800 dark:text-slate-200">{{ maxPrice.toLocaleString('ru-RU') }} ₽</span>
            </div>
            <input
              v-model.number="maxPrice"
              type="range"
              min="1000"
              max="4000"
              step="100"
              aria-label="Максимальная цена"
              class="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          <!-- Tags (has-[:checked]) -->
          <div class="space-y-2.5">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Теги</h3>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="tag in availableTags"
                :key="tag"
                class="cursor-pointer rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition
                       has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600 has-[:checked]:text-white
                       dark:border-slate-700 dark:text-slate-300"
              >
                <input v-model="selectedTags" type="checkbox" :value="tag" class="sr-only" />
                {{ tag }}
              </label>
            </div>
          </div>

          <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
            <AdSlot size="sidebar" width="100%" height="220px" label="Advertisement" />
          </div>
        </aside>

        <!-- Main Catalog Area -->
        <div class="flex-1 w-full min-w-0 space-y-5">
          <!-- Sort & View Mode Bar -->
          <div class="ds-card py-3.5 px-4 flex flex-wrap items-center justify-between gap-3">
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Найдено модулей: <strong>{{ filteredProducts.length }}</strong>
            </p>

            <div class="flex items-center gap-3">
              <label for="catalog-sort" class="text-xs font-medium text-slate-500 dark:text-slate-400">Сортировка:</label>
              <select
                id="catalog-sort"
                v-model="sortBy"
                class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="popular">По рейтингу</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </div>
          </div>

          <!-- Skeleton Loading State (animate-pulse) -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <div
              v-for="n in 4"
              :key="n"
              class="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 animate-pulse dark:border-slate-800 dark:bg-slate-900"
            >
              <div class="aspect-square w-full rounded-xl bg-slate-200 dark:bg-slate-800"></div>
              <div class="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800"></div>
              <div class="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/70"></div>
              <div class="flex justify-between items-center pt-2">
                <div class="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800"></div>
                <div class="h-8 w-24 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
              </div>
            </div>
          </div>

          <!-- Product Grid (1 -> 2 -> 3 -> 4 columns, @container cards) -->
          <div
            v-else-if="paginatedProducts.length"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
              @add-to-cart="cart.addItem($event)"
            />
          </div>

          <!-- Empty Filter State -->
          <div v-else class="ds-card py-14 text-center space-y-3">
            <p class="text-base font-semibold text-slate-700 dark:text-slate-200">Ничего не найдено</p>
            <p class="ds-muted">Попробуйте расширить диапазон цены или сбросить теги.</p>
            <button type="button" @click="resetFilters" class="ds-btn ds-btn-primary ds-btn-sm">
              Сбросить фильтры
            </button>
          </div>

          <!-- AdSlot between catalog grid and pagination -->
          <AdSlot size="banner" label="Рекламное место · Спонсор каталога" />

          <!-- Pagination -->
          <nav
            v-if="totalPages > 1"
            aria-label="Пагинация каталога"
            class="flex items-center justify-center gap-2 pt-2"
          >
            <button
              type="button"
              class="ds-btn ds-btn-outline ds-btn-sm"
              :disabled="page <= 1"
              @click="changePage(page - 1)"
            >
              ←
            </button>
            <button
              v-for="p in totalPages"
              :key="p"
              type="button"
              class="ds-btn ds-btn-sm min-w-[36px]"
              :class="p === page ? 'ds-btn-primary' : 'ds-btn-outline'"
              @click="changePage(p)"
            >
              {{ p }}
            </button>
            <button
              type="button"
              class="ds-btn ds-btn-outline ds-btn-sm"
              :disabled="page >= totalPages"
              @click="changePage(page + 1)"
            >
              →
            </button>
          </nav>
        </div>
      </div>

      <!-- Mobile Bottom Drawer Backdrop (backdrop-blur-sm) -->
      <div
        v-if="mobileFiltersOpen"
        class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        @click="mobileFiltersOpen = false"
      ></div>

      <!-- Mobile Bottom Filters Drawer (translate-y-full -> translate-y-0) -->
      <div
        :class="mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'"
        class="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden dark:border-slate-800 dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильные фильтры каталога"
      >
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="ds-h3">Фильтры каталога</h2>
          <button type="button" @click="mobileFiltersOpen = false" class="ds-btn ds-btn-ghost ds-btn-sm">
            Закрыть
          </button>
        </div>

        <div class="space-y-5 max-h-[60vh] overflow-y-auto scrollbar-thin pb-2">
          <div>
            <p class="ds-label">Категория</p>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="cat in categories"
                :key="cat"
                class="cursor-pointer rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600 has-[:checked]:text-white dark:border-slate-700"
              >
                <input v-model="selectedCategory" type="radio" name="mob-cat" :value="cat" class="sr-only" />
                {{ cat }}
              </label>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1.5">
              <span>Цена до:</span>
              <span>{{ maxPrice.toLocaleString('ru-RU') }} ₽</span>
            </div>
            <input v-model.number="maxPrice" type="range" min="1000" max="4000" step="100" class="w-full accent-brand-600" />
          </div>

          <div>
            <p class="ds-label">Теги</p>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="tag in availableTags"
                :key="tag"
                class="cursor-pointer rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium has-[:checked]:border-brand-500 has-[:checked]:bg-brand-600 has-[:checked]:text-white dark:border-slate-700"
              >
                <input v-model="selectedTags" type="checkbox" :value="tag" class="sr-only" />
                {{ tag }}
              </label>
            </div>
          </div>
        </div>

        <div class="mt-5 flex gap-3">
          <button type="button" @click="resetFilters" class="flex-1 ds-btn ds-btn-secondary ds-btn-md">
            Сбросить
          </button>
          <button type="button" @click="mobileFiltersOpen = false" class="flex-1 ds-btn ds-btn-primary ds-btn-md">
            Применить ({{ filteredProducts.length }})
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '@/stores/cart'
import { CATALOG_PRODUCTS } from '@/data/mockContent'
import DashboardLayout from '@/components/DashboardLayout.vue'
import ProductCard from '@/components/ProductCard.vue'
import AdSlot from '@/components/AdSlot.vue'

const cart = useCartStore()

const categories = ['Все', 'Шаблоны', 'Аналитика', 'Плагины']
const availableTags = ['Новинка', 'Хит', 'Pro', 'Автоматизация', 'Скидка']

const selectedCategory = ref('Все')
const maxPrice = ref(4000)
const selectedTags = ref([])
const sortBy = ref('popular')
const page = ref(1)
const perPage = 4
const isLoading = ref(false)
const mobileFiltersOpen = ref(false)

const filteredProducts = computed(() => {
  const list = CATALOG_PRODUCTS.filter((p) => {
    const catOk = selectedCategory.value === 'Все' || p.category === selectedCategory.value
    const priceOk = p.price <= maxPrice.value
    const tagsOk =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => p.tags.includes(tag))
    return catOk && priceOk && tagsOk
  })

  if (sortBy.value === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
  return [...list].sort((a, b) => b.rating - a.rating)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage) || 1)
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})

watch([selectedCategory, maxPrice, selectedTags, sortBy], () => {
  page.value = 1
})

function resetFilters() {
  selectedCategory.value = 'Все'
  maxPrice.value = 4000
  selectedTags.value = []
}

function triggerSkeletonDemo() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 900)
}

function changePage(nextPage) {
  page.value = nextPage
  triggerSkeletonDemo()
}
</script>
