<script setup lang="ts">
import type { Note } from '@prisma/client'

const selectedNote = ref<Note>({ id: 0 } as Note)
const { data: notes } = useAsyncData('notes', () => {
  return $fetch<Note[]>('/api/notes')
})

const todaysNotes = computed(() => {
  if (!notes.value) return []
  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt)
    return noteDate.toDateString() === new Date().toDateString()
  })
})

const yesterdaysNotes = computed(() => {
  if (!notes.value) return []

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt)
    return noteDate.toDateString() === yesterday.toDateString()
  })
})

const earlierNotes = computed(() => {
  if (!notes.value) return []

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return notes.value.filter((note) => {
    const noteDate = new Date(note.updatedAt)
    return (
      noteDate < yesterday &&
      noteDate.toDateString() !== yesterday.toDateString()
    )
  })
})




</script>

<template>
  <div class="flex flex-col gap-4 px-4 overflow-scroll">
    <section>
      <!-- today main container -->
      <div class="flex-grow">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in todaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{
            'bg-[#A1842C]': note.id === selectedNote.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
          }">
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">{{
                new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100)
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- yesterday main container -->
      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in yesterdaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{
            'bg-[#A1842C]': note.id === selectedNote.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
          }">
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">{{
                new Date(note.updatedAt).toDateString() ===
                  new Date().toDateString()
                  ? 'Today'
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100)
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- everything else main container -->
      <div>
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Earlier</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in earlierNotes" class="p-2 rounded-lg cursor-pointer" :class="{
            'bg-[#A1842C]': note.id === selectedNote.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id,
          }">
            <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
              {{ note.text.substring(0, 50) }}
            </h3>
            <div class="leading-none truncate text-[#D6D6D6]">
              <span class="text-xs text-[#F4F4F5] mr-4">{{
                new Date(note.updatedAt).toDateString() ===
                  new Date().toDateString()
                  ? 'Today'
                  : new Date(note.updatedAt).toLocaleDateString()
              }}</span>
              <span v-if="note.text.length > 50" class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>