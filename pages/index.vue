<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 09:27:14
 * @LastEditTime: 2023-11-10 19:41:09
 * @Description:
-->
<script setup lang="ts">
import m3u8Raw from '@/assets/global.m3u?raw'

const rawM3u8 = ref(m3u8Raw)

fetch('https://live.fanmingming.com/tv/m3u/global.m3u').then(r => r.text()).then((raw) => {
  console.log('远程优先')
  rawM3u8.value = raw
}).catch(() => {
  console.log('远程获取失败，使用本地')
  rawM3u8.value = m3u8Raw
})

const validTVs = computed(() => rawM3u8.value.match(/(?<=#EXTINF:-1\s)(.*\n.*)/img)?.filter(tv => tv.includes('tvg-id')) ?? [])

const TVGroups = useLocalStorage('TVGroups', new Map<string, {
  tvgId: string
  tvgName: string
  tvgLogo: string
  src: string
}[]>())

const TVList = useLocalStorage('TVList', new Set<{
  tvgId: string
  tvgName: string
  tvgLogo: string
  src: string
}>())

process.client && watch(() => validTVs.value, (tvs) => {
  TVList.value.clear()
  TVGroups.value.clear()
  for (const tv of tvs) {
    const [str, src] = tv.split('\n')
    // 提取tvg-id的值
    const tvgId = str.match(/tvg-id="(.*?)"/)?.[1] ?? ''

    // 提取tvg-name的值
    const tvgName = str.match(/tvg-name="(.*?)"/)?.[1] ?? ''

    // 提取tvg-logo的值
    const tvgLogo = str.match(/tvg-logo="(.*?)"/)?.[1] ?? ''

    // 提取group-title的值
    const groupTitle = str.match(/group-title="(.*?)"/)?.[1] ?? '其他'

    TVList.value.add({ tvgId, tvgName, tvgLogo, src })

    if (TVGroups.value.get(groupTitle))
      TVGroups.value.set(groupTitle, [...TVGroups.value.get(groupTitle)!, { tvgId, tvgName, tvgLogo, src }])

    else
      TVGroups.value.set(groupTitle, [{ tvgId, tvgName, tvgLogo, src }])
  }
}, { deep: true, immediate: true })
</script>

<template>
  <div v-for="([group, tvs]) of TVGroups.entries()" :key="group">
    <ElCard :header="group" body-style="background: #999;">
      <div class="flex flex-wrap gap-32px">
        <div v-for="tv of tvs" :key="tv.tvgId" class="flex justify-center items-center cursor-pointer" :title="tv.tvgName" @click="navigateTo(`/play/${encodeURIComponent(tv.src)}`)">
          <ElAvatar class="!w-160px" shape="square">
            <div class="text-2xl">
              {{ tv.tvgName }}
            </div>
          </ElAvatar>
        </div>
      </div>
    </ElCard>
    <br>
  </div>
</template>
