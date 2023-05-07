import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Login from '../views/Login.vue'

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
    {
      path: '/login',
      component: Login,
      // props:true
    },
    {
      path: '/create',
      component: Create,
      // props:true
    },
  ]
})

export default router
