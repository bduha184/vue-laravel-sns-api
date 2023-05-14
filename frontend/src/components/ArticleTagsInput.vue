<script setup>
import Vue3TagsInput from "vue3-tags-input";
import { computed, ref } from "vue";

const tags = ref([]);

// const autocompleteItems = reactive([
//   {
//     text: "Spain",
//   },
//   {
//     text: "France",
//   },
//   {
//     text: "USA",
//   },
//   {
//     text: "Germany",
//   },
//   {
//     text: "China",
//   },
// ]);

const tagsJson = computed(() => {
  return JSON.stringify(tags)
});

const emit = defineEmits(['inputTags'])

const inputTags = () => {
  emit('inputTags',tags.value);
}

</script>

<template>
  <div>
    <input
      type="hidden"
      name="tags"
      :value="tagsJson"
      >
      <vue3-tags-input
      :tags="tags"
      @input="inputTags"
      placeholder="タグを5個まで入力できます"
      @on-tags-changed="newTags => tags = newTags"
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
