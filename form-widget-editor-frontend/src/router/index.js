import { createRouter, createWebHistory } from 'vue-router'
import Widgets from '../components/Widgets.vue'
import Sidebar from '../components/Sidebar.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sidebar',
      component: Sidebar
    },
    {
      path: '/widgets/:url',
      name: 'widgets',
      component: Widgets
    },
  ]
})

export default router
