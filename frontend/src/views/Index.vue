<script setup>
import { onMounted, ref } from "vue";
import Card from "../components/Card.vue";
import { useArticleStore } from "../js/store/articles";

const articlesStore = useArticleStore();

const observer = ref(null);

const fetchArticles = articlesStore.articles;

onMounted(()=>{
  observer.value = new IntersectionObserver((entries)=> {
    const entry = entries[0];
    if(entry && entry.isIntersecting){
      console.log('画面に入りました');
      articlesStore.fetchArticles();
    }
  });
  const observeElm = document.getElementById('observe');
  observer.value.observe(observeElm);
  console.log(observer.value)
})


</script>

<template>
  <div class="container" >
    <div v-for="article in fetchArticles" :key="article.id">
      <Card :article="article" id="article-container"/>
    </div>
    <p id="observe"></p>
  </div>
</template>
