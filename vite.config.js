import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // По умолчанию '/' (подходит для локального сервера и Cloudflare Pages).
  // При сборке в GitHub Actions переменная VITE_BASE_PATH автоматически задаёт '/<repo-name>/'.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
