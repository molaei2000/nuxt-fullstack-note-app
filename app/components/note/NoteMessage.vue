<script setup lang="ts">


const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')

const { selectedNote, debouncedFn } = useNote({ textarea })

const updatedNote = useState('updated-note', () => '')

</script>

<template>
  <!-- note container -->
  <div class="w-full flex flex-col">

    <div v-if="selectedNote">
      <p class="text-[#929292] font-playfair">
        {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
      </p>
      <ClientOnly>
        <RobustTipTapEditor v-model="updatedNote" @update:model-value="() => {
          debouncedFn()
          selectedNote!.text = updatedNote
        }" />
      </ClientOnly>

    </div>

  </div>
  <!-- /note container -->
</template>