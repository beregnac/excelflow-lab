<template>
  <button
    type="button"
    class="ds-btn ds-btn-outline ds-btn-sm"
    @click="$emit('loadMore')"
    :disabled="loading"
  >
    <span
      v-if="loading"
      class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"
      aria-hidden="true"
    ></span>
    {{ loading ? 'Загрузка...' : 'Загрузить ещё' }}
  </button>
</template>

<script setup>
defineProps({ loading: Boolean })
defineEmits(['loadMore'])
</script>
