<!--
 * @Author: zhangyang
 * @Date: 2023-10-03 10:04:36
 * @LastEditTime: 2023-10-03 13:49:00
 * @Description:
-->
<script setup lang="ts">
import Player from 'nplayer'
import { usePlayer } from './usePlayer'

const route = useRoute()
const { player, prev, next, init } = usePlayer()

useEventListener('keyup', (e) => {
  if (e.key === 'x')
    next()

  if (e.key === 's')
    prev()
})

onMounted(() => {
  player.mount('#video')
  player.on(Player.EVENT.LOADED_METADATA, () => {
    player.play()
  })
})
onUnmounted(() => {
  player.off(Player.EVENT.LOADED_METADATA)
})

watch(() => route.params, init, { immediate: true })
</script>

<template>
  <div id="video" class="w-100vw h-100vh" />
</template>
