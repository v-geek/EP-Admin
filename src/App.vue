<template>
  <el-config-provider :locale="locale" :size="componentSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { checkVersion } from 'version-rocket'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { getBrowserLang } from 'pear-common-utils'
import useSystemStore from '@/store/modules/system'
import { LanguageType } from '@/store/types'

const systemStore = useSystemStore()
const i18n = useI18n()

// 设置 element-plus 的语言
const locale = computed(() => {
  if (['zh', null].includes(systemStore.language)) return zhCn
  if (systemStore.language == 'en') return en
})

const componentSize = computed(() => systemStore.componentSize)

onMounted(() => {
  const lang: LanguageType = systemStore.language ?? getBrowserLang()
  // 初始化语言
  i18n.locale.value = lang
  // 首次加载可能为null, 因此需要设置
  systemStore.setState('language', lang)
})

onBeforeMount(() => {
  const { VITE_PUBLIC_PATH, MODE } = import.meta.env
  const { version, name } = __APP_INFO__.pkg
  // https://github.com/guMcrey/version-rocket/blob/main/README.zh-CN.md#api
  if (MODE === 'production') {
    // 版本实时更新检测，只作用于线上环境
    checkVersion(
      {
        // 5分钟检测一次版本
        pollingTime: 300000,
        localPackageVersion: version,
        originVersionFileUrl: `${location.origin}${VITE_PUBLIC_PATH}version.json`
      },
      {
        title: name,
        description: '检测到新版本',
        buttonText: '立即更新'
      }
    )
  }
})
</script>
