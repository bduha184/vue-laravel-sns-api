import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    status:false,
    name:'',
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>({
      status:state.status,
      name:state.name,
    })
  },
  actions:{
    setUser(status,name) {
      this.status = status;
      this.name = name;
    },
    clearUser(){
      this.status = false;
    },
  }
})
