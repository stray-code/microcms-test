<script setup lang="ts">
import type { News } from '@/types'

defineProps<{
  newsList: News[]
}>()
</script>

<template>
  <div>
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
</template>
