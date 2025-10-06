<template>
  <UFooter class="bg-elevated/30">
    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <UNavigationMenu :items="[
      {
        label: 'Source Code',
        icon: 'lucide-code',
        to: 'https://github.com/molaei2000/nuxt-fullstack-note-app',
        target: '_blank'
      },]" variant="link" />

    <template #right>

      <UButton icon="i-simple-icons-linkedin" color="neutral" variant="ghost"
        to="https://www.linkedin.com/in/mohammad-mahdi-molaei/" target="_blank" aria-label="LinkedIn" />
      <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/molaei2000"
        target="_blank" aria-label="GitHub" />
    </template>
  </UFooter>
</template>