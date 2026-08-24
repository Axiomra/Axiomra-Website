import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    // three.js alone clears the default 500 kB warning, and it is already
    // isolated in its own lazily-loaded chunk.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          // Rarely changes, so it stays cached across deploys.
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Two animation libraries are in play; keeping them out of the entry
          // chunk means a copy tweak does not invalidate them.
          'motion-vendor': ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
