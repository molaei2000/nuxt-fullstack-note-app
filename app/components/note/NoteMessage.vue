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

    <div v-if="selectedNote" class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
      <p class="text-[#929292] font-playfair">
        {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
      </p>
      <textarea ref="textarea" v-model="updatedNote" name="note" id="note"
        class="text-[#D4D4D4] my-4 font-playfair w-full bg-transparent focus:outline-none resize-none flex-grow" @input="
          () => {
            debouncedFn()
            selectedNote!.text = updatedNote
          }
        " />

    </div>

    <UButton variant="ghost" class=" absolute right-0 bottom-0" @click="logout">
      Logout
    </UButton>
  </div>
  <!-- /note container -->
</template>