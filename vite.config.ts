import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-native-web'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 3000,
    host: true,
    open: false,
  },
})