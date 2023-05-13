<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';

import Card from '../components/Card.vue'

const articles = ref([])

const getArticles =  async () => {

const api = axios.create({
  baseURL:"http://localhost:8000",
  withCredentials:true,
})
await api.get("/sanctum/csrf-cookie")
  .then(async (res) => {
    await api.get(`/api/articles/`)
      .then(res=>{
        articles.value = res.data;
      })
      .catch(error=>{
        console.log(error);
      })
  })
}

onMounted(()=> {
  getArticles();
})

</script>

<template>
 <div class="container">
    <div
    v-for="article in articles"
    :key="article.id"
    >
    <Card :article="article"/>
    </div>
  </div>
</template>
