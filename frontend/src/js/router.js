import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Article from '../views/Article.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/articles/:articleId',
      component: Article,
      props:true
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/create',
      component: Create,
    },
    {
      path: '/users/:userName',
      component: User,
      name:'user',
      props:true,
    },
    {
      path: '/articles/:articleId/edit',
      component: Edit,
      props:true
    },

  ]
})

export default router
