<script setup>
import axios from "axios";
import { onMounted, ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import Card from "../components/Card.vue";
import { useArticleStore } from "../js/store/articles";
import UserHeader from "../components/UserHeader.vue";

const articles = useArticleStore();

const route = useRoute();
const userId = route.query.userId;

const getArticles = computed(() => {
  return articles.getArticles;
});
const Articles = computed(() => {
  return articles.articles;
});

onMounted(() => {
  likesArticles();
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

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const likesArticle = ref({});

const likesArticles = async () => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.get(`/api/user/${userId}/likes`).then((res) => {
      likesArticle.value = res.data.flat();
      });
  });
};

const switchArticles = computed(() => {
  if (tabSelect.userArticles) {
    return getArticles.value.filter((article) => article.user_id == userId);
  }
  if (tabSelect.likesArticles) {
    return likesArticle.value;
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
