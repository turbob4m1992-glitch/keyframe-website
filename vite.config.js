import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // *** CRITICAL FIX: Base path must be ROOT ("/") for custom domains ***
  base: "/",
  // *** END FIX ***
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split large dependencies (like react-three-fiber or framer-motion) into a separate vendor chunk
          if (id.includes('node_modules')) {
            // Group all node_modules dependencies into a 'vendor' chunk
            return 'vendor'; 
          }
        },
      },
    },
  },
})