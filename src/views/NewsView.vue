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
  <div v-if="news">
    <h3>{{ news.title }}</h3>
    <time>{{ new Date(news.publishedAt).toLocaleDateString() }}</time>
    <p v-html="news.content"></p>
  </div>
</template>
