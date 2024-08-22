import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
        '/api': {
          target: 'https://job-portal-smoky-two.vercel.app',  // Replace with your backend server's URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
  },
})

//https://job-portal-smoky-two.vercel.app/

