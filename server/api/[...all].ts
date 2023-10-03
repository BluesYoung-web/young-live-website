/*
 * @Author: zhangyang
 * @Date: 2023-07-21 09:50:36
 * @LastEditTime: 2023-10-03 10:36:42
 * @Description:
 */
export default eventHandler(async (event) => {
  const { url } = getQuery(event)
  return fetch(url as string)
})
