<script setup>
import Form from "../components/Form.vue";
import { ref,reactive, onMounted, compile, computed } from "vue";
import axios from "axios";
import router from "../js/router";
import { useArticleStore } from "../js/store/articles";


const props = defineProps({
  articleId: Number,
});
const articlesStore = useArticleStore();
const articles = articlesStore.getArticles;
const articleData = ref({})
const getArticle = computed(()=> {
  return articles.find(article => article.id == props.articleId)
})

console.log(getArticle);

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const submit = async (title, body) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api
      .put(`/api/articles/${props.articleId}`, { title, body })
      .then((res) => {
        if (res.status == 200) {
          router.push("/");
        }
      });
  });
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card mt-3">
          <div class="card-body pt-0">
            <div class="card-text">
              <form method="">
                <Form :articleData="articleData" />
                <button
                  type="button"
                  class="btn blue-gradient btn-block"
                  @click="submit(articleData.title, articleData.body)"
                >
                  更新する
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
