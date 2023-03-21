<script setup name="Layout">
import { RouterView } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider bordered content-style="padding: 0 12px;" h-100vh>
      <AppSidebar />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered> <AppHeader /> </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <RouterView />
      </n-layout-content>
      <n-layout-footer bordered> 成府路 </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.n-layout-footer {
  padding: 24px;
}
</style>
