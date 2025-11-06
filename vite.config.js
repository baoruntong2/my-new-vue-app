import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock',
        localEnabled: mode === 'development' || mode === 'test',
        prodEnabled: false,
        watchFiles: true,
        supportTs: false
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    server: {
      port: 8080,
      open: true,
      // 注意：vite-plugin-mock 会自动处理 /api 请求，无需代理
      // 如果 VITE_API_URL 存在且不是本地，则使用代理
      proxy: env.VITE_API_URL && !env.VITE_API_URL.includes('localhost') ? {
        '/api': {
          target: env.VITE_API_URL,
          timeout: 5000,
          logLevel: 'info',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : {}
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: 'terser',
      target: 'es2015',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'axios': ['axios'],
            'qrcode': ['qrcode.vue']
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // SCSS变量文件（如果存在）
          // additionalData: '@import "@/assets/styles/variables.scss";'
        }
      }
    }
  }
})