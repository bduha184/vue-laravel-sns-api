<script setup>
import { RouterLink } from "vue-router";
import { getDays } from "../js/common";
import ArticleLike from "./ArticleLike.vue";
import CardStatus from "./CardStatus.vue";
import Tags from "./Tags.vue";

const props = defineProps({
  article: Object,
});


</script>

<template>
  <div class="card mt-3">
    <div class="card-body d-flex flex-row">
      <RouterLink
        class="text-dark"
        :to="{
          name: 'user',
          query: {
            userName: props.article.user.name,
          },
        }"
      >
        <i class="fas fa-user-circle fa-3x mr-1"></i>
      </RouterLink>
      <div>
        <RouterLink
          class="text-dark"
          :to="{
            name: 'user',
            query: {
              userName: props.article.user.name,
            },
          }"
        >
          {{ props.article.user.name }}
        </RouterLink>
        <div class="font-weight-lighter">
          {{ getDays(props.article.created_at) }}
        </div>
      </div>
      <CardStatus :article="article"/>
    </div>
    <div class="card-body pt-0">
      <h3 class="h4 card-title">
        <RouterLink
          :to="`/articles/${props.article.id}`"
          class="text-dark"
          href=""
          >{{ props.article.title }}
        </RouterLink>
      </h3>
      <div class="card-text">
        {{ props.article.body }}
      </div>
    </div>
    <div class="card-body pt-0 pb-2 pl-3">
      <div class="card-text">
        <ArticleLike :article="props.article" />
      </div>
    </div>
    <Tags :tags="props.article.tags"/>
  </div>
</template>
