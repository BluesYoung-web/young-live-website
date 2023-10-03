<!--
 * @Author: zhangyang
 * @Date: 2023-07-21 11:49:00
 * @LastEditTime: 2023-10-03 10:47:26
 * @Description:
-->
<script lang="ts" setup>
</script>

<template>
  <NuxtPage />
</template>

<style scoped lang="scss">
.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    margin-top: $base-header-height;
    margin-left: $base-left-menu-width;

    &.is-collapse {
      margin-left: $base-left-menu-width-min;
      border-right: 0;
    }

    .layout-main {
      min-height: 100%;

      .layout-header {
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        position: fixed;
        top: 0;
        right: 0;
        z-index: $base-z-index - 2;
        width: calc(100% - $base-left-menu-width);

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }
    }
  }

  @screen lt-lg {
    .layout-container-vertical {
      @apply block;
      margin-left: 0;
      // margin-left: $base-left-menu-width-min;
      margin-top: $base-top-bar-height !important;

      &.is-collapse {
        @apply ml-0;
      }

      .layout-header {
        // width: calc(100% - $base-left-menu-width-min) !important;
        width: 100% !important;

        // &.is-collapse {
        //   width: 100% !important;
        // }
      }
    }
  }
}
</style>
