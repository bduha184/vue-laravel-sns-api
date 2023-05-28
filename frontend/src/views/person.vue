<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
import { useFollowStore } from "../js/store/follows";
import FollowCard from '../components/FollowCard.vue'
import UserHeader from "../components/UserHeader.vue";

const route = useRoute();
const routeFollow = route.query.follow;
const routeUserName = route.query.userName;


const follows = useFollowStore();
const getFollowers = computed(() => {
  return follows.getFollowers;
});
const getFollowees = computed(() => {
  return follows.getFollowees;
});

onMounted(() => {
  follows.fetchFollowees(routeUserName);
  follows.fetchFollowers(routeUserName);
  propsFollows();
});

const tabSelect = reactive({
  followees: true,
  followers: false,
});

const propsFollows = () => {
   if(routeFollow == 'followees'){
      tabSelect.followees = true;
      tabSelect.followers = false;
    }
   if(routeFollow == 'followers'){
     tabSelect.followers = true;
      tabSelect.followees = false;
    }
}

const showFollowees = () => {
  tabSelect.followees = true;
  tabSelect.followers = false;
};

const showFollowers = () => {
  tabSelect.followers = true;
  tabSelect.followees = false;
};
const switchFollows = computed(() => {

  if (routeFollow == "followees" || tabSelect.followees) {
    if(tabSelect.followers){
      return getFollowers.value;
    }
    return getFollowees.value;
  }
  if (routeFollow == "followers" || tabSelect.followers) {
    if(tabSelect.followees){
      return getFollowees.value;
    }
    return getFollowers.value;
  }
});

</script>
<template>
  <div class="container">
    <UserHeader/>
    <ul class="nav nav-tabs nav-justified mt-3">
      <li class="nav-item">
        <button
          class="nav-link w-100 text-muted"
          :class="{ active: tabSelect.followees}"
          @click.prevent="showFollowees"
        >
        フォロー
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link w-100 text-muted"
          :class="{ active: tabSelect.followers}"
          @click.prevent="showFollowers"
        >
          フォロワー
        </button>
      </li>
    </ul>
    <FollowCard
    v-for="follow in switchFollows"
    :key="follow.id"
    :follow = follow
     />
  </div>
</template>
