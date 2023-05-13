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
      name:state.name,
      status:state.status
    })
  },
  actions:{
    setUser(status,name) {
      this.status = status;
      this.name = name;
    },
    clearUser(){
      this.name = '';
      this.status = false;
    },
  }
})
