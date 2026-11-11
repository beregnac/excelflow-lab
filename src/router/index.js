import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Лендинг и Загрузка Excel' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: 'Дашборд аналитики 4.1' }
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/DataView.vue'),
    meta: { title: 'Excel-данные' }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('@/views/CatalogView.vue'),
    meta: { title: 'Каталог модулей 4.3' }
  },
  {
    path: '/messenger',
    name: 'Messenger',
    component: () => import('@/views/MessengerView.vue'),
    meta: { title: 'Мессенджер 3.1' }
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import('@/views/KanbanView.vue'),
    meta: { title: 'Kanban-доска 3.2' }
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: () => import('@/views/WizardView.vue'),
    meta: { title: 'Многошаговая форма 4.2' }
  },
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: () => import('@/views/DesignSystemView.vue'),
    meta: { title: 'Дизайн-система 4.4' }
  },
  {
    path: '/levels',
    name: 'Levels',
    component: () => import('@/views/LevelsMapView.vue'),
    meta: { title: 'Карта заданий 1–4' }
  },
  {
    path: '/hosting-report',
    name: 'HostingReport',
    component: () => import('@/views/HostingReportView.vue'),
    meta: { title: 'Хостинг и AdSlot отчёт' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Вход' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: 'Регистрация 2.4' }
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('@/views/RecoverView.vue'),
    meta: { title: 'Восстановление пароля' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { title: 'Админ-панель', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || ''} — ExcelFlow`
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
