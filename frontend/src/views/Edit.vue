<script setup>
import Form from "../components/Form.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "../js/router";
import { useArticleStore } from "../js/store/articles";


const props = defineProps({
  articleId: Number,
});
const articlesStore = useArticleStore();
const articles = articlesStore.getArticles;

const articleData = ref([])
const getArticle = ()=> {
 const targetArticle = articles.find(article => article.id == props.articleId)

 articleData.value.title = targetArticle.title;
 articleData.value.tags = targetArticle.tags;
 articleData.value.body = targetArticle.body;
}

onMounted(()=>{
  getArticle();
})

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const submit = async (title, tags,body) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api
      .put(`/api/articles/${props.articleId}`, { title,tags, body })
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
                  @click="submit(articleData.title, articleData.tags,articleData.body)"
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
