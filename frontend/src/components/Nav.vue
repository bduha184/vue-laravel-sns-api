<script setup>
import { RouterLink } from 'vue-router'
import axios from 'axios';
import router from '../js/router';
import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();

const logout = async () => {
  const api = axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
  })
  await api.get("/sanctum/csrf-cookie")
    .then(async (res) => {
      await api.post("/api/logout")
      .then(res=>{
        if(res.status == 200) {
          auth.clearUser()
          router.push('/')
          }
        })
        .catch(error=>{
          console.log(error);
        })
    })
}

// const isLoggedIn = computed(()=> {
//   return
// })

</script>
<template>
  <nav class="navbar navbar-expand navbar-dark blue-gradient">
    <RouterLink to="/" class="navbar-brand"><i class="far fa-sticky-note mr-1"></i>memo</RouterLink>

    <ul class="navbar-nav ml-auto">

      <li class="nav-item" v-if="!auth.isLoggedIn">
        <RouterLink to="/register" class="nav-link">ユーザー登録</RouterLink>
      </li>

      <li class="nav-item" v-if="!auth.isLoggedIn">
        <RouterLink to="/login" class="nav-link" href="">ログイン</RouterLink>
      </li>

      <li class="nav-item"
      v-if="auth.isLoggedIn"
      >
        <RouterLink to="/create" class="nav-link" href=""><i class="fas fa-pen mr-1"></i>投稿する</RouterLink>
      </li>
      <li class="nav-item dropdown"
      v-if="auth.isLoggedIn"
      >
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-user-circle"></i>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right dropdown-primary"
          aria-labelledby="navbarDropdownMenuLink"

        >
          <button
            class="dropdown-item"
            type="button"
            onclick="location.href=''"
          >
            マイページ
          </button>
          <div class="dropdown-divider"></div>
          <button form="logout-button" class="dropdown-item"
          type="button"
            @click="logout"
          >
            ログアウト
          </button>
        </div>
      </li>
      <form id="logout-button" method="POST" action=""></form>
    </ul>
  </nav>
</template>
