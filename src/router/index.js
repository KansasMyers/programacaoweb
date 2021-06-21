import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/usuarios',
    name: 'User',
    meta: {
      title: 'Usuários'
    },
    component: () => import('../views/User.vue')
  },
  {
    path: '/usuarios-perfil/:id',
    name: 'UserPage',
    meta: {
      title: 'Usuários'
    },
    component: () => import('../views/UserPage.vue')
  },
  {
    path: '/publicacao-perfil/:id',
    name: 'PubliPage',
    meta: {
      title: 'Publicações'
    },
    component: () => import('../views/PubliPage.vue')
  },
  {
    path: '/publicacoes',
    name: 'Publi',
    meta: {
      title: 'Publicações'
    },
    component: () => import('../views/Publi.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
