import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { parse } from 'yaml'
import Inspector from 'unplugin-vue-dev-locator/vite'
import traeBadgePlugin from 'vite-plugin-trae-solo-badge'

/**
 * 从app.config.yaml读取baseUrl配置
 * @returns baseUrl配置值，默认为'/'
 */
function getBaseUrlFromConfig(): string {
  try {
    const configPath = resolve(__dirname, 'public/config/app.config.yaml')
    const configContent = readFileSync(configPath, 'utf-8')
    const config = parse(configContent)
    return config?.app?.baseUrl || '/'
  } catch (error) {
    console.warn('Failed to read baseUrl from app.config.yaml, using default "/":', error)
    return '/'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Inspector(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  },
  base: getBaseUrlFromConfig()
})
