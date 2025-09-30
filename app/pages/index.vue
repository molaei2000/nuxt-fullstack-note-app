<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
// Animation utilities

// Meta
definePageMeta({
  layout: 'default'
})

// SEO
useSeoMeta({
  title: 'Smart Notes - Your Digital Notebook',
  ogTitle: 'Smart Notes - Your Digital Notebook',
  description: 'Create, organize, and share your notes with our powerful note-taking application. Rich text editing, real-time sync, and secure storage.',
  ogDescription: 'Create, organize, and share your notes with our powerful note-taking application. Rich text editing, real-time sync, and secure storage.',
})

// Hero section data
const heroTitle = 'Your Digital Notebook, Reimagined'
const heroDescription = 'Create, organize, and share your notes with our powerful note-taking application. Rich text editing, real-time sync, and secure storage all in one place.'
const heroLinks = [
  {
    label: 'Get Started Free',
    to: '/register',
    size: 'xl' as const
  },
  {
    label: 'Sign In',
    to: '/login',
    variant: 'outline' as const,
    size: 'xl' as const
  }
]

// Features data
const featuresTitle = 'Everything you need to stay organized'
const featuresDescription = 'Powerful features designed to help you capture, organize, and find your notes effortlessly.'

const features = [
  {
    icon: 'i-lucide-edit-3',
    title: 'Rich Text Editor',
    description: 'Write with style using our powerful TipTap editor with formatting, links, and media support.'
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Real-time Sync',
    description: 'Your notes are automatically saved and synced across all your devices in real-time.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. Only you have access to your private notes.'
  },
  {
    icon: 'i-lucide-search',
    title: 'Powerful Search',
    description: 'Find any note instantly with our fast and intelligent search functionality.'
  },
  {
    icon: 'i-lucide-palette',
    title: 'Beautiful Themes',
    description: 'Choose from multiple themes and customize your writing experience.'
  },
  {
    icon: 'i-lucide-share-2',
    title: 'Easy Sharing',
    description: 'Share your notes with others or collaborate on projects seamlessly.'
  }
]

// Stats data
const stats = [
  { value: 10000, label: 'Active Users' },
  { value: 50000, label: 'Notes Created' },
  { value: 99, label: 'Uptime %' }
]

// Reactive stats for animation
const animatedStats = reactive([0, 0, 0])

// Template refs
const titleRef = ref<HTMLElement>()
const descriptionRef = ref<HTMLElement>()
const heroImageRef = ref<HTMLElement>()
const featuresTitleRef = ref<HTMLElement>()
const featureRefs = ref<(HTMLElement | null)[]>([])
const statsHeaderRef = ref<HTMLElement>()
const statRefs = ref<(HTMLElement | null)[]>([])
const ctaRef = ref<HTMLElement>()
const bgDecoration1 = ref<HTMLElement>()
const bgDecoration2 = ref<HTMLElement>()

// Animation functions using CSS classes
const animateHero = () => {
  if (titleRef.value) {
    titleRef.value.classList.add('animate-fade-up')
  }
  if (descriptionRef.value) {
    setTimeout(() => {
      descriptionRef.value!.classList.add('animate-fade-up')
    }, 200)
  }
  if (heroImageRef.value) {
    setTimeout(() => {
      heroImageRef.value!.classList.add('animate-fade-up')
    }, 400)
  }
}

const animateFeatures = () => {
  if (featuresTitleRef.value) {
    featuresTitleRef.value.classList.add('animate-fade-up')
  }

  const validFeatureRefs = featureRefs.value.filter(el => el) as HTMLElement[]
  if (validFeatureRefs.length > 0) {
    validFeatureRefs.forEach((el, index) => {
      setTimeout(() => {
        el?.classList.add('animate-fade-up')
      }, index * 100)
    })
  }
}

const animateStats = () => {
  if (statsHeaderRef.value) {
    statsHeaderRef.value.classList.add('animate-fade-up')
  }

  const validStatRefs = statRefs.value.filter(el => el) as HTMLElement[]
  if (validStatRefs.length > 0) {
    validStatRefs.forEach((el, index) => {
      setTimeout(() => {
        el?.classList.add('animate-fade-up')
      }, index * 100)
    })
  }

  // Animate stat numbers
  stats.forEach((stat, index) => {
    setTimeout(() => {
      const start = 0
      const end = stat.value
      const duration = 2000
      const startTime = Date.now()

      const updateNumber = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3)
        animatedStats[index] = Math.floor(start + (end - start) * easeOutProgress)

        if (progress < 1) {
          requestAnimationFrame(updateNumber)
        }
      }
      updateNumber()
    }, 500 + index * 100)
  })
}

const animateCTA = () => {
  if (ctaRef.value) {
    ctaRef.value.classList.add('animate-fade-up')
  }
}

const animateBackgroundDecorations = () => {
  if (bgDecoration1.value) {
    bgDecoration1.value.classList.add('animate-fade-right')
  }
  if (bgDecoration2.value) {
    setTimeout(() => {
      bgDecoration2.value!.classList.add('animate-fade-left')
    }, 500)
  }
}

// Intersection Observer for scroll-triggered animations
const createIntersectionObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement

        if (target === featuresTitleRef.value?.parentElement) {
          animateFeatures()
        }
        if (target === statsHeaderRef.value?.parentElement) {
          animateStats()
        }
        if (target === ctaRef.value?.parentElement) {
          animateCTA()
        }
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' })

  // Observe sections
  if (featuresTitleRef.value?.parentElement) observer.observe(featuresTitleRef.value.parentElement)
  if (statsHeaderRef.value?.parentElement) observer.observe(statsHeaderRef.value.parentElement)
  if (ctaRef.value?.parentElement) observer.observe(ctaRef.value.parentElement)
}

