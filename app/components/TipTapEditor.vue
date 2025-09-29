<template>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const model = defineModel<string>('model-value', { required: true })

const editor = useEditor({
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
  }
})

watch(model, (newVal) => {
  const isSame = editor.value?.getHTML() === newVal
  if (!isSame) editor.value?.commands.setContent(newVal)
})



</script>