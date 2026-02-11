import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.0.10",        
    port: 7153,
    // proxy: {
    //   '/api/proassis': {
    //     target: 'https://proassisapp.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\/proassis/, '/proassislife/servicios'),
    //     secure: true,
    //   },
    // },
  },
})
