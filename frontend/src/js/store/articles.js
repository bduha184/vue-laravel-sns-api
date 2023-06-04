import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore({
  id: "articles",
  // persist: true,
  state: () => ({
    articles: [],
    getArticlesCount:0,
  }),
  getters: {
    getArticles: (state) => state.articles,
  },
  actions: {
    async fetchArticles() {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api
        .get(`/api/articles/${this.getArticlesCount}`)
        .then((res) => {
           const fetchArticles = res.data;
          this.articles.push(...fetchArticles);
        })
        .catch((error) => {
          console.log(error);
        });
        this.getArticlesCount++;
    },
  },
});
