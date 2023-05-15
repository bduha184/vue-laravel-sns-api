<script setup>
import Form from "../components/Form.vue";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import router from "../js/router";

const articleData = ref([]);

const submit = async (title, body,tags) => {
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post("/api/articles", { title, body ,tags}).then((res) => {
      console.log(res.data)
      // if (res.status == 200) {
      //   router.push("/");
      // }
    });
  });
}


</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card mt-3">
          <div class="card-body pt-0">
            <div class="card-text">
              <form method="POST">
                <Form :articleData="articleData" />
                {{ articleData.title }}
                {{ articleData.tags }}
                {{ articleData.body }}
                <button
                  type="button"
                  class="btn blue-gradient btn-block"
                  @click="submit(articleData.title, articleData.body,articleData.tags)"
                >
                  投稿する
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
