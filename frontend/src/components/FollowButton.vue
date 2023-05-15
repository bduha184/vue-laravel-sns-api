<script setup>
import axios from "axios";
import { computed, reactive, ref } from "vue";
import { useFollowStore } from "../js/store/follow";
import { useAuthStore } from "../js/store/auth";
import { useRoute } from "vue-router";


const route = useRoute();
const follow = useFollowStore();
const auth = useAuthStore();

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const isFollowedBy = ref(follow.isFollowedBy);

const buttonColor = computed(() => {
  return isFollowedBy.value ? "bg-primary text-white" : "bg-white";
});

const buttonIcon = computed(() => {
  return isFollowedBy.value ? "fas fa-user-check" : "fas fa-user-plus";
});

const buttonText = computed(() => {
  return isFollowedBy.value ? "フォロー中" : "フォロー";
});

const changeFollowStatus = async () => {
  if (!isFollowedBy.value) {
    follow.setFollowStatus(true);

    await api.get("/sanctum/csrf-cookie").then(async (res) => {
      await api
        .put(`/api/user/${route.params.userName}/follow`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return (isFollowedBy.value = true);
  } else {
    follow.setFollowStatus(false);
    await api.get("/sanctum/csrf-cookie").then(async (res) => {
      await api
        .delete(`/api/user/${route.params.userName}/follow`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return (isFollowedBy.value = false);
  }
};


const emit = defineEmits(["followStatus"]);
</script>
<template>
  <div>
    <button
      class="btn-sm shadow-none border border-primary p-2"
      :class="buttonColor"
      @click="changeFollowStatus"
    >
      <i class="mr-1" :class="buttonIcon"></i>
      {{ buttonText }}
    </button>
  </div>
</template>
