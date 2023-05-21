<script setup>
import FollowButton from "./FollowButton.vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../js/store/auth";

const auth = useAuthStore();
const props = defineProps({
  follow:Object,
})

</script>

<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="d-flex flex-row">
        <RouterLink
          :to="{
            name: 'user',
            query: {
              userId:  props.follow.id,
            },
          }"
          class="text-dark"
        >
          <i class="fas fa-user-circle fa-3x"></i>
        </RouterLink>
        <FollowButton
        v-if="auth.isLoggedIn.status && auth.isLoggedIn.userId != props.follow.id"
        />
      </div>
      <h2 class="h5 card-title m-0">
        <RouterLink
        :to="{
            name: 'user',
            query: {
              userId:  props.follow.id,
            },
          }"
        class="text-dark">
      </RouterLink>
      {{  props.follow.name }}
      </h2>
    </div>
  </div>
</template>
