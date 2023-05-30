<script setup>
import Form from "../components/Form.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import router from "../js/router";
import { useArticleStore } from "../js/store/articles";
import { useTagsStore } from "../js/store/tags";

const props = defineProps({
  articleId: Number,
});
const articlesStore = useArticleStore();
const articles = articlesStore.getArticles;

const articleData = ref({})
const getArticle = computed(()=> {
 return articles.find(article => article.id == props.articleId)
})

const getArticleContents = ()=>{
  const tagsObject = getArticle.value.tags;
  const tags = tagsObject.map(
    tag=>tag.name
    )
  articleData.value.title = getArticle.value.title;
  articleData.value.body = getArticle.value.body;
  articleData.value.tags = tags;
}

onMounted(()=>{
  getArticleContents();
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
        console.log(res.data)
        // if (res.status == 200) {
        //   router.push("/");
        // }
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
                {{ articleData.tags }}
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
