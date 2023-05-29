<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import router from "../js/router";
import { useAuthStore } from "../js/store/auth";

const props = defineProps({
  article: Object,
});

const auth = useAuthStore();

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
  <div
    class="ml-auto card-text"
    v-if="
    auth.isLoggedIn.status &&
    auth.isLoggedIn.name == props.article.user.name
    "
  >
    <div>
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
                @click.prevent="destroy(props.article.id)"
              >
                削除する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
