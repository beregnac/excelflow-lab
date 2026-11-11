import { defineStore } from 'pinia'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: loadFromStorage('currentUser') || null,
    users: loadFromStorage('users') || []
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  },

  actions: {
    async register(name, email, password) {
      await simulateDelay(400)
      const exists = this.users.find((u) => u.email === email)
      if (exists) throw new Error('Пользователь с таким email уже существует')
      const user = { name, email, password, createdAt: new Date().toISOString() }
      this.users.push(user)
      saveToStorage('users', this.users)
      return user
    },

    async login(email, password) {
      await simulateDelay(400)
      const user = this.users.find((u) => u.email === email && u.password === password)
      if (!user) throw new Error('Неверный email или пароль')
      this.user = { name: user.name, email: user.email }
      saveToStorage('currentUser', this.user)
      return this.user
    },

    async loginDemo() {
      await simulateDelay(250)
      const demoEmail = 'demo@excelflow.dev'
      let demoUser = this.users.find((u) => u.email === demoEmail)
      if (!demoUser) {
        demoUser = {
          name: 'Алексей Орлов',
          email: demoEmail,
          password: 'DemoPassword1!',
          createdAt: new Date().toISOString()
        }
        this.users.push(demoUser)
        saveToStorage('users', this.users)
      }
      this.user = { name: demoUser.name, email: demoUser.email }
      saveToStorage('currentUser', this.user)
      return this.user
    },

    async recoverPassword(email) {
      await simulateDelay(400)
      const user = this.users.find((u) => u.email === email)
      if (!user) throw new Error('Пользователь не найден')
      const newPassword = Math.random().toString(36).slice(-8)
      user.password = newPassword
      this.users = [...this.users]
      saveToStorage('users', this.users)
      return { email, newPassword }
    },

    logout() {
      this.user = null
      localStorage.removeItem('currentUser')
    }
  }
})

function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
