<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { News } from '@/types'
import { cmsClient } from '@/utils'

const router = useRouter()

const news = ref<News | null>(null)

onMounted(async () => {
  const id = router.currentRoute.value.params.id

  try {
    const response = await cmsClient.get({
      endpoint: 'news',
      contentId: id.toString(),
    })

    news.value = response
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <div v-if="news">
      <time class="text-gray-500 text-sm">{{
        new Date(news.publishedAt).toLocaleDateString()
      }}</time>
      <h1 class="mb-3 pb-3 text-xl border-b border-gray-300">
        {{ news.title }}
      </h1>
      <div v-html="news.content" class="prose lg:prose-xl"></div>
    </div>
  </main>
</template>
