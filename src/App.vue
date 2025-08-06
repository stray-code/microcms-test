<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="my-3 px-8 max-w-3xl mx-auto">
    <header class="mb-8">
      <nav class="flex justify-between">
        <RouterLink to="/" class="text-blue-600 text-xl"
          >広島イベント情報</RouterLink
        >
        <RouterLink to="/members" class="text-blue-600 text-xl"
          >メンバー</RouterLink
        >
      </nav>
    </header>

    <RouterView />
  </div>
</template>
