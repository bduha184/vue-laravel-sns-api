// import { defineStore } from "pinia";
// import axios from "axios";
// import { useAuthStore } from "./auth";

// export const useLikesStore = defineStore({
//   id: "likes",
//   persist: true,
//   state: () => ({
//       user:'',
//       article:'',
//       like:0
//   }),
//   getters: {
//     getLikesCount: (state) => state.like,
//     // getIsLikedBy: (state) => state.isLikedBy,
//   },
//   actions: {
//     async fetchLikesArticle(id) {
//       const api = axios.create({
//         baseURL: "http://localhost:8000",
//         withCredentials: true,
//       });
//       await api.get("/sanctum/csrf-cookie").then(async (res) => {
//         await api.get(`/api/user/${id}/likes`).then((res) => {
//           const likes = res.data.likes;
//           if(likes){
//             const likesLength = Object.keys(likes).length;
//             // console.log(likes);
//             // console.log(likesLength)
//             likes.forEach(like=> {
//               // console.log(like.pivot);
//               this.user = like.pivot.user_id;
//               this.article = like.pivot.user_id;
//               this.like = likesLength;
//             })
//           }
//         });
//       });
//     },
//   },
// });
