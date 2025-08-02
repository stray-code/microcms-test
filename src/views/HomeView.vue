<script setup lang="ts">
import type { News } from '@/types'
import { cmsClient } from '@/utils'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NewsList from '@/components/NewsList.vue'

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
        <div v-if="newsList.length > 0">
          <NewsList :newsList="newsList"></NewsList>
        </div>
        <div v-else>お知らせが見つかりませんでした</div>
      </div>
    </section>
  </main>
</template>
