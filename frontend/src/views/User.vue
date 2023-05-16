<script setup>
import axios from "axios";
import { onMounted, ref,computed } from "vue";
import { useRoute } from "vue-router";
import FollowButton from "../components/FollowButton.vue";
import { useAuthStore } from "../js/store/auth";
import Card from "../components/Card.vue";
import { useArticleStore } from "../js/store/articles";
import { useFollowStore } from "../js/store/follows";

const auth = useAuthStore();
const route = useRoute();
const userName = route.params.userName;

const articles = useArticleStore();
const getArticles = computed(()=> {
  return articles.getArticles;
})
const Articles = computed(()=>{
  return articles.articles
})

const follows = useFollowStore();
const getFollowers = computed(()=> {
  return follows.getFollowers;
})
const getFollowees = computed(()=> {
  return follows.getFollowees;
})

onMounted(() => {
  follows.fetchFollowees(userName);
  follows.fetchFollowers(userName);
  articles.fetchArticles();
});

// const showUserArticles = computed(() => {

//     const userArticles =  getArticles.filter(article => {
//       article.user.name === userName
//     });

//     return userArticles;
// })


</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex flex-row">
          <a href="" class="text-dark">
            <i class="fas fa-user-circle fa-3x"></i>
          </a>
          <FollowButton
            class="ml-auto"
            v-if="auth.isLoggedIn.status && auth.isLoggedIn.name !== userName"
          />
        </div>
        <h2 class="h5 card-title m-0">
          <a href="" class="text-dark">
            {{ userName }}
          </a>
        </h2>
      </div>
      <div class="card-body">
        <div class="card-text">
          <a href="" class="text-muted"> {{ follows.followees }} フォロー </a>
          <a href="" class="text-muted"> {{ follows.followers }} フォロワー </a>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs nav-justified mt-3">
      <li class="nav-item">
        <button
          class="nav-link text-muted active"
          @click.prevent="showUserArticles"
        >
          記事
        </button>
      </li>
      <li class="nav-item">
        <a class="nav-link text-muted" href=""> いいね </a>
      </li>
    </ul>
    <div
    v-for="article in getArticles"
    :key="article.id"
    >
    <Card :article="article"/>
    </div>
  </div>
</template>
