/*
 * @Author: zhangyang
 * @Date: 2023-11-26 19:52:19
 * @LastEditTime: 2023-11-26 20:02:57
 * @Description:
 */
export default eventHandler(() => {
  return $fetch<Record<string, any>>('https://gitee.com/BluesYoung-web/spider-playwright/raw/master/src/assets/iptv.json')
})
