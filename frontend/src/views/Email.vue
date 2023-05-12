<script setup>
import { ref } from "vue";
import axios from 'axios';
import router from "../js/router";

const data = ref({});

const sendPasswordController = async (email) => {
  const api = axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
  })
  await api.get("/sanctum/csrf-cookie")
    .then(async (res) => {
      await api.post("/forgot-password",email)
      .then(res=>{
        console.log(res);
        if(res.status == 200) {
          // router.push('/')
          }
        })
        // .catch(error=>{
        //   console.log(error);
        // })
    })
}

</script>

<template>
 <div class="container">
    <div class="row">
      <div class="mx-auto col col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
        <h1 class="text-center"><a class="text-dark" href="/">memo</a></h1>
        <div class="card mt-3">
          <div class="card-body text-center">
            <h2 class="h3 card-title text-center mt-2">パスワード再設定</h2>
              <div
              class="card-text alert alert-success"
              >
              </div>
            <div class="card-text">
              <form method="POST">
                <div class="md-form">
                  <label for="email">メールアドレス</label>
                  <input class="form-control" type="text" id="email" name="email" required
                  v-model="data.email"
                  >
                </div>
                <button
                class="btn btn-block blue-gradient mt-2 mb-2"
                type="button"
                @click="sendPasswordController(data.email)"
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
