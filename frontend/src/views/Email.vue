<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../js/router";

const mailAlert = ref('');

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
})
const sendPasswordResetController = async (email) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post("/forgot-password", { email }).then((res) => {
        mailAlert.value = res.data;
    });
  });
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
        <h1 class="text-center"><a class="text-dark" href="/">memo</a></h1>
        <div class="card mt-3">
          <div class="card-body text-center">
            <h2 class="h3 card-title text-center mt-2">パスワード再設定</h2>
            <div class="card-text alert alert-success"
            v-show="mailAlert != ''"
            >
          {{ mailAlert }}
          </div>
            <div class="card-text">
              <form method="POST">
                <div class="md-form">
                  <label for="email">メールアドレス</label>
                  <input
                    class="form-control"
                    type="text"
                    id="email"
                    name="email"
                    required
                    v-model="email"
                  />
                </div>
                <button
                  class="btn btn-block blue-gradient mt-2 mb-2"
                  @click.prevent="sendPasswordResetController(email)"
                >
                  メール送信
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
