/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:50:36
 * @LastEditTime: 2023-11-10 19:23:48
 * @Description:
 */
export default eventHandler(async (event) => {
  const { url } = getQuery(event)
  try {
    const raw = (await fetch(url as string)).url
    // hack 多次重定向，获取真实播放地址
    console.log('🚀 ~ file: [...all].ts:11 ~ eventHandler ~ raw:', raw)
    return raw
  }
  catch (error) {
    console.error(error)
  }
})
