import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine the target route based on the environment
const target = process.env.NODE_ENV === 'production'
  ? 'http://shopping_list_server:9000'
  : 'http://localhost:9000';
console.log('target:', target);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})