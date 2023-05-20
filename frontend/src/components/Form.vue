<script setup>
import { computed, reactive, ref } from 'vue';
import ArticleTagsInput from './ArticleTagsInput.vue';
const props = defineProps({
  articleData:Object,
});

const inputTags = ref([]);

// const articleData = reactive({
//   title:{type:String,default:''},
//   body:{type:String,default:''},
// });

// const emitTags = (e) => {
//   console.log(e);
//   // articleData.tags = e;
// }

// const emit = defineEmits(['articleData']);

// emit('articleData',articleData);

</script>

<template>
<div>
  <div class="md-form">
    <label>タイトル</label>
    <input type="text" name="title" class="form-control" required
    v-model="articleData.title"
    >
  </div>
  <!-- <div class="form-group">
    <ArticleTagsInput
    :inputTags="inputTags"
    v-model="inputTags.value"
    />
  </div> -->
  <div class="form-group">
    <label></label>
    <textarea name="body" required class="form-control" rows="16" placeholder="本文"
  v-model="articleData.body"
    ></textarea>
  </div>
</div>
</template>
