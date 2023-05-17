// import { defineStore } from "pinia";
// import axios from "axios";
// import { useAuthStore } from "./auth";

// export const useLikesStore = defineStore({
//   id: "likes",
//   persist: true,
//   state: () => ({
//     likes: [],
//     isLikedBy:[],
//   }),
//   getters: {
//     getLikesCount: (state) => state.likes,
//     getIsLikedBy: (state) => state.isLikedBy,
//   },
//   actions: {
//     async fetchLikesCount(id) {
//       const api = axios.create({
//         baseURL: "http://localhost:8000",
//         withCredentials: true,
//       });
//       await api.get("/sanctum/csrf-cookie").then(async (res) => {
//         await api.get(`/api/articles/${id}`).then((res) => {
//           const likes = res.data.likes;
//           if(likes){
//             const auth = useAuthStore();
//             likes.forEach((like) => {
//               if(like){
//                 // console.log('not empty:',like)
//                 if (auth.isLoggedIn.status && auth.isLoggedIn.userId === like.id) {
//                   this.isLikedBy.push('true')
//                 }else {
//                   isLikedBy=false;
//                 }

//               }
//               this.likes = likes.length;
//             });
//           }
//         });
//       });
//     },
//   },
// });
