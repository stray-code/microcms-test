<script setup lang="ts">
import type { News } from '@/types'
import { cmsClient } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const newsList = ref<News[]>([])

const fetchNews = async () => {
  const query = router.currentRoute.value.query

  const category = query.category
    ? `category[equals]${query.category}`
    : undefined

  try {
    const response = await cmsClient.get({
      endpoint: 'news',
      queries: { orders: '-publishedAt', filters: category },
    })

    newsList.value = response.contents
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchNews)

watch(() => router.currentRoute.value.query, fetchNews)
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
        <div class="flex gap-3">
          <time class="text-gray-500 text-sm">{{
            new Date(news.publishedAt).toLocaleDateString()
          }}</time>
          <RouterLink
            v-if="news.category"
            :to="`?category=${news.category.id}`"
            class="text-blue-600 hover:underline text-sm"
            >{{ news.category?.name }}</RouterLink
          >
        </div>
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
