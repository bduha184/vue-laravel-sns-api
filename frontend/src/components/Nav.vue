<script setup>
import { RouterLink } from 'vue-router'
import axios from 'axios';
import router from '../js/router';
import { useAuthStore } from '../js/auth';
const auth = useAuthStore();

console.log(auth.isLoggedIn.status);

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
</script>
<template>
  <nav class="navbar navbar-expand navbar-dark blue-gradient">
    <RouterLink to="/" class="navbar-brand"><i class="far fa-sticky-note mr-1"></i>memo</RouterLink>

    <ul class="navbar-nav ml-auto">

      <li class="nav-item" v-if="!auth.isLoggedIn.status">
        <RouterLink to="/register" class="nav-link">ユーザー登録</RouterLink>
      </li>

      <li class="nav-item" v-if="!auth.isLoggedIn.status">
        <RouterLink to="/login" class="nav-link" href="">ログイン</RouterLink>
      </li>

      <li class="nav-item"
      v-if="auth.isLoggedIn.status"
      >
        <RouterLink to="/create" class="nav-link" href=""><i class="fas fa-pen mr-1"></i>投稿する</RouterLink>
      </li>
      <li class="nav-item dropdown"
      v-if="auth.isLoggedIn.status"
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
          <RouterLink
            class="dropdown-item"
            :to="`/users/${auth.isLoggedIn.name}`"
          >
          マイページ
          </RouterLink>
          <div class="dropdown-divider"></div>
          <button form="logout-button" class="dropdown-item"
            @click.prevent="logout"
          >
          ログアウト
          </button>
        </div>
      </li>
      <form id="logout-button" method="POST" action=""></form>
    </ul>
  </nav>
</template>

<style scoped>
.navbar .dropdown-menu a{
  display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
}

</style>
