import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'primereact', 'primeicons'],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        primereact: path.resolve(__dirname, 'primereact.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false,
    strictPort: true,
    hmr: {
      port: 3001,
    },
    cors: true,
    proxy: {
      // Add any API proxy rules here if needed
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})