import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
})

// jab mai /api pe koi bhi request kru tb to apne aa vaha localhost append hjaye
//automatically detect kr lega, 
// appedn to hoga hi kyoki iska naam proxy hai to ser ver ko lagega ye ORIGIN se aya hai
// jaise class me PROXY lagate