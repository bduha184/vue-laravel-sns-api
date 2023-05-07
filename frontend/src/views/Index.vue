<script setup>
import { ref,onMounted } from 'vue';

import Card from '../components/Card.vue'
const articles = ref([]);

const getArticles =() =>{
  fetch('http://localhost:8000/api/articles')
  .then(res=>res.json())
  .then(data=>articles.value = data)
}
// const getUsers =() =>{
//   fetch('http://localhost:8000/api/users')
//   .then(res=>res.json())
//   .then(data=>users.value = data)
// }

onMounted(()=> {
  getArticles();
  // getUsers();
})


</script>

<template>
 <div class="container">
    <div
    class="card mt-3"
    v-for="article in articles"
    :key="article.id"
    >

    <Card :article="article"/>
    </div>
  </div>
</template>
