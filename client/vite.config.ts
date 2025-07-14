// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
  target: 'https://bloggit-site-database.onrender.com/', 
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

