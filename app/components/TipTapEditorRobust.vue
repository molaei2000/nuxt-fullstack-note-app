<template>
  <div class="tiptap-editor-wrapper">
    <!-- Toolbar -->
    <div v-if="editor" class="editor-toolbar">
      <div class="toolbar-group">
        <button title="Undo" class="toolbar-button" :class="{ 'is-disabled': !editor.can().undo() }"
          @click="editor.chain().focus().undo().run()">
          <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4" />
        </button>
        <button title="Redo" class="toolbar-button" :class="{ 'is-disabled': !editor.can().redo() }"
          @click="editor.chain().focus().redo().run()">
          <Icon name="heroicons:arrow-uturn-right" class="w-4 h-4" />
        </button>
      </div>

      <div class="toolbar-separator" />

      <div class="toolbar-group">
        <button title="Bold" class="toolbar-button" :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()">
          <Icon name="heroicons:bold" class="w-4 h-4" />
        </button>
        <button title="Italic" class="toolbar-button" :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()">
          <Icon name="heroicons:italic" class="w-4 h-4" />
        </button>
        <button title="Underline" class="toolbar-button" :class="{ 'is-active': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()">
          <span class="underline font-semibold">U</span>
        </button>
        <button title="Strikethrough" class="toolbar-button" :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()">
          <span class="line-through font-semibold">S</span>
        </button>
        <button title="Code" class="toolbar-button" :class="{ 'is-active': editor.isActive('code') }"
          @click="editor.chain().focus().toggleCode().run()">
          <Icon name="heroicons:code-bracket" class="w-4 h-4" />
        </button>
      </div>

      <div class="toolbar-separator" />

      <div class="toolbar-group">
        <button title="Align Left" class="toolbar-button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()">
          <Icon name="heroicons:bars-3-bottom-left" class="w-4 h-4" />
        </button>
        <button title="Align Center" class="toolbar-button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()">
          <Icon name="heroicons:bars-3" class="w-4 h-4" />
        </button>
        <button title="Align Right" class="toolbar-button"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()">
          <Icon name="heroicons:bars-3-bottom-right" class="w-4 h-4" />
        </button>
      </div>

      <div class="toolbar-separator" />

      <div class="toolbar-group">
        <button title="Bullet List" class="toolbar-button" :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()">
          <Icon name="heroicons:list-bullet" class="w-4 h-4" />
        </button>
        <button title="Numbered List" class="toolbar-button" :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()">
          <Icon name="heroicons:numbered-list" class="w-4 h-4" />
        </button>
        <button title="Quote" class="toolbar-button" :class="{ 'is-active': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()">
          <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-4 h-4" />
        </button>
      </div>

      <div class="toolbar-separator" />

      <div class="toolbar-group">
        <button title="Horizontal Rule" class="toolbar-button"
          @click="editor.chain().focus().setHorizontalRule().run()">
          <Icon name="heroicons:minus" class="w-4 h-4" />
        </button>
        <button title="Clear Formatting" class="toolbar-button" @click="clearFormatting">
          <Icon name="heroicons:no-symbol" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Editor Container -->
    <div class="editor-container">
      <!-- Bubble Menu - appears when text is selected -->
      <BubbleMenu v-if="editor" class="bubble-menu" :editor="editor" :options="{ placement: 'top', offset: 8 }">
        <div class="menu-content">
          <button title="Bold" class="menu-button" :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()">
            <Icon name="heroicons:bold" class="w-4 h-4" />
          </button>
          <button title="Italic" class="menu-button" :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()">
            <Icon name="heroicons:italic" class="w-4 h-4" />
          </button>
          <button title="Strikethrough" class="menu-button" :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()">
            <span class="line-through font-semibold text-xs">S</span>
          </button>
          <button title="Code" class="menu-button" :class="{ 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()">
            <Icon name="heroicons:code-bracket" class="w-4 h-4" />
          </button>
          <div class="menu-separator" />
          <button title="Add Link" class="menu-button" :class="{ 'is-active': editor.isActive('link') }"
            @click="setLink">
            <Icon name="heroicons:link" class="w-4 h-4" />
          </button>
          <button title="Remove Link" class="menu-button" :disabled="!editor.isActive('link')"
            @click="editor.chain().focus().unsetLink().run()">
            <Icon name="heroicons:link-slash" class="w-4 h-4" />
          </button>
        </div>
      </BubbleMenu>

      <!-- Floating Menu - appears on empty lines -->
      <FloatingMenu v-if="editor" class="floating-menu" :editor="editor"
        :options="{ placement: 'left-start', offset: [0, 8] }">
        <div class="menu-content">
          <button title="Heading 1" class="menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            H1
          </button>
          <button title="Heading 2" class="menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            H2
          </button>
          <button title="Heading 3" class="menu-button"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            H3
          </button>
          <div class="menu-separator" />
          <button title="Bullet List" class="menu-button" :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()">
            <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          </button>
          <button title="Numbered List" class="menu-button" :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <Icon name="heroicons:numbered-list" class="w-4 h-4" />
          </button>
          <button title="Quote" class="menu-button" :class="{ 'is-active': editor.isActive('blockquote') }"
            @click="editor.chain().focus().toggleBlockquote().run()">
            <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-4 h-4" />
          </button>
        </div>
      </FloatingMenu>

      <!-- Editor Content -->
      <EditorContent class="editor-content" :editor="editor" />
    </div>
  </div>
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
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'

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
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'my-link',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'my-image',
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
    TextStyleKit,
    Color.configure({
      types: ['textStyle'],
    }),
    Highlight.configure({
      multicolor: true,
    }),
  ],
  content: model.value,
  onUpdate: ({ editor }) => {
    model.value = editor.getHTML()
  },
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
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
/* Editor Wrapper */
.tiptap-editor-wrapper {
  @apply w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden;
}

