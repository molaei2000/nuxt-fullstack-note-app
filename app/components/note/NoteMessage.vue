<script setup lang="ts">


const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')

const { selectedNote, debouncedFn } = useNote({ textarea })

const updatedNote = useState('updated-note', () => '')

</script>

<template>
  <!-- note container -->
  <div class="w-full flex flex-col">

    <div v-if="selectedNote">
      <UCard class="mb-4">
        <div class="flex w-full justify-between">
          <UFormField label="Title">
            <UInput v-model="selectedNote.title" placeholder="Note Title" @input="debouncedFn" />
          </UFormField>

          <p class="text-[#929292] font-playfair">
            {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
          </p>
        </div>
      </UCard>

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