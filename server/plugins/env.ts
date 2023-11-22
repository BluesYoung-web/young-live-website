/*
 * @Author: zhangyang
 * @Date: 2022-12-30 17:19:42
 * @LastEditTime: 2023-11-22 09:22:47
 * @Description:
 */
import { resolve } from 'node:path'
import { loadConfig } from 'c12'
import { useYoungLogger } from '@bluesyoung/logger'
import { version } from '../../package.json'

export default defineNitroPlugin(async (nitroApp) => {
  const env = (process.env.DEPLOY_ENV as 'dev' | 'test' | 'online') || 'dev'
  const { config } = await loadConfig<Record<string, any>>({
    name: env,
    cwd: resolve(process.cwd(), 'config'),
    defaultConfig: {
      // 此处可以放置通用的环境变量
      NUXT_PUBLIC_CURRENT_VERSION: version,
    },
  })

  for (const key in config) {
    if (process.env[key]) {
      console.log(
        '系统环境变量优先: ',
        key,
        ' = ',
        process.env[key],
        ' -> ',
        config[key],
        ' -> ',
        '覆盖',
      )
      config[key] = process.env[key]
    }
    else {
      process.env[key] = config[key]
    }
    if (!(key.indexOf('NUXT_PUBLIC_') === 0))
      delete config[key]
  }

  // 仅打包之后格式化日志
  if (process.env.NODE_ENV !== 'development')
    useYoungLogger()

  console.log('------------------------读取配置文件------------------------')
  console.log(config)
  console.log('-------------------------------------------------------------')

  nitroApp.hooks.hook('request', (event) => {
    const headers = event.node.req.headers
    console.log('ua', headers['user-agent'], 'x-forwarded-for', headers['x-forwarded-for'], 'x-real-ip', headers['x-real-ip'])
  })

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 直接注入环境变量到前端
    html.bodyPrepend.push(`
    <!-- 注入环境变量 -->
    <script>window.__YOUNG_ENV__=${JSON.stringify(config)}</script>
    <!-- 更新检测，每分钟一次 -->
    <script>
    const YOUNG_UPDATE_TIMER = setInterval(() => {
      fetch('/get/env')
        .then((res) => res.json())
        .then(({ NUXT_PUBLIC_CURRENT_VERSION }) => {
          if (NUXT_PUBLIC_CURRENT_VERSION !== window.__YOUNG_ENV__.NUXT_PUBLIC_CURRENT_VERSION) {
            clearInterval(YOUNG_UPDATE_TIMER);
            alert('版本已更新，点击重新加载页面！');
            window.location.reload();
          }
        });
    }, 6e4);
    </script>
    `)
  })
})
