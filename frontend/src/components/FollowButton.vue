<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useFollowStore } from "../js/store/follows";
import { useRoute } from "vue-router";


const route = useRoute();
const routeUserName = route.query.userName;
const follow = useFollowStore();

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

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const changeFollowStatus = async () => {
  if (!isFollowedBy.value) {
    follow.setFollowStatus(true);

    await api.get("/sanctum/csrf-cookie").then(async (res) => {
      await api
        .put(`/api/user/${routeUserName}/follow`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return isFollowedBy.value = true;
  } else {
    follow.setFollowStatus(false);
    await api.get("/sanctum/csrf-cookie").then(async (res) => {
      await api
        .delete(`/api/user/${routeUserName}/follow`)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return isFollowedBy.value = false;
  }
};

</script>
<template>
  <div class="ml-auto">
    <button
      class="btn-sm shadow-none border border-dark p-2"
      :class="buttonColor"
      @click="changeFollowStatus"
    >
      <i class="mr-1" :class="buttonIcon"></i>
      {{ buttonText }}
    </button>
  </div>
</template>
