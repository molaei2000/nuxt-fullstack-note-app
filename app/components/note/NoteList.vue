<script setup lang="ts">


const { collapsed } = defineProps<{
  collapsed?: boolean
}>()
const { selectedNote, todaysNotes, yesterdaysNotes, earlierNotes, getNotes, setNote } = useNote({})

onMounted(async () => {
  await getNotes();
});

</script>

<template>
  <div class="flex flex-col gap-4 overflow-y-auto overflow-x-hidden" :class="{
    'px-4': !collapsed,
    'px-0': collapsed,
  }">
    <section>
      <!-- today main container -->
      <div v-if="todaysNotes.length" class="flex-grow">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in todaysNotes" class="p-2 rounded-lg cursor-pointer" :key="note.id" :class="{
            'bg-[#A1842C]': note.id === selectedNote?.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote?.id,
          }" @click="setNote(note)">
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
      <div v-if="yesterdaysNotes.length">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in yesterdaysNotes" :key="note.id" class="p-2 rounded-lg cursor-pointer" :class="{
            'bg-[#A1842C]': note.id === selectedNote?.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote?.id,
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
      <div v-if="earlierNotes.length">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Earlier</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in earlierNotes" :key="note.id" class="p-2 rounded-lg cursor-pointer" :class="{
            'bg-[#A1842C]': note.id === selectedNote?.id,
            'hover:bg-[#A1842C]/50': note.id !== selectedNote?.id,
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