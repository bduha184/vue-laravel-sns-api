<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import FollowButton from '../components/FollowButton.vue';
import { useAuthStore } from '../js/store/auth';
const auth = useAuthStore();
const route = useRoute();

const userName = route.params.userName;

const api = axios.create({
  baseURL:'http://localhost:8000',
  withCredentials:true
})
const followers = ref(0);
const followees = ref(0);

const getFollowersCount = async () => {
  await api.get("/sanctum/csrf-cookie")
    .then(async (res) => {
      await api.get(`/api/user/${route.params.userName}/followers`)
      .then(res=>{
        const followerObject = res.data.followers;
        if(res.status == 200) {
          followers.value = Object.keys(followerObject).length;
        }
      })
      .catch(error=>{
        console.log(error);
      })
    })
  }

  const getFolloweesCount = async () => {
    await api.get("/sanctum/csrf-cookie")
    .then(async (res) => {
      await api.get(`/api/user/${route.params.userName}/followees`)
      .then(res=>{
        const followeeObject = res.data.followees;
        if(res.status == 200) {
          followees.value = Object.keys(followeeObject).length;
          }
        })
        .catch(error=>{
          console.log(error);
        })
    })
}

const changeFollowStatus = () => {

}

onMounted(()=> {
  getFollowersCount();
  getFolloweesCount();
})

</script>

<template>
 <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex flex-row">
          <a href="" class="text-dark">
            <i class="fas fa-user-circle fa-3x"></i>
          </a>
          <FollowButton class="ml-auto"
          v-if="auth.isLoggedIn.status && auth.isLoggedIn.name !== userName"
          />
        </div>
        <h2 class="h5 card-title m-0">
          <a href="" class="text-dark">
                {{userName}}
          </a>
        </h2>
      </div>
      <div class="card-body">
        <div class="card-text">
          <a href="" class="text-muted">
            {{ followees }} フォロー
          </a>
          <a href="" class="text-muted">
            {{ followers }} フォロワー
          </a>
        </div>
      </div>
    </div>
  </div>

</template>
