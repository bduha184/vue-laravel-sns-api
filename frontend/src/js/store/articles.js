import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore({
  id: "articles",
  persist: true,
  state: () => ({
    articles:[]
  }),
  getters: {
    getArticles:(state)=>state.articles
  },
  actions: {
    async fetchArticles() {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/articles/`)
          .then((res) => {
            this.articles = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
