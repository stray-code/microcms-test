<script setup lang="ts">
import type { News } from '@/types'
import { cmsClient } from '@/utils'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const newsList = ref<News[]>([])

onMounted(async () => {
  try {
    const response = await cmsClient.get({
      endpoint: 'news',
    })

    newsList.value = response.contents.reverse()
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <section>
      <h2 class="mb-3 text-xl">お知らせ</h2>
      <div
        v-for="news in newsList"
        :key="news.id"
        class="py-3 border-t border-gray-300 pb-4"
      >
        <time class="text-gray-500 text-sm">{{
          new Date(news.publishedAt).toLocaleDateString()
        }}</time>
        <h3>
          <RouterLink
            :to="`news/${news.id}`"
            class="text-blue-600 hover:underline"
            >{{ news.title }}</RouterLink
          >
        </h3>
      </div>
    </section>
  </main>
</template>
