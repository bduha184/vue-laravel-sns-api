<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../js/auth";
const props = defineProps({
  article: Object,
});

const auth = useAuthStore();
let isLoggedIn = auth.isLoggedIn.status;

const countLikes = ref(0);

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const initialIsLikedBy = ref(false);
const isLikedBy = ref(false);

const switchIsLikedBy = async () => {
await api.get("/sanctum/csrf-cookie").then(async (res) => {
  await api.put(`/api/articles/${props.article.id}/like`)
    .then(res=> {
      console.log(res.data);
    })
});
  if (isLoggedIn && auth.isLoggedIn.userId !== props.article.user.id) {
    if(!isLikedBy.value){
      initialIsLikedBy.value = true;
    }else {
      initialIsLikedBy.value = false;
    }
    isLikedBy.value = true;
  } else {
    isLikedBy.value = false;
  }
};

const getCountLikes = async () => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api.get(`/api/articles/${props.article.id}`).then((res) => {
      if (res.data.likes) {
        const likes = res.data.likes;
        likes.forEach((like) => {
          if (auth.isLoggedIn.status && auth.isLoggedIn.userId === like.id) {
            isLikedBy.value = true;
          }
        });
        countLikes.value = res.data.likes.length;
      }
    });
  });
};

onMounted(() => {
  getCountLikes();
});
</script>
<template>
  <div>
    <button type="button" class="btn m-0 p-1 shadow-none" @click="switchIsLikedBy">
      <i
        class="fas fa-heart mr-1"
        :class="{ 'red-text ': isLikedBy,'animated heartBeat fast':initialIsLikedBy }"
      />
    </button>
    <span>
      {{ countLikes }}
    </span>
  </div>
</template>
