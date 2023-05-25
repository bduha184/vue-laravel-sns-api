<script setup>
import axios from "axios";
import { onMounted } from "vue";
import router from "../../js/router";

const api =axios.create({
  baseURL:'http://localhost:8000',
  withCredentials:true,
})



const sendToken = async() => {
  await api.get("/sanctum/csrf-cookie")
  .then(async (res)=> {
      await api.post("http://localhost:8000/login/google/callback",
      {
          code,
          state,
      })
      .then(res => {
        console.log(res);
        if (res.data.status_code === "404") {
          router.push("/login");
        } else {
          const token = res.data.access_token;
          localStorage.setItem("auth", token);
          router.push("/");
        }
      })
    })
}

onMounted(()=> {
  sendToken();
})
</script>

<template>
<div class="">test</div>
</template>
