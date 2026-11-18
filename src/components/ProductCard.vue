<template>
  <!-- Tasks 1.3 & 4.3: Product Card using @container queries, aspect-square, hover:scale-105 transition -->
  <article
    class="@container group rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/85 dark:hover:border-brand-700"
  >
    <div class="flex flex-col @sm:flex-row gap-4 h-full">
      <!-- Square Image Container (aspect-square) with Glossy Hover Sheen -->
      <div
        class="relative aspect-square w-full @sm:w-36 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br p-5 flex flex-col justify-between text-white"
        :class="product.gradient"
      >
        <div
          class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
          aria-hidden="true"
        ></div>
        <div class="relative z-10 flex items-start justify-between gap-2">
          <span class="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
            {{ product.category }}
          </span>
          <span v-if="product.rating" class="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
            ★ {{ product.rating }}
          </span>
        </div>

        <div class="relative z-10 my-auto flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <svg v-if="product.icon === 'table'" class="h-14 w-14 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
          <svg v-else-if="product.icon === 'chart'" class="h-14 w-14 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M3 3v18h18" />
            <path d="M7 14l4-4 4 3 5-6" />
          </svg>
          <svg v-else-if="product.icon === 'code'" class="h-14 w-14 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <svg v-else-if="product.icon === 'sparkles'" class="h-14 w-14 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
          </svg>
          <svg v-else class="h-14 w-14 opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>

        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Product Details -->
      <div class="flex flex-1 flex-col justify-between gap-3">
        <div class="space-y-1.5">
          <h3 class="text-base font-bold text-slate-900 line-clamp-1 dark:text-slate-100">
            {{ product.title }}
          </h3>
          <p class="text-xs leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">
            {{ product.description }}
          </p>
        </div>

        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span class="text-xs text-slate-400 block">Стоимость</span>
            <span class="inline-flex items-baseline gap-1 text-lg font-extrabold text-slate-900 dark:text-white">
              {{ product.price.toLocaleString('ru-RU') }} <BynSymbol />
            </span>
          </div>
          <button
            type="button"
            @click="handleAdd"
            class="ds-btn ds-btn-sm transition-transform duration-200 hover:scale-105"
            :class="added ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'ds-btn-primary'"
          >
            {{ added ? 'Добавлено ✓' : 'В корзину' }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import BynSymbol from './BynSymbol.vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['addToCart'])
const added = ref(false)

function handleAdd() {
  emit('addToCart', props.product)
  added.value = true
  setTimeout(() => {
    added.value = false
  }, 1200)
}
</script>
