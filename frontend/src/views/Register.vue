<script setup>
import { ref } from 'vue';
import router from '../js/router';

const user = ref({});

const submit = (name,email,password) => {
  fetch('http://localhost:8000/api/users',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({
      name:name,
      email:email,
      password:password
    })
  }).then(res=>router.push('./index'));
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
              <form method="POST" action="">
                <div class="md-form">
                  <label for="name">ユーザー名</label>
                  <input
                  class="form-control" type="text" id="name" name="name" required
                  v-model="user.name"
                  >
                  <small>英数字3〜16文字(登録後の変更はできません)</small>
                </div>
                <div class="md-form">
                  <label for="email">メールアドレス</label>
                  <input class="form-control" type="text" id="email" name="email" required
                  v-model="user.email"
                  >
                </div>
                <div class="md-form">
                  <label for="password">パスワード</label>
                  <input class="form-control" type="password" id="password" name="password" required>
                </div>
                <div class="md-form">
                  <label for="password_confirmation">パスワード(確認)</label>
                  <input class="form-control" type="password" id="password_confirmation" name="password_confirmation" required
                  v-model="user.password"
                  >
                </div>
                <button
                class="btn btn-block blue-gradient mt-2 mb-2"
                @click="submit(user.name,user.email,user.password)"
                >
                ユーザー登録
              </button>
              </form>
              <div class="mt-0">
                <a href="" class="card-text">ログインはこちら</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
