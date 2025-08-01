<script setup lang="ts">
import type { News } from '@/types'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const newsList = ref<News[]>([])

onMounted(async () => {
  const response = await fetch('https://hke0ar7pmq.microcms.io/api/v1/news', {
    headers: {
      'X-MICROCMS-API-KEY': import.meta.env.VITE_MICROCMS_API_KEY,
    },
  })

  if (response.ok) {
    const data = await response.json()
    newsList.value = data.contents.reverse()
  }
})
</script>

<template>
  <main>
    <div v-for="news in newsList">
      <h3>
        <RouterLink :to="`news/${news.id}`">{{ news.title }}</RouterLink>
      </h3>
      <time>{{ new Date(news.publishedAt).toLocaleDateString() }}</time>
    </div>
  </main>
</template>
