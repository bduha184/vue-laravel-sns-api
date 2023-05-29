<script setup>
import { onMounted} from "vue";
import { useRoute } from "vue-router";
import FollowButton from "../components/FollowButton.vue";
import { useAuthStore } from "../js/store/auth";
import { useArticleStore } from "../js/store/articles";
import { useFollowStore } from "../js/store/follows";

const auth = useAuthStore();
const articles = useArticleStore();

const route = useRoute();
const userName = route.query.userName;

const follows = useFollowStore();

onMounted(() => {
  follows.fetchFollowees(userName);
  follows.fetchFollowers(userName);
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
            },
          }"
          class="text-dark"
        >
          <i class="fas fa-user-circle fa-3x"></i>
        </RouterLink>
        <FollowButton
          v-if="auth.isLoggedIn.status && auth.isLoggedIn.name != userName"
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
            },
          }"
          class="text-muted"
        >
          {{ follows.getFolloweeCount }} フォロー
        </RouterLink>
        <RouterLink
          :to="{
            name: 'person',
            query: {
              follow: 'followers',
              userName:userName,
            },
          }"
          class="text-muted"
        >
          {{ follows.getFollowerCount }} フォロワー
        </RouterLink>
      </div>
    </div>
  </div>
</template>
