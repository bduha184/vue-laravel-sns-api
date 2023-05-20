import { defineStore } from "pinia";
import axios from "axios";

export const useFollowStore = defineStore({
  id: "follows",
  state: () => ({
    status: false,
    followerCount: 0,
    followeeCount:0,
    followees:[],
    followers:[],
  }),
  persist: true,
  getters: {
    isFollowedBy: (state) => state.status,
    getFollowees: (state) => state.followees,
    getFollowers: (state) => state.followers,
    getFollowerCount: (state) => state.followerCount,
    getFolloweeCount: (state) => state.followeeCount,
  },
  actions: {
    setFollowStatus(status) {
      this.status = status;
    },
    async fetchFollowers(userId) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/user/${userId}/followers`)
          .then((res) => {
            if (res.status == 200) {
              const followers = res.data.followers;
              this.followers = followers;
              this.followerCount = Object.keys(followers).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async fetchFollowees(userId) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/user/${userId}/followees`)
          .then((res) => {
            if (res.status == 200) {
              const followees = res.data.followees;
              this.followees= followees;
              this.followeeCount = Object.keys(followees).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
