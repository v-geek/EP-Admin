<template>
  <div
    class="main dark:!bg-dark-el"
    :style="{ padding: !route.meta?.mainFull ? '16px' : 0 }"
    v-loading="enableMainLoading && mainLoading"
  >
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveNameList">
          <component :is="Component" :key="route.path" v-if="routerShow" />
        </keep-alive>
      </transition>
    </router-view>
  </div>

  <Footer v-if="showFooter" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/mitt'
import useSystemStore from '@/store/modules/system'
import Footer from '../Footer/index.vue'

const route = useRoute()
const { keepAliveNameList, enableMainLoading, mainLoading, showFooter } =
  storeToRefs(useSystemStore())

const routerShow = ref(true)

// 刷新当前页面
emitter.on('refreshPage', val => {
  routerShow.value = val as boolean
})
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  background-color: $mainBgColor;
  // 防止切换路由时出现 x y 轴的滚动条
  overflow-x: hidden;
}
</style>
