<script setup>
import { computed, reactive, ref } from 'vue';
import ArticleTagsInput from './ArticleTagsInput.vue';
const props = defineProps({
  articleData:Object,
});

console.log(props.articleData)

const emitTags = (tags) =>{
  props.articleData.tags = tags;
}

</script>

<template>
<div>
  <div class="md-form">
    <label>タイトル</label>
    <input type="text" name="title" class="form-control" required
    v-model="articleData.title"
    >
  </div>
  <div class="form-group">
    <ArticleTagsInput
    @emitInputTags="emitTags"
    />
  </div>
  <div class="form-group">
    <label></label>
    <textarea name="body" required class="form-control" rows="16" placeholder="本文"
  v-model="articleData.body"
    ></textarea>
  </div>
</div>
</template>
