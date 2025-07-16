import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow external connections
    open: false,
    strictPort: true,
    hmr: {
      port: 3001, // Use different port for HMR
    },
    // Corporate proxy friendly settings
    cors: true,
    proxy: {
      // Add any API proxy rules here if needed
    }
  },
})