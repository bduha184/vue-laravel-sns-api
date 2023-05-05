<script setup>
import { ref,onMounted } from 'vue';

const articles = ref([]);

const getArticles =() =>{
  fetch('http://localhost:8000/api/articles')
  .then(res=>res.json())
  .then(data=>articles.value = data)
}

onMounted(()=> {
  getArticles();
})


</script>

<template>
 <div class="container">
    <div
    class="card mt-3"
    v-for="article in articles"
    :key="article.id"
    >
      <div class="card-body d-flex flex-row">
        <i class="fas fa-user-circle fa-3x mr-1"></i>
        <div>
          <div class="font-weight-bold">
            {{ article.user.name }}
          </div>
          <div class="font-weight-lighter">
            {{ article.created_at }}
          </div>
        </div>
      </div>
      <div class="card-body pt-0 pb-2">
        <h3 class="h4 card-title">
          {{ article.title }}
        </h3>
        <div class="card-text">
          {{ article.body }}
        </div>
      </div>
    </div>
  </div>
</template>
