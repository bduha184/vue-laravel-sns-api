<script setup>
import Card from "../../components/Card.vue";
import { useRoute } from "vue-router";
import { computed,onMounted } from "vue";
import { useTagsStore } from "../../js/store/tags";

const route = useRoute();
const routeTagName = route.query.tagName;

const tags = useTagsStore();
const getTagArticles = computed(() => {
  return tags.getTagArticles;
});

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
    <Card :article="article"/>
  </div>
  </div>
</template>
