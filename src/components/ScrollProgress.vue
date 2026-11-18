<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    aria-hidden="true"
  >
    <div
      class="h-full origin-left bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-transform duration-100 ease-out"
      :style="{ transform: `scaleX(${progress})` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const progress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>
