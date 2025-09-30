<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  middleware: ['unauth-only']
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

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: event.data
    })
    toast.add({ title: 'Success', description: 'Logged in successfully', color: 'success' })
    navigateTo('/notes')

  } catch (error) {
    toast.add({ title: 'Error', description: error?.response?._data?.message ?? 'error', color: 'error' })
  }
}
</script>
<template>

  <div class="flex flex-col h-full w-3/4 mx-auto space-y-4 justify-center">
    <AppLogo />
    <div class="mb-8">
      <h2 class="font-bold mb-2.5">
        Log in to your account
      </h2>
      <h3>
        Don't have an account?<NuxtLink to="/register"><span class="text-primary font-semibold">Sign Up</span>
        </NuxtLink> for one.
      </h3>
    </div>
    <div>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" autofocus placeholder="you@example.com" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" class="w-full" placeholder="*******" type="password" />
        </UFormField>

        <UButton block type="submit" class="rounded-full">
          Log in
          <Icon name="tabler:arrow-right" />
        </UButton>
      </UForm>
    </div>
  </div>

</template>