import {defineStore} from 'pinia';

export const useAuthStore = defineStore({
  id:'auth',
  state:()=> ({
    status:false,
    name:'',
    userId:'',
  }),
  persist: true,
  getters:{
    isLoggedIn:(state)=>({
      name:state.name,
      status:state.status,
      userId:state.userId
    })
  },
  actions:{
    setUser(status,name,userId) {
      this.status = status;
      this.name = name;
      this.userId = userId;
    },
    clearUser(){
      this.status = false;
    },
  }
})
