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


const switchArticles = computed(() => {
  if (tabSelect.userArticles) {
    return getArticles.value.filter((article) => article.user.name == userName);
  }
  if (tabSelect.likesArticles) {
    const articles = getArticles.value;
    const likeArticles = articles.map((article) => {
      return article.likes.filter((like) => like.name == userName);
    });

    return likeArticles.flat();
  }
});

console.log(getArticles.value)
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
    {{ switchArticles }}
    <div v-for="article in switchArticles" :key="article.id">
      <Card :article="article" />
    </div>
  </div>
</template>
