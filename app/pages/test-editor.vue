<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Test Robust TipTap Editor</h1>

    <div class="space-y-4">
      <RobustTipTapEditor v-model="content" />

      <div class="border rounded-lg p-4 bg-gray-50">
        <h3 class="font-semibold mb-2">Editor Content:</h3>
        <pre class="text-sm">{{ content }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const content = ref('<p>Start typing to test the robust editor...</p>')
</script>