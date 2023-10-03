<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 09:27:14
 * @LastEditTime: 2023-10-03 10:15:37
 * @Description:
-->
<script setup lang="ts">
const m3u8Raw = await (await fetch('https://live.fanmingming.com/tv/m3u/global.m3u')).text()

const validTVs = m3u8Raw.match(/(?<=#EXTINF:-1\s)(.*\n.*)/img)?.filter(tv => tv.includes('tvg-id')) ?? []

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

for (const tv of validTVs) {
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
</script>

<template>
  <div v-for="([group, tvs]) of TVGroups.entries()" :key="group">
    <ElCard :header="group" body-style="background: #999;">
      <div class="flex flex-wrap gap-32px">
        <div v-for="tv of tvs" :key="tv.tvgId" class="flex justify-center items-center cursor-pointer" :title="tv.tvgName" @click="navigateTo(`/play/${encodeURIComponent(tv.src)}`)">
          <img v-if="tv.tvgLogo" class="w-120px" :src="tv.tvgLogo">
          <div v-else>
            {{ tv.tvgName }}
          </div>
        </div>
      </div>
    </ElCard>
    <br>
  </div>
</template>
