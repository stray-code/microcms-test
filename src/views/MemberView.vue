<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Member } from '@/types'
import { cmsClient } from '@/utils'

const members = ref<Member[]>([])

onMounted(async () => {
  try {
    const response = await cmsClient.get({
      endpoint: 'members',
    })

    members.value = response.contents
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <section>
      <h2 class="mb-3 text-xl">メンバー</h2>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-8">
        <div v-for="member in members" class="grid-cols-6">
          <div class="h-full border border-gray-200 shadow-lg">
            <img :src="member.avatar_url.url" alt="" class="w-full" />
            <div class="p-3 flex flex-col gap-2">
              <p class="text-lg">{{ member.name }}</p>
              <p>{{ member.department }}</p>
              <p class="text-gray-600">{{ member.biography }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
