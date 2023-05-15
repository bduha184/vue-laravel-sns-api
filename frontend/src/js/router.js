import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Article from '../views/Article.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Email from '../views/Email.vue'
import { useAuthStore } from './store/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'index',
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
      name:'create',
      component: Create,
    },
    {
      path: '/email',
      component: Email,
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
      name:'edit',
      props:true
    },

  ]
})

router.beforeEach(to=> {
  const auth = useAuthStore();
  if(!auth.isLoggedIn.status){
    if(to.name == 'create' || to.name == 'edit'){
      return {name:'index'}
    }
  }
})

export default router
