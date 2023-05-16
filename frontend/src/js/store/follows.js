import { defineStore } from "pinia";
import axios from "axios";

export const useFollowStore = defineStore({
  id: "follows",
  state: () => ({
    status: false,
    followers: 0,
    followees:0,
  }),
  persist: true,
  getters: {
    isFollowedBy: (state) => state.status,
    getFollowers: (state) => state.followers,
    getFollowees: (state) => state.followees,
  },
  actions: {
    setFollowStatus(status) {
      this.status = status;
    },
    async fetchFollowers(user) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/user/${user}/followers`)
          .then((res) => {
            if (res.status == 200) {
              const followerObject = res.data.followers;
              this.followers = Object.keys(followerObject).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async fetchFollowees(user) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api.get(`/api/user/${user}/followees`)
          .then((res) => {
            if (res.status == 200) {
              const followeeObject = res.data.followees;
              this.followees = Object.keys(followerObject).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
});
