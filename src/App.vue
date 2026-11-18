<template>
  <ScrollProgress />
  <AnimatedBackground />
  <div class="relative z-10 min-h-screen">
    <router-view v-slot="{ Component }">
      <Transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'

const theme = useThemeStore()

onMounted(() => {
  theme.initTheme()
})
</script>
