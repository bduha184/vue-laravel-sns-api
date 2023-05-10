<script setup>
import Form from '../components/Form.vue';
import { ref,onMounted } from 'vue';
import axios from 'axios';
import router from '../js/router';

const articleData = ref([]);
const defaultArticleData = ref([]);

const props = defineProps({
  articleId:Number
})

// const getArticleData = () => {
//   fetch(`http://localhost:8000/api/articles/${props.articleId}`)
//   .then(res=>res.json())
//   .then(data => defaultArticleData.value = data);
// }

// onMounted(()=>{
//   getArticleData();
// })

const submit = async (title,body) => {

  const api = axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true,
  });
  await api.get("/sanctum/csrf-cookie")
  .then(async (res)=> {
      await api.put(`/api/articles/${props.articleId}`,{title,body})
      .then(res => {
        if(res.status == 200){
            router.push('/')
        }
      })
    })
}

</script>

<template>
 <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="card mt-3">
          <div class="card-body pt-0">
            <div class="card-text">
              <form method="">
                <Form
                :articleData="articleData"
                />
                <button type="button" class="btn blue-gradient btn-block"
                @click="submit(articleData.title,articleData.body)"
                >
                更新する
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
