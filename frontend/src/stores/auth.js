import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    user:null,
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>state.user,

  },
  actions:{
    setUser(user) {
      this.user = user;
    },
    clearUser(){
      this.user = null;
    }
  }
})
