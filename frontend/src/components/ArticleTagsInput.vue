<script setup>
import VueTagsInput from "vue3-tags-input";
import { computed, ref, reactive } from "vue";

const tag = ref("");
const tags = ref([]);
const autocompleteItems = reactive([
  {
    text: "Spain",
  },
  {
    text: "France",
  },
  {
    text: "USA",
  },
  {
    text: "Germany",
  },
  {
    text: "China",
  },
]);
const tagsJson = computed(() => {
  return JSON.stringify(this.tags)
});

</script>

<template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      placeholder="タグを入力してください"
      @tags-changed="(newTags) => (tags = newTags)"
    />
  </div>
</template>

<style lang="css" scoped>
.vue3-tags-input {
  max-width: inherit;
}
</style>
<style lang="css">
.vue3-tags-input {
  background: transparent;
  border: 1px solid #747373;
  color: #747373;
  margin-right: 4px;
  border-radius: 0px;
  font-size: 13px;
}
</style>
