<script setup>
import { computed, reactive } from "vue";
import { useRoute } from "vue-router";
import Card from "../components/Card.vue";
import { useArticleStore } from "../js/store/articles";
import UserHeader from "../components/UserHeader.vue";

const articles = useArticleStore();
const route = useRoute();
const userName = route.query.userName;

const getArticles = computed(() => {
  return articles.getArticles;
});

const tabSelect = reactive({
  userArticles: true,
  likesArticles: false,
});

const showUserArticles = () => {
  tabSelect.likesArticles = false;
  tabSelect.userArticles = true;
};
const showLikesArticles = () => {
  tabSelect.likesArticles = true;
  tabSelect.userArticles = false;
};

const getLikeArticles = computed(() => {
  const articles = getArticles.value;
  const likeArticlesId = articles.flatMap((article) => {
    return article.likes.map((like) => {
      if(like.name == userName){
        return like.pivot.article_id
      }
    });
  });
  return articles.filter((article)=>{
    for(let likeId of likeArticlesId){
      if(likeId == article.id){
        return article;
      }
    }
  });

});

const switchArticles = computed(() => {
  if (tabSelect.userArticles) {
    return getArticles.value.filter((article) => article.user.name == userName);
  }
  if (tabSelect.likesArticles) {
    return getLikeArticles.value
  }
});


</script>

<template>
  <div class="container">
    <UserHeader />
    <ul class="nav nav-tabs nav-justified mt-3">
      <li class="nav-item">
        <button
          class="nav-link w-100 text-muted"
          :class="{ active: tabSelect.userArticles }"
          @click.prevent="showUserArticles"
        >
          記事
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link w-100 text-muted"
          :class="{ active: tabSelect.likesArticles }"
          @click.prevent="showLikesArticles"
        >
          いいね
        </button>
      </li>
    </ul>
    <div v-for="article in switchArticles" :key="article.id">
      <Card :article="article" />
    </div>
  </div>
</template>
