import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    status:false,
    name:'',
    // userId:'',
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>({
      status:state.status,
      name:state.name,
      // userId:state.userId
    })
  },
  actions:{
    setUser(status,name) {
      this.status = status;
      this.name = name;
      // this.userId = userId;
    },
    clearUser(){
      this.status = false;
    },
  }
})
