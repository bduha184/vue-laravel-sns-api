<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../../js/router";
import { useAuthStore } from "../../js/store/auth";

const auth = useAuthStore();
const route = useRoute();

const code = route.query.code;
const state = route.query.state;

const api =axios.create({
  baseURL:'http://localhost:8000',
  withCredentials:true,
})




const sendToken = async(provider) => {
  await api.get("/sanctum/csrf-cookie")
  .then(async (res)=> {
      await api.post(`/api/login/${provider}/callback`,
      {
          code,
          state,
      })
      .then(res => {
        console.log(res.data);
        auth.setUser(true, res.data.name, res.data.id);
        router.push("/");
        // if (res.data == "200") {
        // } else {
        //   // const token = res.data.token;
        //   // localStorage.setItem("auth", token);
        //   router.push("/login");
        // }
      })
    })
}

onMounted(()=> {
  sendToken('google');
})
</script>

<template>
</template>
