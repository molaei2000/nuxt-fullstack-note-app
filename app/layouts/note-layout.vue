<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = ref(false)

const links = [[
  {
    label: 'Github',
    icon: 'lucide-github',
    to: 'https://github.com/molaei2000',
    target: '_blank'
  }, {
    label: 'LinkedIn',
    icon: 'lucide-linkedin',
    to: 'https://www.linkedin.com/in/mohammad-mahdi-molaei/',
    target: '_blank'
  },
  {
    label: 'Source Code',
    icon: 'lucide-code',
    to: 'https://github.com/molaei2000/nuxt-fullstack-note-app',
    target: '_blank'
  },
  {
    label: 'Logout',
    icon: 'lucide-log-out',
    class: 'bg-red-500 text-white rounded-md',
    onSelect: () => {
      const jwtCookie = useCookie('NoteNestJWT')
      jwtCookie.value = null
      navigateTo('/login')
    }
  },
]] satisfies NavigationMenuItem[][]


</script>

<template>
  <UDashboardGroup unit="px">
    <UDashboardSidebar id="default" :min-size="330" :max-size="430" v-model:open="open" collapsible resizable
      class="bg-black" :ui="{ footer: 'lg:border-t lg:border-default' }">
      <template #header="{ collapsed }">
        <AppLogo :collapsed="collapsed" />
      </template>

      <template #default="{ collapsed }">

        <NoteList :collapsed="collapsed" />

        <UNavigationMenu :collapsed="collapsed" :items="links[0]" orientation="vertical" tooltip class="mt-auto" />
      </template>
    </UDashboardSidebar>

    <slot />

  </UDashboardGroup>
</template>