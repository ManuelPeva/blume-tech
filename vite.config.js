import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/blume-tech",
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['canvas-confetti','html2pdf.js'],
    },
  },
})
