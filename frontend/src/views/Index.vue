<script setup>
import { onMounted, computed, ref } from "vue";
import { useArticleStore } from "../js/store/articles";
import Card from "../components/Card.vue";
import InfiniteLoading from "v3-infinite-loading";
import axios from "axios";
import "v3-infinite-loading/lib/style.css";

const articles = useArticleStore();
// const getArticles = computed(() => {
//   return articles.getArticles;
// });

// onMounted(() => {
//   articles.fetchArticles();
// });

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const loadArticles = ref([]);
let getArticlesCount = 10;
const load = async ($state) => {
  page++;
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api
      .get(`/api/articles/${page}`)
      .then((res) => {
        console.log(res.data)
        const fetchArticles = res.data;
        if (loadArticles.value >= 100) {
          $state.complete();
        } else {

          loadArticles.value.push(...fetchArticles);
          $state.loaded();
        }
      })
      .catch((error) => {
        $state.error();
      });
  });
};


console.log(loadArticles.value);
// console.log(getArticles.value)
</script>

<template>
  <div class="container" >
    <div v-for="article in loadArticles" :key="article.id">
      <Card :article="article" id="article-container"/>
    </div>
    <InfiniteLoading target="#article-container" @infinite="load" />
  </div>
</template>
