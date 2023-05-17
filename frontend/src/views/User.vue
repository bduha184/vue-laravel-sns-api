<script setup>
import axios from "axios";
import { onMounted, ref,computed, reactive } from "vue";
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

const tabSelect = reactive({
  userArticles:true,
  likesArticles:false
})

const showUserArticles = ()=> {
  tabSelect.likesArticles = false;
  tabSelect.userArticles = true;
}
const showLikesArticles = ()=> {
  tabSelect.likesArticles = true;
  tabSelect.userArticles = false;
}

const  switchArticles = computed(() => {

  if(tabSelect.userArticles){
    return  getArticles.value.filter(
        article => article.user.name === userName
      );
  }
  if(tabSelect.likesArticles){
    return getArticles.value;
  }

})


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
          class="nav-link w-100 text-muted"
          :class="active:{}"
          @click.prevent="showUserArticles"
          >
          記事
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link w-100 text-muted"
        @click.prevent="showLikesArticles"
        > いいね </button>
      </li>
    </ul>
    <div
    v-for="article in switchArticles"
    :key="article.id"
    >
    <Card :article="article"/>
    </div>
  </div>
</template>
