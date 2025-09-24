<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>
<template>

  <div class="flex flex-col h-full w-3/4 mx-auto space-y-4 justify-center">
    <h1 class="font-bold">Note<span class="text-primary">Nest</span></h1>
    <div class="mb-8">
      <h2 class="font-bold mb-2.5">
        Sign up for a free account
      </h2>
      <h3>
        Already registered? <NuxtLink to="/login"><span class="text-primary font-semibold">Log in</span></NuxtLink> to
        your account
      </h3>
    </div>
    <div>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" autofocus placeholder="you@example.com" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" class="w-full" placeholder="*******" type="password" />
        </UFormField>

        <UButton block type="submit" class="rounded-full">
          Sign Up
          <Icon name="tabler:arrow-right" />
        </UButton>
      </UForm>
    </div>
  </div>

</template>