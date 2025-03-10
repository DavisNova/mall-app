// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  modules: [
    '@vant/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  css: [
    '@/assets/css/main.css',
  ],

  vant: {
    /** Vant 配置 */
    themes: ['dark'],
  },

  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
      title: '移动商城',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },

  // 开发环境配置
  devServer: {
    port: 3000,
  },

  // 构建配置
  build: {
    transpile: ['@vant/nuxt'],
  },

  compatibilityDate: '2025-03-10',

  // API代理配置
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },

  // 生产环境配置
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000'
    }
  }
})