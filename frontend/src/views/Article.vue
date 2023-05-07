<script setup>
import { ref,onMounted } from 'vue';
import Card from '../components/Card.vue'

const props = defineProps({
  articleId:Number
})
const article = ref({});

const getArticle =() =>{
  fetch(`http://localhost:8000/api/articles/${props.articleId}`)
  .then(res=>res.json())
  .then(data=>article.value = data)
}

onMounted(()=> {
  getArticle();
})


</script>

<template>
 <div class="container">
    <div
    class="card mt-3"
    >
    <Card :article="article"/>
    </div>
  </div>
</template>
