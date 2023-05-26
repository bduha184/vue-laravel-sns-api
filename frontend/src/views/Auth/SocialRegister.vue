<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../js/store/auth";
import router from '../../js/router'

const route = useRoute();
const email = route.query.email;
const token = route.query.token;
const auth = useAuthStore();

const userName = ref('');

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const SocialRegister = async (provider,name,email,token) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post(`api/register/${provider}`, { name, email,token}).then((res) => {
      if (res.data.user != '') {
        auth.setUser(true,res.data.user.name)
        router.push("/");
      }else {

      }
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
            <h2 class="h3 card-title text-center mt-2">ユーザー登録</h2>
            <div class="card-text">
              <form method="POST">
                <input type="hidden" name="token"
                :value="token"
                >
                <div class="md-form">
                  <input class="form-control" type="text" id="name" name="name" required placeholder="ユーザー名"
                  v-model="userName"
                  >
                  <small>英数字3〜16文字(登録後の変更はできません)</small>
                </div>
                <div class="md-form">
                  <input class="form-control" type="text" id="email" name="email" disabled placeholder="メールアドレス"
                  :value="email"
                  >
                </div>
                <button class="btn btn-block blue-gradient mt-2 mb-2"
                @click.prevent="SocialRegister('google',userName,email,token)"

                >ユーザー登録</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
