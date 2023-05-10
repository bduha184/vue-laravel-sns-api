<script setup>
import Form from "../components/Form.vue";
import { ref } from "vue";
import axios from "axios";
import router from "../js/router";

const articleData = ref([]);

const submit = async (title, body) => {
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post("/api/articles", { title, body }).then((res) => {
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
              <form method="POST">
                <Form :articleData="articleData" />
                <button
                  type="button"
                  class="btn blue-gradient btn-block"
                  @click="submit(articleData.title, articleData.body)"
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
