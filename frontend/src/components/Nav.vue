<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav class="navbar navbar-expand navbar-dark blue-gradient">
    <RouterLink to="/articles" class="navbar-brand"><i class="far fa-sticky-note mr-1"></i>memo</RouterLink>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <RouterLink to="/register" class="nav-link">ユーザー登録</RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink to="/login" class="nav-link" href="">ログイン</RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink to="/create" class="nav-link" href=""><i class="fas fa-pen mr-1"></i>投稿する</RouterLink>
      </li>

      <!-- Dropdown -->
      <li class="nav-item dropdown">
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
          <button form="logout-button" class="dropdown-item" type="submit">
            ログアウト
          </button>
        </div>
      </li>
      <form id="logout-button" method="POST" action=""></form>
      <!-- Dropdown -->
    </ul>
  </nav>
</template>
