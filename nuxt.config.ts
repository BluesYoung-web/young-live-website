/*
 * @Author: zhangyang
 * @Date: 2023-05-25 19:45:20
 * @LastEditTime: 2023-11-22 09:37:22
 * @Description:
 */
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1.0,user-scalable=no,shrink-to-fit=no',
      title: '电视直播',
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'screen-orientation', content: 'portrait' },
        { name: 'x5-orientation', content: 'portrait' },
        { name: 'renderer', content: 'webkit' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'creator', content: 'BluesYoung-web' },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.svg',
        },
      ],
      script: [
        {
          innerHTML: `
            this.globalThis || (this.globalThis = this);
            window.onerror = function(e) {
              if (e.toString().includes('ResizeObserver loop')) {
                return;
              }
              console.log(e);
              window.alert('您的浏览器版本过低，请尝试使用其他浏览器或将浏览器升级至最新版本后重试！');
              window.alert(e);
            }
          `,
        },
      ],
    },
  },

  unocss: {
    // 默认的 @unocss/reset/tailwind.css 会造成 element 样式异常
    // 手动注入 @unocss/reset/tailwind-compat.css
    preflight: false,
  },

  lazyLoad: {
    audio: false,
    // 默认使用原生的 loading="lazy"
    // native: true,
    // js 实现，仅指令生效 v-lazy-load
    // directiveOnly: true,
    // @ts-expect-error js 实现的占位图
    defaultImage: '/image_placeholder.svg',
  },

  nitro: {
    output: {
      dir: resolve(__dirname, './dist'),
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-lazy-load',
  ],

  pinia: {
    autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
  },

  vite: {
    build: {
      // 兼容钉钉浏览器
      target: ['chrome61'],
      cssTarget: ['chrome61'],
      sourcemap: false,
    },
  },
})
