import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./auth";

export const useFollowStore = defineStore({
  id: "follows",
  state: () => ({
    status: false,
    followerCount: 0,
    followeeCount: 0,
    followees: [],
    followers: [],
  }),
  getters: {
    isFollowedBy: (state) => state.status,
    getFollowees: (state) => state.followees,
    getFollowers: (state) => state.followers,
    getFolloweeCount: (state) => state.followeeCount,
    getFollowerCount: (state) => state.followerCount,
  },
  actions: {
    setFollowStatus(status) {
      this.status = status;
    },
    async fetchFollowers(userName) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      const auth = useAuthStore();
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api
          .get(`/api/user/${userName}/followers`)
          .then((res) => {
            if (res.data != 404) {
              const followers = res.data.followers;
              const isFollowedByAuth = followers.find(
                (follower) => follower.name == auth.isLoggedIn.name
              );
              if (isFollowedByAuth) {
                this.status = true;
              }
              this.followers = followers;
              this.followerCount = Object.keys(followers).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async fetchFollowees(userName) {
      const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await api.get("/sanctum/csrf-cookie").then(async (res) => {
        await api
          .get(`/api/user/${userName}/followees`)
          .then((res) => {
            if (res.data != 404) {
              const followees = res.data.followees;
              this.followees = followees;
              this.followeeCount = Object.keys(followees).length;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  // persist: true,
});
