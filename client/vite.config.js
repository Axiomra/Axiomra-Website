import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // VITE_API_URL is inlined at build time, so a build without it would ship a
  // contact form that posts to nowhere. Fail the build instead. The dev server
  // alone gets the local API as a default.
  const { VITE_API_URL } = loadEnv(mode, process.cwd(), 'VITE_')
  if (!VITE_API_URL) {
    if (command === 'build') {
      throw new Error('VITE_API_URL is not set. Set it to the API origin, e.g. VITE_API_URL=https://api.example.com npm run build')
    }
    process.env.VITE_API_URL = 'http://localhost:5000'
  }

  return {
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
  }
})
