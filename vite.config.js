import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: '/',
  server: {
    historyApiFallback: true,
    // إضافة إعداد Proxy هنا لحل مشكلة CORS
    proxy: {
      // أي طلب يبدأ بـ '/api' سيتم توجيهه إلى الخادم الخلفي
      '/api': {
        target: 'https://araboon.runasp.net', // ⚠️ هذا هو رابط الـ API
        changeOrigin: true, // يغير الـ 'Origin' في الطلب ليتوافق مع الخادم
        rewrite: (path) => path.replace(/^\/api/, '/Api'), // يعيد كتابة المسار، لإزالة '/api' من الطلب
      },
    },
  }
})
