<script setup lang="ts">


const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')

const { selectedNote, debouncedFn } = useNote({ textarea })

const updatedNote = useState('updated-note', () => '')

function logout() {
  const jwtCookie = useCookie('NoteNestJWT')
  jwtCookie.value = null
  navigateTo('/login')
}
</script>

<template>
  <!-- note container -->
  <div class="w-full flex flex-col">

    <div v-if="selectedNote" class="mx-4 w-full flex-grow flex flex-col">
      <p class="text-[#929292] font-playfair">
        {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
      </p>
      <ClientOnly>
        <TipTapEditor v-model="updatedNote" @update:model-value="() => {
          debouncedFn()
          selectedNote!.text = updatedNote
        }" />
      </ClientOnly>

    </div>

    <UButton variant="ghost" class=" absolute right-0 bottom-0" @click="logout">
      Logout
    </UButton>
  </div>
  <!-- /note container -->
</template>