<script setup name="Layout">
import { RouterView } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

const contentStyle = {
  height: '100%',
  padding: '18px',
}
</script>

<template>
  <n-layout position="absolute" has-sider>
    <n-layout-sider
      bordered
      content-style="padding: 0 6px;"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
      collapse-mode="width"
      :width="216"
      :collapsed-width="60"
      h-100vh
    >
      <AppSidebar />
    </n-layout-sider>

    <n-layout style="background: var(--bg-c)">
      <n-layout-header bordered>
        <AppHeader />
      </n-layout-header>
      <n-scrollbar
        style="height: calc(100% - var(--header-h) - var(--tagbar-h))"
      >
        <n-layout-content
          class="bg-inherit"
          :content-style="contentStyle"
          :native-scrollbar="false"
        >
          <div bg-fff p-18 br-12>
            <RouterView />
          </div>
        </n-layout-content>
        <n-layout-footer bordered bg-inherit>
          <div text-gray-5 pb-24>
            <p my-4 text-center>Released under the MIT License.</p>
            <p my-4 text-center>Copyright © 2023-present Jic999</p>
          </div>
        </n-layout-footer>
      </n-scrollbar>
    </n-layout>
  </n-layout>
</template>
