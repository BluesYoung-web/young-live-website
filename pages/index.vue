<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 09:27:14
 * @LastEditTime: 2023-11-23 09:43:57
 * @Description:
-->
<script setup lang="ts">
import m3u8Raw from '@/assets/cctv.m3u?raw'

const rawM3u8 = ref(m3u8Raw)

const showLogo = ref(false)

fetch('https://live.fanmingming.com/tv/CCTV1.png').then(() => {
  console.log('显示 logo')
  showLogo.value = true
}).catch(() => {
  console.log('logo 获取失败')
})

const validTVs = computed(() => rawM3u8.value.match(/(?<=#EXTINF:-1\s)(.*\n.*)/img)?.filter(tv => tv.includes('tvg-id')) ?? [])

interface TVItem {
  tvgId: string
  tvgName: string
  tvgLogo: string
  src: string
}

const TVGroups = useLocalStorage('TVGroups', new Map<string, TVItem[]>())

const TVList = useLocalStorage('TVList', new Set<TVItem>())

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

function jumpCCTV(tv: TVItem) {
  window.open(`https://tv.cctv.com/live/${tv.tvgId.toLowerCase()}`)
}
</script>

<template>
  <div v-for="([group, tvs]) of TVGroups.entries()" :key="group">
    <ElCard :header="group" body-style="background: #999;">
      <div class="flex flex-wrap gap-32px">
        <div v-for="tv of tvs" :key="tv.tvgId" class="flex justify-center items-center cursor-pointer" :title="tv.tvgName" @click="jumpCCTV(tv)">
          <img v-if="showLogo" class="w-120px" :src="tv.tvgLogo">
          <ElAvatar v-else class="!w-160px" shape="square">
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
