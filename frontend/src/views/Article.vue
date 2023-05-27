<script setup>
import { ref, computed } from 'vue';
import Card from '../components/Card.vue';
import { useArticleStore } from '../js/store/articles';

const props = defineProps({
  articleId:Number
})

const articlesStore = useArticleStore();
const articles = articlesStore.getArticles;

const article = ref();

const showArticle = computed(() => {
  return article.value = articles.find(article => article.id == props.articleId)
})

</script>

<template>
 <div class="container">
    <Card :article="showArticle"/>
  </div>
</template>
