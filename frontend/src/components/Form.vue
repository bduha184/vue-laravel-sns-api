<script setup>
const props = defineProps({
  articleData:Object,
  // defaultArticleData:Object
});

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
    <label></label>
    <textarea name="body" required class="form-control" rows="16" placeholder="本文"
    v-model="articleData.body"
    ></textarea>
  </div>
</div>
</template>
