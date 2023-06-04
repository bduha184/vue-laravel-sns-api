<script setup>
import { RouterLink } from "vue-router"
const props = defineProps({
  tags:Object
})
</script>

<template>
    <div
      class="card-body pt-0 pb-4 pl-3 d-flex flex-row"
    >
      <div class="card-text line-height"
      v-for="tag in tags"
      :key="tag.id"
      >
        <RouterLink
        :to="{
          name:'tag',
          query:{tagName:tag.name}
        }"
        class="border p-1 mr-1 mt-1 text-muted"> #{{ tag.name }} </RouterLink>
      </div>
    </div>
</template>
