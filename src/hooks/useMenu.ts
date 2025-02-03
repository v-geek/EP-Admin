import { computed } from 'vue'
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import usePermissionStore from '@/store/modules/permission'
import { filterMenuData } from '@/router/utils'
import useSystemStore from '@/store/modules/system'

export const useMenu = () => {
  const router = useRouter()
  const route = useRoute()
  const systemStore = useSystemStore()

  const { isDark, menuAccordion } = storeToRefs(systemStore)
  const isCollapse = computed(() => systemStore.sideBar.isCollapse)
  const sideBarWidth = computed(() => systemStore.sideBar.width)
  const activeKey = computed(() => route.path)
  const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

  const handleClick = (key: string) => {
    // 获取点击的路由
    const clickRoute = router.getRoutes().find(item => item.path === key) as RouteRecordRaw

    // 外部链接
    if (clickRoute.meta?.link) {
      return window.open(clickRoute.meta?.link as string, '_blank')
    }

    router.push(key)
  }

  return {
    isDark,
    menuAccordion,
    isCollapse,
    sideBarWidth,
    activeKey,
    menuData,
    handleClick
  }
}
