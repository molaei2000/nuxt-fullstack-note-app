<script setup lang="ts">
definePageMeta({
  layout: 'note-layout',
  middleware: ['auth']
})

const { createNewNote, deleteNote, selectedNote } = useNote({})
</script>
<template>

  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Notes" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #default>

          <UButton @click="createNewNote">
            <Icon name="tabler-pencil" />
            <span>Create Note</span>
          </UButton>
        </template>
        <template #right>
          <UButton v-if="selectedNote" variant="outline" color="error" icon="tabler-trash" @click="deleteNote" />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <NoteMessage />
    </template>
  </UDashboardPanel>

</template>