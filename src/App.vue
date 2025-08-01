<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">広島イベント情報</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
