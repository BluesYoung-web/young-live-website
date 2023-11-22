/*
 * @Author: zhangyang
 * @Date: 2023-07-20 19:48:12
 * @LastEditTime: 2023-11-22 09:23:33
 * @Description:
 */
import { version } from '../../../package.json'

export default defineEventHandler(async (event) => {
  const envObj = {
    NUXT_PUBLIC_CURRENT_VERSION: version,
  }

  return envObj
})
