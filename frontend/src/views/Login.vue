<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import router from "../js/router";
import axios from "axios";


const login = () => {

  const api = axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
  })
  api.get("/sanctum/csrf-cookie")
    .then((res)=>{
      api.post("/api/login",{email,password})
        .then(res=>{
          console.log(res);
        })
    })

  // const requestOptions = {
  //   method:'POST',
  //   // url:'http://localhost:8000/api/login',
  //   withCredentials: true,
  //   headers:{
  //     'Accept':'application/json',
  //     'Content-Type':'application/json',
  //   },
  //   data: JSON.stringify({
  //       email:email,
  //       password:password
  //     })
  // }
  // axios
  //   .get("http://localhost:8000/sanctum/csrf-cookie", {
  //     withCredentials: true,
  //   })
  //   .then((response) => {
  //     axios('http://localhost:8000/login',requestOptions)
  //       .then(res => console.log(res.data));
  //   });
  // fetch('http://localhost:8000/sanctum/csrf-cookie',{
  //   method:'GET',
  //   credentials:"include",
  // })
  // .then(res=>{
  //   fetch('http://localhost:8000/login',{
  //     method:'POST',
  //     mode:'cors',
  //     credentials:"include",
  //     headers:{
  //       'Accept':'application/json',
  //       'Content-type':'application/json',
  //     },
  //     body:JSON.stringify({
  //       email:email,
  //       password:password
  //     })
  //   }).then(res=>router.push('/'));

  // })
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto col col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
        <h1 class="text-center"><a class="text-dark" href="/">memo</a></h1>
        <div class="card mt-3">
          <div class="card-body text-center">
            <h2 class="h3 card-title text-center mt-2">ログイン</h2>
            <div class="card-text">
              <form method="POST" action="">
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
                <button
                  class="btn btn-block blue-gradient mt-2 mb-2"
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
