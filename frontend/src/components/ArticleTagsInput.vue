<script setup>
import Vue3TagsInput from "vue3-tags-input";
import { compile, computed, ref } from "vue";


const props = defineProps({
  articleData:Object
})
const tags = ref([]);
const emit = defineEmits(['emitInputTags']);

const emitTags = () =>{
  emit('emitInputTags',tags.value);
}

const propsArticleData = computed(()=> {
  return tags.value = props.articleData.tags
})

</script>

<template>
  <div>
      <vue3-tags-input
      :tags="tags"
      :propsArticleData = "propsArticleData"
      @keydown.enter="emitTags"
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
