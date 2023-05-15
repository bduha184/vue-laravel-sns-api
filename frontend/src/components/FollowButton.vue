<script setup>
import { computed,reactive,ref } from "vue";
import {useFollowStore} from '../js/store/follow';

const follow = useFollowStore();

console.log(follow.isFollowedBy);

const isFollowedBy = ref(false);

const buttonColor = computed(()=> {
    return isFollowedBy.value
    ? 'bg-primary text-white'
    : 'bg-white'
})

const buttonIcon = computed(()=> {
    return isFollowedBy.value
    ? 'fas fa-user-check'
    : 'fas fa-user-plus'
})

const buttonText= computed(()=> {
    return isFollowedBy.value
    ? 'フォロー中'
    : 'フォロー'
})

const changeFollowStatus = () => {
  if(!isFollowedBy.value) {
    follow.setFollowStatus(false);
    // return isFollowedBy.value = false;
  }else {
    follow.setFollowStatus(true);
    // return isFollowedBy.value = true;
 }
}

// const emit = defineEmits(['followStatus']);



</script>
<template>

  <div>
    <button
      class="btn-sm shadow-none border border-primary p-2"
      :class="buttonColor"
      @click="changeFollowStatus()"
    >
      <i
        class="mr-1"
        :class="buttonIcon"
      ></i>
      {{ buttonText }}
    </button>
  </div>
</template>
