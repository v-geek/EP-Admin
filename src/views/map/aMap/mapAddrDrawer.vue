<template>
  <div class="bg-white dark:bg-dark-1 p-4">
    <el-button @click="openDrawer">点击打开</el-button>

    <div class="my-5">
      <div>数据: {{ mapData }}</div>
    </div>

    <MapAddrDrawer v-model:visible="visible" v-model:map-data="mapData" />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import MapAddrDrawer from '@/components/Map/AddrDrawer.vue'
import { IMapData } from '@/components/Map/type'

const visible = ref(false)

const mapData: Ref<IMapData | null> = ref(null)

// const mapData = ref<IMapData | null>({
//   addr: '四川省成都市武侯区桂溪街道天府三街中国建设银行(成都生产基地)',
//   lng: 104.058302,
//   lat: 30.546434
// })

const openDrawer = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
