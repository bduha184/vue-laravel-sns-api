<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import router from "../js/router";
import { useArticleStore } from "../js/store/articles";
import { useAuthStore } from "../js/store/auth";
const props = defineProps({
  article: Object,
});

const articlesStore = useArticleStore();
const auth = useAuthStore();
const isLoggedIn = auth.isLoggedIn.status;
const authUser = auth.isLoggedIn.name;
const countLikes = ref(0);

const initialIsLikedBy = ref(false);
const isLikedBy = ref(false);

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const switchIsLikedBy = async () => {
  if (isLoggedIn && authUser != props.article.user.name) {
    await api.get("/sanctum/csrf-cookie").then(async (res) => {
      await api.put(`/api/articles/${props.article.id}/like`).then((res) => {
        isLikedBy.value = true;
        window.location.href="/";
        // router.push('/');

      });
    });
    if (isLikedBy.value) {
      initialIsLikedBy.value = true;
    } else {
      initialIsLikedBy.value = false;
    }
  }
};

const getCountLikes = computed(() => {
  const article = articlesStore.getArticles.find(
    (article) => article.id == props.article.id
  );
  return countLikes.value = Object.keys(article.likes).length;
});

const authLikesArticles = computed(() => {
  const articles = articlesStore.getArticles;
  const likeArticles = articles.flatMap((article) => {
    return article.likes.filter((like) => like.name == auth.isLoggedIn.name);
  });
 return likeArticles.forEach((like) => {
    if (auth.isLoggedIn.status && like.pivot.article_id == props.article.id) {
      isLikedBy.value = true;
    }
  });
});

console.log(getCountLikes.value)
</script>
<template>
  <div>
    <button
      type="button"
      class="btn m-0 p-1 shadow-none"
      @click="switchIsLikedBy"
    >
      <i
        class="fas fa-heart mr-1"
        :class="{
          'red-text ': authLikesArticles || isLikedBy,
          'animated heartBeat fast': initialIsLikedBy,
        }"
      />
    </button>
    <span>
      {{ getCountLikes }}
    </span>
  </div>
</template>