// Feature hover animation using CSS
const onFeatureHover = (index: number, isHovering: boolean) => {
  const element = featureRefs.value[index]
  if (element) {
    if (isHovering) {
      element.style.transform = 'translateY(-10px)'
    } else {
      element.style.transform = 'translateY(0px)'
    }
  }
}

onMounted(() => {
  // Start hero animations immediately
  setTimeout(() => {
    animateHero()
    animateBackgroundDecorations()
  }, 100)

  // Set up intersection observers for other sections
  setTimeout(() => {
    createIntersectionObserver()
  }, 500)
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <StarBackground :factor="0.05" :speed="50" star-color="#fff">

      <UPageHero :title="heroTitle" :description="heroDescription" :links="heroLinks" class="relative overflow-hidden">
        <template #title>
          <div class="space-y-2">
            <div ref="titleRef"
              class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted opacity-0">
              {{ heroTitle }}
            </div>
          </div>
        </template>

        <template #description>
          <div ref="descriptionRef" class="text-lg sm:text-xl/8 text-muted opacity-0">
            {{ heroDescription }}
          </div>
        </template>

        <template #default>
          <div ref="heroImageRef" class="flex justify-center items-center opacity-0">
            <UCard variant="subtle" class="w-full max-w-md p-8 transform">
              <div class="space-y-4">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-lucide-file-text" class="text-2xl text-primary" />
                  <span class="text-lg font-semibold">Smart Notes</span>
                </div>
                <div class="space-y-2 text-sm text-muted">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-lucide-check" class="text-green-500" />
                    <span>Rich text editing</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-lucide-check" class="text-green-500" />
                    <span>Real-time sync</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-lucide-check" class="text-green-500" />
                    <span>Secure & private</span>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </UPageHero>
    </StarBackground>

    <!-- Features Section -->
    <UPageSection :title="featuresTitle" :description="featuresDescription" class="py-24 relative">
      <HeroBackground class="absolute w-full left-0 -top-px transition-all text-primary shrink-0 -z-10" />
      <template #title>
        <div ref="featuresTitleRef" class="opacity-0">
          {{ featuresTitle }}
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <div v-for="(feature, index) in features" :key="index" :ref="(el) => featureRefs[index] = el as HTMLElement"
          class="opacity-0 transform translate-y-8">
          <UPageCard variant="subtle" spotlight spotlight-color="primary"
            class="h-full hover:scale-105 transition-all duration-300 cursor-pointer group"
            @mouseenter="onFeatureHover(index, true)" @mouseleave="onFeatureHover(index, false)">
            <div class="text-center space-y-4 p-6">
              <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-300">
                <UIcon :name="feature.icon" class="text-2xl text-primary" />
              </div>
              <h3 class="text-xl font-semibold text-highlighted">{{ feature.title }}</h3>
              <p class="text-muted">{{ feature.description }}</p>
            </div>
          </UPageCard>
        </div>
      </div>
    </UPageSection>

    <!-- Stats Section -->
    <UPageSection class="py-24 bg-elevated/30">
      <div class="text-center space-y-16">
        <div ref="statsHeaderRef" class="opacity-0">
          <h2 class="text-3xl sm:text-4xl font-bold text-highlighted mb-4">
            Trusted by thousands
          </h2>
          <p class="text-lg text-muted">
            Join the growing community of users who love our note-taking app
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(stat, index) in stats" :key="index" :ref="(el) => statRefs[index] = el as HTMLElement"
            class="text-center opacity-0">
            <div class="text-4xl sm:text-5xl font-bold text-primary mb-2">
              {{ animatedStats[index] }}+
            </div>
            <div class="text-lg text-muted">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- CTA Section -->
    <UPageSection class="py-24">
      <div class="text-center space-y-8">
        <div ref="ctaRef" class="opacity-0">
          <h2 class="text-3xl sm:text-4xl font-bold text-highlighted mb-4">
            Ready to get started?
          </h2>
          <p class="text-lg text-muted mb-8">
            Create your account today and start organizing your thoughts like never before.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton to="/register" size="xl" class="transform hover:scale-105 transition-all duration-300">
              Get Started Free
            </UButton>
            <UButton to="/notes" variant="outline" size="xl"
              class="transform hover:scale-105 transition-all duration-300">
              View Demo
            </UButton>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- Background Decorations -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div ref="bgDecoration1"
        class="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-0" />
      <div ref="bgDecoration2"
        class="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-0" />
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
}

.animate-fade-right {
  animation: fadeRight 2s ease-out forwards;
}

.animate-fade-left {
  animation: fadeLeft 2s ease-out forwards;
}

/* Initial hidden states */
.opacity-0 {
  opacity: 0;
}

/* Hover effects */
.group:hover .group-hover-bg-primary {
  background-color: rgb(var(--color-primary) / 0.2);
}

/* Custom transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.hover\\:scale-105:hover {
  transform: scale(1.05);
}

/* Hero section specific animations */
.hero-title {
  transform: translateY(50px);
  opacity: 0;
}

.hero-description {
  transform: translateY(30px);
  opacity: 0;
}

.hero-image {
  transform: translateY(40px) scale(0.9);
  opacity: 0;
}

/* Feature cards stagger effect */
.feature-card {
  transform: translateY(50px);
  opacity: 0;
}

/* Stats animation */
.stat-item {
  transform: translateY(30px);
  opacity: 0;
}

/* Background decorations */
.bg-decoration-1 {
  transform: translateX(-100px);
  opacity: 0;
}

.bg-decoration-2 {
  transform: translateX(100px);
  opacity: 0;
}
</style>