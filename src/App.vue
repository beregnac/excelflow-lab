<template>
  <AnimatedBackground />
  <div class="relative z-10 min-h-screen">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AnimatedBackground from '@/components/AnimatedBackground.vue'

const theme = useThemeStore()

onMounted(() => {
  theme.initTheme()
})
</script>
