<script setup>
import axios from "axios";
import { onMounted, ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import FollowButton from "../components/FollowButton.vue";
import { useAuthStore } from "../js/store/auth";
import Card from "../components/Card.vue";
import { useArticleStore } from "../js/store/articles";
import { useFollowStore } from "../js/store/follows";
// import { useLikesStore } from "../js/store/likes";

const auth = useAuthStore();
const articles = useArticleStore();

const route = useRoute();
const userId = route.query.userId;
const userName = route.query.userName;

const getArticles = computed(() => {
  return articles.getArticles;
});

const Articles = computed(() => {
  return articles.articles;
});

const follows = useFollowStore();
const getFollowers = computed(() => {
  return follows.getFollowerCount;
});
const getFollowees = computed(() => {
  return follows.getFolloweeCount;
});

onMounted(() => {
  follows.fetchFollowees(userId);
  follows.fetchFollowers(userId);
  articles.fetchArticles();
});
</script>

<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="d-flex flex-row">
        <RouterLink
          :to="{
            name: 'user',
            query: {
              userName:userName,
              userId: userId,
            },
          }"
          class="text-dark"
        >
          <i class="fas fa-user-circle fa-3x"></i>
        </RouterLink>
        <FollowButton
          v-if="auth.isLoggedIn.status && auth.isLoggedIn.userId != userId"
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
        <RouterLink
          :to="{
            name: 'person',
            query: {
              follow: 'followees',
              userName:userName,
              userId: userId,
            },
          }"
          class="text-muted"
        >
          {{ follows.followeeCount }} フォロー
        </RouterLink>
        <RouterLink
          :to="{
            name: 'person',
            query: {
              follow: 'followers',
              userName:userName,
              userId: userId,
            },
          }"
          class="text-muted"
        >
          {{ follows.followerCount }} フォロワー
        </RouterLink>
      </div>
    </div>
  </div>
</template>
