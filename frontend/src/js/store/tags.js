import { defineStore } from "pinia";
import axios from "axios";

export const useTagsStore = defineStore({
  id: "tags",
  persist: true,
  state: () => ({
    tagArticles:[]
  }),
  getters: {
    getTagArticles:(state)=>state.tagArticles
  },
  actions: {
    async fetchTag(name) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/tags/${name}`)
          .then((res) => {
            this.tagArticles = res.data.flat();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
