import { defineStore } from 'pinia'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadFromStorage('cartItems') || []
  }),

  getters: {
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.qty++
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          qty: 1
        })
      }
      saveToStorage('cartItems', this.items)
    },

    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
      saveToStorage('cartItems', this.items)
    },

    clearCart() {
      this.items = []
      saveToStorage('cartItems', [])
    }
  }
})
