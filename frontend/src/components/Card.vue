<script setup>
import axios from "axios";
import {  onMounted, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { getDays } from "../js/common";
import router from "../js/router";
import { useAuthStore } from "../js/auth";
import ArticleLike from "./ArticleLike.vue";
const auth = useAuthStore();

const props = defineProps({
  article: Object,
});
// console.log(auth.isLoggedIn.status)

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
const destroy = async (id) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.delete(`/api/articles/${id}`).then((res) => {
      if (res.status == 200) {
        router.push("/");
      }
    });
  });
};

</script>

<template>
  <div class="card mt-3">
    <div class="card-body d-flex flex-row">
      <RouterLink
        class="text-dark"
        :to="{
          name: 'user',
          params: { userName: props.article.user.name },
        }"
      >
        <i class="fas fa-user-circle fa-3x mr-1"></i>
      </RouterLink>
      <div>
        <RouterLink
          class="text-dark"
          :to="{
            name: 'user',
            params: { userName: props.article.user.name },
          }"
        >
          {{ props.article.user.name }}
        </RouterLink>
        <div class="font-weight-lighter">
          {{ getDays(props.article.created_at) }}
        </div>
      </div>
      <div
        class="ml-auto card-text"
        v-if="
          auth.isLoggedIn.status &&
          auth.isLoggedIn.name === props.article.user.name
        "
      >
        <div class="dropdown">
          <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <RouterLink
              :to="`/articles/${props.article.id}/edit`"
              class="dropdown-item"
            >
              <i class="fas fa-pen mr-1"></i>記事を更新する
            </RouterLink>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item text-danger"
              data-toggle="modal"
              :data-target="`#modal-delete-${props.article.id}`"
            >
              <i class="fas fa-trash-alt mr-1"></i>記事を削除する
            </a>
          </div>
        </div>
      </div>
      <div
        :id="`modal-delete-${props.article.id}`"
        class="modal fade"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="閉じる"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form method="POST">
              <div class="modal-body">を削除します。よろしいですか？</div>
              <div class="modal-footer justify-content-between">
                <a class="btn btn-outline-grey" data-dismiss="modal"
                  >キャンセル</a
                >
                <button
                  class="btn btn-danger"
                  type="button"
                  @click="destroy(props.article.id)"
                >
                  削除する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    <div class="card-body pt-0 pb-4 pl-3"
    v-for="tag in props.article.tags"
    :key="tag.id"
    >
        <div class="card-text line-height">
          <a href="" class="border p-1 mr-1 mt-1 text-muted">
            #{{ tag.name }}
          </a>
        </div>
      </div>
    <RouterView />
  </div>
</template>
