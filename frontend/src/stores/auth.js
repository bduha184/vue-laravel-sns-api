import {defineStore} from 'pinia';
import axios from "axios";

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    name:'',
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>state.name,
  },
  actions:{
    setUser(name) {
      this.name = name;
    },
    clearUser(){
      this.name = '';
    },
  }
})
