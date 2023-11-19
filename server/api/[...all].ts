/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:50:36
 * @LastEditTime: 2023-11-19 16:18:12
 * @Description: 透明代理，跨域
 */
export default eventHandler(async (event) => {
  const { url } = getQuery(event)

  return fetch(url as string)
})
