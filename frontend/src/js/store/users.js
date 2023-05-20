import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore({
  id: "users",
  persist: true,
  state: () => ({
    users:[]
  }),
  getters: {
    getUsers:(state)=>state.users
  },
  actions: {
    async fetchUsers(id) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/users`)
          .then((res) => {
            this.users = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
