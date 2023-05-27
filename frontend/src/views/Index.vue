<script setup>
import { onMounted, computed } from 'vue';
import { useArticleStore } from '../js/store/articles';
import Card from '../components/Card.vue'

const articles = useArticleStore();
const getArticles = computed(()=> {
  return articles.getArticles;
})
const Articles = computed(()=>{
  return articles.articles
})

onMounted(()=> {
  articles.fetchArticles();
})

</script>

<template>
 <div class="container">
    <div
    v-for="article in getArticles"
    :key="article.id"
    >
    <Card :article="article"/>
    </div>
  </div>
</template>
