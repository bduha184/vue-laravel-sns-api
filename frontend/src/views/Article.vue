<script setup>
import { reactive,onMounted } from 'vue';
import Card from '../components/Card.vue'
import axios from 'axios';
const props = defineProps({
  articleId:Number
})

const article = reactive({
  id:Number,
  title:String,
  body:String,
  created_at:Number,
  user:Object
})

// const api = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: true,
// });

// const getCountLikes = async ()=> {
//   await api.get('/sanctum/csrf-cookie').then(async (res) => {
//     await api.get(`/api/articles/${props.articleId}`)
//       .then(res=> {
//         console.log(res);
//       })
//   })
// }
// onMounted(()=>{
//   getCountLikes();
// })

const getArticle =  async () => {

const api = axios.create({
  baseURL:"http://localhost:8000",
  withCredentials:true,
})
await api.get("/sanctum/csrf-cookie")
  .then(async (res) => {
    await api.get(`/api/articles/${props.articleId}`)
      .then(res=>{
        article.id = res.data.id;
        article.title = res.data.title;
        article.body = res.data.body;
        article.created_at = res.data.created_at;
        article.user = res.data.user;
      })
      .catch(error=>{
        console.log(error);
      })
  })
}

onMounted(()=> {
  getArticle();
})

</script>

<template>
 <div class="container">
    <Card :article="article"/>
  </div>
</template>
