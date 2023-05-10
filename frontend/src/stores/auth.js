import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    // user:null,
    email:'',
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>state.email,
  },
  actions:{
    setUser(email) {
      this.email = email;
    },
    clearUser(){
      this.email = '';
    }
  }
})
