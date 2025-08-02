<script setup lang="ts">
import type { News } from '@/types'
import { cmsClient } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const newsList = ref<News[]>([])
const keyword = ref('')
const isPending = ref(true)

const fetchNews = async () => {
  isPending.value = true

  const query = router.currentRoute.value.query

  const category = query.category
    ? `category[equals]${query.category}`
    : undefined

  try {
    const response = await cmsClient.get({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
        filters: category,
        q: query.keyword?.toString(),
      },
    })

    newsList.value = response.contents
  } catch (error) {
    console.log(error)
  }

  isPending.value = false
}

onMounted(fetchNews)

watch(() => router.currentRoute.value.query, fetchNews)
</script>

<template>
  <main>
    <section>
      <div class="flex justify-between">
        <h2 class="mb-3 text-xl">お知らせ</h2>
        <form @submit.prevent="$router.push(`?keyword=${keyword}`)">
          <div class="flex items-center gap-1">
            <input
              type="text"
              v-model="keyword"
              class="p-1 border-1 border-gray-300 rounded-sm"
            />
            <button
              type="submit"
              class="bg-blue-500 py-2 px-3 rounded-sm text-white text-sm"
            >
              検索
            </button>
          </div>
        </form>
      </div>
      <div v-if="isPending">loading...</div>
      <div v-else>
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
      </div>
    </section>
  </main>
</template>
