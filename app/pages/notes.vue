<script setup lang="ts">
definePageMeta({
  layout: 'note-layout',
  middleware: ['auth']
})
</script>
<template>

  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Notes" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>


      </UDashboardNavbar>


    </template>

    <template #body>
      <p>test</p>
    </template>
  </UDashboardPanel>

</template>