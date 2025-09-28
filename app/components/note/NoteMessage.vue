<script setup lang="ts">


const textarea = useTemplateRef<HTMLTextAreaElement>('textarea')

const { selectedNote, setNote, createNewNote, deleteNote, updatedNote } = useNote({ textarea })

function logout() {
  const jwtCookie = useCookie('NoteNestJWT')
  jwtCookie.value = null
  navigateTo('/login')
}
</script>

<template>
  <!-- note container -->
  <div class="w-full flex flex-col">
    <div class="flex justify-between w-full items-start p-8">
      <button class="inline-flex items-center text-xs text-[#C2C2C5] hover:text-white font-bold space-x-2"
        @click="createNewNote">
        <PencilIcon />
        <span>Create Note</span>
      </button>

      <button>
        <TrashIcon class="text-[#6D6D73] hover:text-white" @click="deleteNote" />
      </button>
    </div>

    <div v-if="selectedNote" class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
      <p class="text-[#929292] font-playfair">
        {{ new Date(selectedNote.updatedAt).toLocaleDateString() }}
      </p>
      <textarea ref="textarea" v-model="updatedNote" name="note" id="note"
        class="text-[#D4D4D4] my-4 font-playfair w-full bg-transparent focus:outline-none resize-none flex-grow" @input="
          () => {
            debouncedFn()
            selectedNote.text = updatedNote
          }
        ">
        </textarea>
    </div>

    <button class="text-zinc-400 hover:text-white text-sm font-bold absolute right-0 bottom-0 p-8" @click="logout">
      Logout
    </button>
  </div>
  <!-- /note container -->
</template>