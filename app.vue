<!--
 * @Author: zhangyang
 * @Date: 2023-05-25 19:53:07
 * @LastEditTime: 2023-11-22 09:45:24
 * @Description:
-->
<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css'

import { ElConfigProvider } from 'element-plus'

// @ts-expect-error
import locale from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <ElConfigProvider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
