<script setup lang="ts">
import type { Note } from '@prisma/client';

const { note } = defineProps<{
  note: Note
}>()

const { selectedNote, setNote } = useNote({
});

const description = computed(() => {
  return note.text.replace(/<[^>]+>/g, '').substring(0, 100);
});
</script>

<template>
  <div class="p-2 rounded-lg cursor-pointer" :class="{
    'bg-[#A1842C]': note.id === selectedNote?.id,
    'hover:bg-[#A1842C]/50': note.id !== selectedNote?.id,
  }" @click="setNote(note)">
    <h3 class="text-sm font-bold text-[#F4F4F5] truncate">
      {{ note.title.substring(0, 50) }}
    </h3>
    <div class="leading-none truncate text-[#D6D6D6]">
      <span class="text-xs text-[#F4F4F5] mr-4">{{
        new Date(note.updatedAt).toLocaleDateString()
      }}</span>
      <span class="text-xs text-[#D6D6D6]"> {{ description
      }}</span>
    </div>
  </div>
</template>