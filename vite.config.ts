import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const port = Number(process.env.PORT || 5173);
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },

  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },

  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
