<script setup lang="ts">

const { collapsed } = defineProps<{
  collapsed?: boolean
}>()

</script>

<template>
  <nuxt-link to="/">
    <h1 class="flex items-center gap-2 text-lg">
      <Icon name="carbon:apple" size="1.5rem" /> <span class="text-primary font-bold">{{ collapsed ? '' : 'Note'
        }}</span>
    </h1>
  </nuxt-link>
</template>