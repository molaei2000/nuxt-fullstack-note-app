<script setup lang="ts">


const { collapsed } = defineProps<{
  collapsed?: boolean
}>()
const { todaysNotes, yesterdaysNotes, earlierNotes, getNotes, } = useNote({})

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
          <NoteCard v-for="note in todaysNotes" :key="note.id" :note="note" />
        </div>
      </div>
      <!-- yesterday main container -->
      <div v-if="yesterdaysNotes.length">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
        <div class="ml-2 space-y-2">
          <NoteCard v-for="note in yesterdaysNotes" :key="note.id" :note="note" />
        </div>
      </div>
      <!-- everything else main container -->
      <div v-if="earlierNotes.length">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Earlier</p>
        <div class="ml-2 space-y-2">
          <NoteCard v-for="note in earlierNotes" :key="note.id" :note="note" />
        </div>
      </div>
    </section>
  </div>
</template>