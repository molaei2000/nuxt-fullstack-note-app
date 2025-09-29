<template>
  <UCard class="w-full overflow-hidden">
    <!-- Toolbar -->
    <template #header>
      <div v-if="editor" class="flex items-center gap-1 flex-wrap p-2">
        <!-- Undo/Redo Group -->
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="sm" color="neutral" :disabled="!editor.can().undo()"
            @click="editor.chain().focus().undo().run()">
            <UIcon name="i-heroicons-arrow-uturn-left" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="sm" color="neutral" :disabled="!editor.can().redo()"
            @click="editor.chain().focus().redo().run()">
            <UIcon name="i-heroicons-arrow-uturn-right" class="w-4 h-4" />
          </UButton>
        </div>

        <UDivider orientation="vertical" class="h-6" />

        <!-- Text Formatting Group -->
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="sm" :color="editor.isActive('bold') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBold().run()">
            <UIcon name="i-heroicons-bold" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('italic') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleItalic().run()">
            <UIcon name="i-heroicons-italic" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('underline') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleUnderline().run()">
            <span class="underline font-semibold text-sm">U</span>
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('strike') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleStrike().run()">
            <span class="line-through font-semibold text-sm">S</span>
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('code') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleCode().run()">
            <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
          </UButton>
        </div>

        <UDivider orientation="vertical" class="h-6" />

        <!-- List Group -->
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="sm" :color="editor.isActive('bulletList') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBulletList().run()">
            <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('orderedList') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <UIcon name="i-heroicons-numbered-list" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="sm" :color="editor.isActive('blockquote') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBlockquote().run()">
            <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-4 h-4" />
          </UButton>
        </div>

        <UDivider orientation="vertical" class="h-6" />

        <!-- Clear Formatting Group -->
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="sm" color="neutral" @click="clearFormatting">
            <UIcon name="i-heroicons-no-symbol" class="w-4 h-4" />
          </UButton>
        </div>
      </div>
    </template>

    <!-- Bubble Menu - appears when text is selected -->
    <BubbleMenu v-if="editor" :editor="editor" :options="{ placement: 'top', offset: 8 }">
      <UCard class="p-1">
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="xs" :color="editor.isActive('bold') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBold().run()">
            <UIcon name="i-heroicons-bold" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('italic') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleItalic().run()">
            <UIcon name="i-heroicons-italic" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('strike') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleStrike().run()">
            <span class="line-through font-semibold text-xs">S</span>
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('code') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleCode().run()">
            <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
          </UButton>
          <UDivider orientation="vertical" class="h-4" />
          <UButton variant="ghost" size="xs" :color="editor.isActive('link') ? 'primary' : 'neutral'" @click="setLink">
            <UIcon name="i-heroicons-link" class="w-4 h-4" />
          </UButton>
        </div>
      </UCard>
    </BubbleMenu>

    <!-- Floating Menu - appears on empty lines -->
    <FloatingMenu v-if="editor" :editor="editor" :options="{ placement: 'left-start', offset: 8 }">
      <UCard class="p-1">
        <div class="flex items-center gap-1">
          <UButton variant="ghost" size="xs" :color="editor.isActive('heading', { level: 1 }) ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            <span class="font-semibold text-xs">H1</span>
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('heading', { level: 2 }) ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            <span class="font-semibold text-xs">H2</span>
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('heading', { level: 3 }) ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            <span class="font-semibold text-xs">H3</span>
          </UButton>
          <UDivider orientation="vertical" class="h-4" />
          <UButton variant="ghost" size="xs" :color="editor.isActive('bulletList') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBulletList().run()">
            <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('orderedList') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <UIcon name="i-heroicons-numbered-list" class="w-4 h-4" />
          </UButton>
          <UButton variant="ghost" size="xs" :color="editor.isActive('blockquote') ? 'primary' : 'neutral'"
            @click="editor.chain().focus().toggleBlockquote().run()">
            <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-4 h-4" />
          </UButton>
        </div>
      </UCard>
    </FloatingMenu>

    <!-- Editor Content -->
    <EditorContent :editor="editor" class="prose prose-sm max-w-none focus:outline-none" />
  </UCard>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3/menus'
// Individual Extensions instead of StarterKit for better control
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'

const model = defineModel<string>('model-value', { required: true })

const editor = useEditor({
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),

    BulletList.configure({
      HTMLAttributes: {
        class: 'my-bullet-list',
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'my-ordered-list',
      },
    }),
    ListItem,
    Blockquote.configure({
      HTMLAttributes: {
        class: 'my-blockquote',
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'my-link',
      },
    }),
    HorizontalRule.configure({
      HTMLAttributes: {
        class: 'my-horizontal-rule',
      },
    }),
    HardBreak,
    History.configure({
      depth: 10,
    }),
    Dropcursor.configure({
      color: '#3b82f6',
    }),
    Gapcursor,
  ],
  content: model.value,
  onUpdate: (props) => {
    model.value = props.editor.getHTML()
  },
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      spellcheck: 'false',
    },
  },
})

// Watch for external model changes
watch(model, (newVal) => {
  const isSame = editor.value?.getHTML() === newVal
  if (!isSame && editor.value) {
    editor.value.commands.setContent(newVal)
  }
})

// Helper functions
const clearFormatting = () => {
  if (editor.value) {
    editor.value.chain().focus().clearNodes().unsetAllMarks().run()
  }
}

const setLink = () => {
  if (!editor.value) return

  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// Cleanup on unmount
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style scoped>
/* Editor content styling with minimal CSS - relying on Tailwind classes in template */
:deep(.ProseMirror) {
  outline: none;
  min-height: 200px;
  padding: 1rem;
  line-height: 1.75;
}

/* Typography styles */
:deep(.ProseMirror h1) {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

:deep(.ProseMirror h1:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}

:deep(.ProseMirror h2:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror h3) {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

:deep(.ProseMirror h3:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror p) {
  margin-bottom: 0.75rem;
}

:deep(.ProseMirror p:first-child) {
  margin-top: 0;
}

:deep(.ProseMirror p:last-child) {
  margin-bottom: 0;
}

:deep(.ProseMirror ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(.ProseMirror ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(.ProseMirror li) {
  margin-bottom: 0.25rem;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 1rem 0;
  font-style: italic;
  color: #4b5563;
  background: #f9fafb;
}

:deep(.ProseMirror code) {
  background: #f3f4f6;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

:deep(.ProseMirror a) {
  color: #2563eb;
  text-decoration: underline;
}

:deep(.ProseMirror a:hover) {
  color: #1d4ed8;
}

:deep(.ProseMirror hr) {
  border: 0;
  border-top: 1px solid #d1d5db;
  margin: 1.5rem 0;
}

/* Placeholder styling */
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}
</style>