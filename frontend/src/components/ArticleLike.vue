<script setup>
import axios from 'axios'
import { onMounted } from 'vue'

const props = defineProps({
  initialIsLikedBy:{
    type:Boolean,
    default:false
  },
})
const api = axios.create({
  baseURL:"http://localhost:8000",
  withCredentials:true,
})

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


// public function isLikedBy(?User $user) {
//         return $user
//         ? (bool)$this->likes->where('id',$user->id)->count()
//         : false;
//     }

//     public function getCountLikesAttribute():int {
//         return $this->likes->count();
//     }

</script>
  <template>
  <div>
    <button
      type="button"
      class="btn m-0 p-1 shadow-none"
    >
      <i class="fas fa-heart mr-1"
      :class="{'red-text':initialIsLikedBy}"
      />
    </button>

  </div>
</template>
