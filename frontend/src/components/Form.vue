<script setup>
import ArticleTagsInput from './ArticleTagsInput.vue';
const props = defineProps({
  articleData:Object,
});


const emitTags = (tags) =>{
  return props.articleData.tags = tags;
}

</script>

<template>
<div>
  <div class="md-form">
    <input type="text" name="title" class="form-control" required placeholder="タイトル"
    v-model="articleData.title"
    >
  </div>
  <div class="form-group">
    <ArticleTagsInput
    v-model="articleData.tags"
    @emitInputTags="emitTags"
    />
  </div>
  <div class="form-group">
    <textarea name="body" required class="form-control" rows="16" placeholder="本文"
  v-model="articleData.body"
    ></textarea>
  </div>
</div>
</template>
