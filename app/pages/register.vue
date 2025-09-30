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
    const res = await $fetch('/api/user', {
      method: 'POST',
      body: event.data
    })
    toast.add({ title: 'Success', description: 'Account created successfully', color: 'success' })
    console.log(res);
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
        Sign up for a free account
      </h2>
      <h3>
        Already registered? <NuxtLink to="/login"><span class="text-primary font-semibold">Log in</span></NuxtLink> to
        your account
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
          Sign Up
          <Icon name="tabler:arrow-right" />
        </UButton>
      </UForm>
    </div>
  </div>

</template>