<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 09:27:14
 * @LastEditTime: 2024-04-07 09:04:48
 * @Description:
-->
<script setup lang="ts">
import m3u8Raw from '@/assets/cctv.m3u?raw'

const rawM3u8 = ref(m3u8Raw)

const sipders = ref<TVItem[]>([])

const showLogo = ref(false)

fetch('https://live.fanmingming.com/tv/CCTV1.png').then(() => {
  console.log('显示 logo')
  showLogo.value = true
}).catch(() => {
  console.log('logo 获取失败')
})

$fetch('/get/iptv').then((data: Record<string, TVItem>) => {
  TVList.value.clear()
  sipders.value = Object.values(data)
  sipders.value.forEach((v) => {
    TVList.value.add({
      ...v,
      src: v.tvgSrc || '',
    })
  })
  console.log('sipders', sipders.value)
}).catch(() => {
  console.log('spider fail')
})

const validTVs = computed(() => rawM3u8.value.match(/(?<=#EXTINF:-1\s)(.*\n.*)/img)?.filter(tv => tv.includes('tvg-id')) ?? [])

interface TVItem {
  tvgId: string
  tvgName: string
  tvgLogo: string
  src: string
  tvgSrc?: string
}

const TVGroups = useLocalStorage('TVGroups', new Map<string, TVItem[]>())

const TVList = useLocalStorage('TVList', new Set<TVItem>())

process.client && watch(() => validTVs.value, (tvs) => {
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

    if (TVGroups.value.get(groupTitle))
      TVGroups.value.set(groupTitle, [...TVGroups.value.get(groupTitle)!, { tvgId, tvgName, tvgLogo, src }])

    else
      TVGroups.value.set(groupTitle, [{ tvgId, tvgName, tvgLogo, src }])
  }
}, { deep: true, immediate: true })

function jumpCCTV(tv: TVItem) {
  if (tv.tvgId.toLowerCase().includes('cctv'))
    window.open(`https://tv.cctv.com/live/${tv.tvgId.toLowerCase()}`)
  else
    window.open(tv.src)
}

function jumpTV(tv: TVItem) {
  navigateTo(`/play/${encodeURIComponent(tv.tvgSrc || tv.src)}`)
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

  <div v-if="sipders.length">
    <ElCard header="IPTV 视频源(不可靠)" body-style="background: #999;">
      <div class="flex flex-wrap gap-32px">
        <div v-for="tv of sipders" :key="`${tv.tvgId}iptv`" class="flex justify-center items-center cursor-pointer" :title="tv.tvgName" @click="jumpTV(tv)">
          <img v-if="showLogo" class="w-120px" :src="tv.tvgLogo">
          <ElAvatar v-else class="!w-160px" shape="square">
            <div class="text-2xl">
              {{ tv.tvgName }}
            </div>
          </ElAvatar>
        </div>
      </div>
    </ElCard>
  </div>
</template>
