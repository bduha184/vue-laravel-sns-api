<script setup>
import UserHeader from "../../components/UserHeader.vue";
import CardVue from "../../components/Card.vue";
import { useRoute } from "vue-router";
import { computed,onMounted } from "vue";
import { useTagsStore } from "../../js/store/tags";

// const articles = useArticleStore();
const route = useRoute();
const routeTagName = route.query.tagName;

const tags = useTagsStore();
const getTagArticles = computed(() => {
  return tags.getTagArticles;
});
// const getArticlesCount = computed(()=> {
//   return getTagArticles.length;
// })

onMounted(() => {
  tags.fetchTag(routeTagName);
});
</script>

<template>
  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <h2 class="h4 card-title m-0">#{{ routeTagName }}</h2>
        <div class="card-text text-right">{{getTagArticles.length}}件</div>
      </div>
    </div>
  <div
  v-for="article in getTagArticles"
  :key="article.id"
  >
    <CardVue :article="article"/>
  </div>
  </div>
</template>
