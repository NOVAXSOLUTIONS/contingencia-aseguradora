import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/proassis': {
        target: 'https://proassisapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proassis/, '/proassislife/servicios'),
        secure: true,
      },
    },
  },
})
