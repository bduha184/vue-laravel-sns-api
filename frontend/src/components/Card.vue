<script setup>
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { getDays } from "../js/common";
import router from "../js/router";
import { useAuthStore } from "../stores/auth";
import ArticleLike from "./ArticleLike.vue";
const auth = useAuthStore();

defineProps({
  article: Object,
});
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
        name:'user',
        params:{userName:article.user.name}
      }"
      >
      <i class="fas fa-user-circle fa-3x mr-1"></i>
    </RouterLink>
    <div>
      <RouterLink
      class="text-dark"
      :to="{
        name:'user',
        params:{userName:article.user.name}
      }"
        >
          {{ article.user.name }}
        </RouterLink>
        <div class="font-weight-lighter">{{ getDays(article.created_at) }}</div>
      </div>

      <div class="ml-auto card-text"
      v-if="auth.isLoggedIn === article.user.name"
      >
        <div class="dropdown">
          <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <RouterLink
              :to="`/articles/${article.id}/edit`"
              class="dropdown-item"
            >
              <i class="fas fa-pen mr-1"></i>記事を更新する
            </RouterLink>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item text-danger"
              data-toggle="modal"
              :data-target="`#modal-delete-${article.id}`"
            >
              <i class="fas fa-trash-alt mr-1"></i>記事を削除する
            </a>
          </div>
        </div>
      </div>
      <div
        :id="`modal-delete-${article.id}`"
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
                  @click="destroy(article.id)"
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
        <RouterLink :to="`/articles/${article.id}`" class="text-dark" href=""
          >{{ article.title }}
        </RouterLink>
      </h3>
      <div class="card-text">
        {{ article.body }}
      </div>
    </div>
    <div class="card-body pt-0 pb-2 pl-3">
    <div class="card-text">
      <ArticleLike
        :initial-is-liked-by="auth.isLoggedIn !== ''"
      />
    </div>
  </div>
    <RouterView />
  </div>
</template>
