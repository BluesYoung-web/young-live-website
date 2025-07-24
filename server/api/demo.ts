/*
 * @Author: zhangyang
 * @Date: 2025-07-24 17:17:35
 * @LastEditTime: 2025-07-24 17:17:42
 * @Description:
 * @LastEditors: zhangyang
 * Copyright (c) 2025 to current by BluesYoung-web, All Rights Reserved.
 */
export default eventHandler(async (event) => {
  console.log(event.node.req)

  return { definitions: { data: { progress: { type: 'number', name: '进度', mockValue: 0.7 } }, $i18n: {}, $colorTokens: { highlightAbnormal: { light: '#F67E7A', dark: '#F67E7A' }, highlightWarning: { light: '#FFA338', dark: '#FFA338' }, highlightNormal: { light: '#45D036', dark: '#45D036' }, background: { light: '#f2f4f1', dark: '#f2f4f1' }, fontColor: { light: '#1F2329', dark: '#FFFFFF' } } }, template: { type: 'view', props: { style: { width: '{{$container.width}}', height: '{{$container.height}}', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }, children: [{ type: 'view', props: { style: { justifyContent: 'center', alignItems: 'center', backgroundColor: '{{progress > 0.3 ? (progress > 0.6 ? $colorTokens.highlightNormal : $colorTokens.highlightWarning) : $colorTokens.highlightAbnormal}}', width: 40, height: 20, borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 } } }, children: [{ type: 'text', props: { content: '{{progress * 100}}%', style: { color: '{{$colorTokens.fontColor}}', fontSize: 12 } } }] }, { type: 'view', props: { style: { width: '{{$container.width * 0.9}}', height: 10, marginTop: 10, backgroundColor: '{{$colorTokens.background}}', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderRadius: { topLeft: 14, topRight: 14, bottomLeft: 14, bottomRight: 14 } } }, children: [{ type: 'view', props: { style: { width: '{{$container.width * 0.9 * progress}}', height: 10, backgroundColor: '{{progress > 0.3 ? (progress > 0.6 ? $colorTokens.highlightNormal : $colorTokens.highlightWarning) : $colorTokens.highlightAbnormal}}', borderRadius: { topLeft: 14, topRight: 14, bottomLeft: 14, bottomRight: 14 } } } }] }] } }
})
