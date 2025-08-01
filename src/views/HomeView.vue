<script setup lang="ts">
import type { News } from '@/types'
import { cmsClient } from '@/utils'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const newsList = ref<News[]>([])

onMounted(async () => {
  const response = await cmsClient.get({
    endpoint: 'news',
  })

  newsList.value = response.contents.reverse()
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
