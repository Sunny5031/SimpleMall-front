import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // 未来你可以加上 { path: '/home', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
