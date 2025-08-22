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
        // هذا الإعداد يعمل فقط في بيئة التطوير المحلية
        proxy: {
            '/api': {
                target: 'https://araboon.runasp.net', 
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/Api'),
            },
        },
    }
})
