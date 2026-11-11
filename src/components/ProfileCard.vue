<template>
  <!-- Task 1.1: Profile Card — full width on mobile, fixed 320px (md:w-80) on desktop -->
  <article
    class="w-full md:w-80 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    aria-label="Карточка профиля пользователя"
  >
    <div class="flex flex-col items-center text-center space-y-4">
      <!-- Avatar 80x80px (w-20 h-20) rounded-full -->
      <div class="relative">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 via-purple-500 to-pink-500 text-2xl font-bold text-white shadow-md ring-4 ring-brand-50 dark:ring-slate-800"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
        <span
          class="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
          title="В сети"
        ></span>
      </div>

      <!-- Name & Role -->
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
          {{ name }}
        </h3>
        <p class="text-sm font-medium text-brand-600 dark:text-brand-400">
          {{ role }}
        </p>
      </div>

      <!-- Bio -->
      <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ bio }}
      </p>

      <!-- Mini Stats -->
      <div class="flex w-full justify-center gap-6 border-y border-slate-100 py-3 text-xs dark:border-slate-800">
        <div>
          <span class="block text-base font-bold text-slate-900 dark:text-white">{{ followersCount }}</span>
          <span class="text-slate-500 dark:text-slate-400">Подписчиков</span>
        </div>
        <div>
          <span class="block text-base font-bold text-slate-900 dark:text-white">48</span>
          <span class="text-slate-500 dark:text-slate-400">Отчётов</span>
        </div>
      </div>

      <!-- Action Buttons: Follow & Message -->
      <div class="flex w-full gap-3 pt-1">
        <button
          type="button"
          @click="toggleFollow"
          :aria-pressed="isFollowing"
          class="flex-1 ds-btn ds-btn-md transition-all"
          :class="isFollowing ? 'ds-btn-secondary' : 'ds-btn-primary'"
        >
          {{ isFollowing ? 'Following ✓' : 'Follow' }}
        </button>
        <button
          type="button"
          @click="$emit('message')"
          class="flex-1 ds-btn ds-btn-outline ds-btn-md"
        >
          Message
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  name: { type: String, default: 'Алина Соколова' },
  role: { type: String, default: 'Lead Data Analyst & UI Architect' },
  bio: {
    type: String,
    default: 'Автоматизирую Excel-отчётность, проектирую дашборды на Vue 3 и дизайн-системы на Tailwind CSS.'
  },
  initialFollowers: { type: Number, default: 1284 }
})

defineEmits(['message'])

const isFollowing = ref(false)
const followersCount = computed(() =>
  isFollowing.value ? props.initialFollowers + 1 : props.initialFollowers
)

const initials = computed(() =>
  props.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

function toggleFollow() {
  isFollowing.value = !isFollowing.value
}
</script>
