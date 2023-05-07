<script setup>
import { ref,onMounted,computed } from 'vue';
import { RouterLink } from 'vue-router';
import router from '../js/router';

const submit = (email,password) =>{
  fetch('sanctum/csrf-cookie',{
    // method:'GET',
    credentials:"include"
  })
  .then(res=>{
    fetch('localhost:8000/login',{
      method:'POST',
      mode:'cors',
      credentials:"include",
      headers:{
        "X-CSRF-TOKEN":'qwer12345',
        // "X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        "Content-type":"application/json",
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>router.push('/'));

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
            <h2 class="h3 card-title text-center mt-2">ログイン</h2>
            <div class="card-text">
              <form method="POST" action="">
                <input type="hidden" name="_token" :value="qwer12345">
                <div class="md-form">
                  <label for="email">メールアドレス</label>
                  <input class="form-control" type="text" id="email" name="email" required
                  v-model="email"
                  >
                </div>

                <div class="md-form">
                  <label for="password">パスワード</label>
                  <input class="form-control" type="password" id="password" name="password" required
                  v-model="password"
                  >
                </div>
                <input type="hidden" name="remember" id="remember" value="on">
                <button  class="btn btn-block blue-gradient mt-2 mb-2" type="submit"
                  @click="submit(email,password)"
                >
                ログイン
              </button>
              </form>
              <div class="mt-0">
                <RouterLink to="/register" class="card-text">ユーザー登録はこちら</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
