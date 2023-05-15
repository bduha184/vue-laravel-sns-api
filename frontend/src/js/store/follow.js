import {defineStore} from 'pinia';


export const useFollowStore = defineStore({
  id:'follow',
  state:()=>({
    status:false,
  }),
  persist:true,
  getters:{
    isFollowedBy:(state)=>(state.status)
  },
  actions:{
    setFollowStatus(status){
      this.status = status;
    }
  }
})