/* Toolbar Styles */
.editor-toolbar {
  @apply flex items-center gap-1 p-3 bg-gray-50 border-b border-gray-200 flex-wrap;
}

.toolbar-group {
  @apply flex items-center gap-1;
}

.toolbar-separator {
  @apply w-px h-6 bg-gray-300 mx-2;
}

.toolbar-button {
  @apply flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-0 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 cursor-pointer;
}

.toolbar-button.is-active {
  @apply bg-blue-100 text-blue-700;
}

.toolbar-button.is-disabled {
  @apply text-gray-400 cursor-not-allowed;
}

.toolbar-button.is-disabled:hover {
  @apply bg-transparent text-gray-400;
}

/* Editor Container */
.editor-container {
  @apply relative;
}

.editor-content {
  @apply p-4 min-h-[200px];
}

/* Bubble Menu Styles */
.bubble-menu {
  @apply z-50;
}

.bubble-menu .menu-content {
  @apply flex items-center bg-gray-900 text-white rounded-lg shadow-lg px-2 py-1 gap-1;
}

.bubble-menu .menu-button {
  @apply flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-0 text-white hover:bg-gray-700 transition-colors duration-150 cursor-pointer;
}

.bubble-menu .menu-button.is-active {
  @apply bg-blue-600 text-white;
}

.bubble-menu .menu-button:disabled {
  @apply text-gray-500 cursor-not-allowed;
}

.bubble-menu .menu-button:disabled:hover {
  @apply bg-transparent text-gray-500;
}

.bubble-menu .menu-separator {
  @apply w-px h-6 bg-gray-600 mx-1;
}

/* Floating Menu Styles */
.floating-menu {
  @apply z-50;
}

.floating-menu .menu-content {
  @apply flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg p-1 gap-1;
}

.floating-menu .menu-button {
  @apply flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-0 text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-sm font-medium;
}

.floating-menu .menu-button.is-active {
  @apply bg-blue-100 text-blue-700;
}

.floating-menu .menu-separator {
  @apply h-px bg-gray-200 mx-1 my-1;
}

/* Editor Content Styles */
:deep(.ProseMirror) {
  @apply outline-none;
}

/* Heading Styles */
:deep(.ProseMirror h1) {
  @apply text-3xl font-bold mb-4 mt-6;
}

:deep(.ProseMirror h2) {
  @apply text-2xl font-bold mb-3 mt-5;
}

:deep(.ProseMirror h3) {
  @apply text-xl font-bold mb-2 mt-4;
}

:deep(.ProseMirror h4) {
  @apply text-lg font-bold mb-2 mt-3;
}

:deep(.ProseMirror h5) {
  @apply text-base font-bold mb-2 mt-3;
}

:deep(.ProseMirror h6) {
  @apply text-sm font-bold mb-2 mt-3;
}

/* Paragraph Styles */
:deep(.ProseMirror p) {
  @apply mb-3 leading-7;
}

:deep(.ProseMirror p:first-child) {
  @apply mt-0;
}

:deep(.ProseMirror p:last-child) {
  @apply mb-0;
}

/* List Styles */
:deep(.ProseMirror .my-bullet-list),
:deep(.ProseMirror .my-ordered-list) {
  @apply pl-6 mb-3;
}

:deep(.ProseMirror .my-bullet-list li),
:deep(.ProseMirror .my-ordered-list li) {
  @apply mb-1;
}

:deep(.ProseMirror ul) {
  @apply list-disc;
}

:deep(.ProseMirror ol) {
  @apply list-decimal;
}

/* Blockquote Styles */
:deep(.ProseMirror .my-blockquote) {
  @apply border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50;
}

/* Link Styles */
:deep(.ProseMirror .my-link) {
  @apply text-blue-600 underline hover:text-blue-800;
}

/* Code Styles */
:deep(.ProseMirror code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

/* Image Styles */
:deep(.ProseMirror .my-image) {
  @apply max-w-full h-auto rounded-lg shadow-sm my-4;
}

/* Horizontal Rule Styles */
:deep(.ProseMirror .my-horizontal-rule) {
  @apply border-0 border-t border-gray-300 my-6;
}

/* Text Alignment */
:deep(.ProseMirror [style*="text-align: left"]) {
  @apply text-left;
}

:deep(.ProseMirror [style*="text-align: center"]) {
  @apply text-center;
}

:deep(.ProseMirror [style*="text-align: right"]) {
  @apply text-right;
}

/* Focus Styles */
:deep(.ProseMirror:focus) {
  @apply outline-none ring-2 ring-blue-500 ring-opacity-20;
}

/* Placeholder */
:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  @apply float-left text-gray-400 pointer-events-none h-0;
}

/* Gapcursor */
:deep(.ProseMirror .ProseMirror-gapcursor) {
  @apply border-blue-500;
}

/* Dropcursor */
:deep(.ProseMirror .ProseMirror-dropcursor) {
  @apply border-blue-500;
}

/* Selection */
:deep(.ProseMirror ::selection) {
  @apply bg-blue-100;
}
</style>