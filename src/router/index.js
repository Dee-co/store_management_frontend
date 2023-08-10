import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AgGrid from '../views/AgGrid'
const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect to the 'home' route
  },
  {
    path: '/login',
    name: 'login',
    component: HomeView,
  },
  {
    path: '/agGrid',
    name: 'agGrid',
    component: AgGrid,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
