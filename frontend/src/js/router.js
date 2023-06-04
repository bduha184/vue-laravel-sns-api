import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Article from '../views/Article.vue'
import Register from '../views/Register.vue'
import Create from '../views/Create.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Email from '../views/EmailForPasswordReset.vue'
import Person from '../views/person.vue'
import Tag from '../views/Tags/Show.vue'
import ResetPassword from '../views/ResetPassword.vue'
import RedirectAuthGoogle from '../views/Auth/RedirectAuthGoogle.vue'
import SocialRegister from '../views/Auth/SocialRegister.vue'
import { useAuthStore } from './store/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'index',
      component: Index,
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
      path: '/users',
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
    {
      path:'/person',
      name:'person',
      component:Person,
      props:true,
    },
    {
      path:'/tags',
      name:'tag',
      component:Tag,
      props:true,
    },
    {
      path:'/reset-password/',
      component:ResetPassword,
      props:true,
    },
    {
      path:'/login/google/callback',
      name:'RedirectAuthGoogle',
      component:RedirectAuthGoogle
    },
    {
      path:'/social_register',
      name:'SocialRegister',
      component:SocialRegister,
      props:true
    }
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
