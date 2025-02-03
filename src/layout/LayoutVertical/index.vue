<template>
  <div class="layout-box">
    <div :style="{ width: sideBarWidth }" class="sider" id="sider">
      <div class="logo flex-c">
        <LogoSvg />
        <span v-show="!isCollapse">Ep-Admin</span>
      </div>

      <div class="menu">
        <el-scrollbar>
          <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
          <el-menu
            :default-active="activeKey"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="menuAccordion"
            :background-color="!isDark ? '#001529' : '#1f1f1f'"
            text-color="#ffffffa6"
            active-text-color="#ffffff"
            @select="handleClick"
          >
            <SubMenu :menuList="menuData" />
          </el-menu>
        </el-scrollbar>
      </div>
    </div>

    <div class="right-layout">
      <Header />
      <Tabs />
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SubMenu from '../components/SubMenu/index.vue'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import LogoSvg from '@/assets/imgs/logo.svg?component'
import { useMenu } from '@/hooks/useMenu'

defineOptions({
  name: 'LayoutVertical'
})

const { isDark, menuAccordion, isCollapse, sideBarWidth, activeKey, menuData, handleClick } =
  useMenu()
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
