import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/articles',
      component: Index
    },
    {
      path: '/register',
      component: Register,
      // props:true
    },
  ]
})

export default router
