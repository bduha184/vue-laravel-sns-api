<script setup>
import { ref, onMounted, computed } from "vue";
import {useRoute } from "vue-router";
import router from "../js/router";
import axios from "axios";
import { useAuthStore } from "../js/store/auth";

const auth = useAuthStore();
const route = useRoute();

const mailAlert = ref('')

const token = route.query.token;
const email = route.query.email;
const password = ref('');
const passwordConfirmation = ref('');

const api = axios.create({
  baseURL:'http://localhost:8000',
  withCredentials:true,
})
const sendResetPassword = async(token,email,password,password_confirmation) => {
  if(password.value == '' || passwordConfirmation.value == '') {
    mailAlert.value = 'パスワードを入力してください'
    return false
  }
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.post('/reset-password',{token,email,password,password_confirmation}).then((res) => {
     mailAlert.value = res.data.status;
     console.log(res.data);
    //  auth.setUser(true,res.data.)
    //  router.push('/');
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
           <h2 class="h3 card-title text-center mt-2">新しいパスワードを設定</h2>
           <div class="card-text alert alert-success"
            v-show="mailAlert != ''"
            >
          {{ mailAlert }}
          </div>
           <div class="card-text">
              <form method="POST">
                <div class="md-form">
                  <label for="password">新しいパスワード</label>
                  <input
                  class="form-control" type="password" id="password" name="password" required
                  v-model="password"
                  >
                </div>

                <div class="md-form">
                  <label for="password_confirmation">新しいパスワード(再入力)</label>
                  <input class="form-control" type="password" id="password_confirmation" name="password_confirmation" required
                  v-model="passwordConfirmation"
                  >
                </div>

                <button
                @click.prevent="sendResetPassword(token,email,password,passwordConfirmation)"
                class="btn btn-block blue-gradient mt-2 mb-2" type="submit">
                送信
              </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
