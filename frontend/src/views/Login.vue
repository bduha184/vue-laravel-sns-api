<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import router from "../js/router";
import axios from "axios";
import { useAuthStore } from "../js/store/auth";

const auth = useAuthStore();
const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const login = async (email, password) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post("/api/login", { email, password }).then((res) => {
      if (res.status == 200) {
        auth.setUser(true, res.data.name, res.data.id);
        router.push("/");
      }
    });
  });
};

const googleLogin = async () => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.get("/api/login/google").then((res) => {
      console.log(res);
    });
  });
}

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
        <h1 class="text-center"><a class="text-dark" href="/">memo</a></h1>
        <div class="card mt-3">
          <div class="card-body text-center">
            <h2 class="h3 card-title text-center mt-2">ログイン</h2>
            <button
              class="btn btn-block btn-danger"
              @click.prevent="googleLogin"
            >
              <i class="fab fa-google mr-1"></i>Googleでログイン
            </button>
            <div class="card-text">
              <form method="POST">
                <input type="hidden" name="_token" :value="qwer12345" />
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

                <div class="md-form">
                  <label for="password">パスワード</label>
                  <input
                    class="form-control"
                    type="password"
                    id="password"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
                <input type="hidden" name="remember" id="remember" value="on" />
                <div class="text-left">
                  <RouterLink class="card-text" to="/email">
                    パスワードを忘れた方
                  </RouterLink>
                </div>
                <button
                  class="btn btn-block blue-gradient mt-2 mb-2"
                  type="button"
                  @click="login(email, password)"
                >
                  ログイン
                </button>
              </form>
              <div class="mt-0">
                <RouterLink to="/register" class="card-text"
                  >ユーザー登録はこちら</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
