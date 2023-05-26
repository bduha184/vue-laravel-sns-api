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

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const sendToken = async (provider) => {
  await api.get("/sanctum/csrf-cookie").then(async (res) => {
    await api
      .post(`/api/login/${provider}/callback`, {
        code,
        state,
      })
      .then((res) => {
        if (Object.keys(res.data).length == "1") {
          auth.setUser(true, res.data.user.name);
          router.push("/");
        } else {
          router.push({
            name: "SocialRegister",
            query:{
              provider:res.data.provider,
              email:res.data.email,
              token:res.data.token
            }
          });
        }
      });
  });
};

onMounted(() => {
  sendToken("google");
});
</script>

<template></template>
