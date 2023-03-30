<script setup>
import { useRoute, useRouter } from 'vue-router'
import TheIcon from '@/components/Icon/TheIcon.vue'
import { renderCustomIcon, renderIcon } from '@/utils/icon'
import { useUserStore } from '@/stores'
import TagBar from './components/TagBar.vue'
import _ from 'lodash'

import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

/* Toggle Sidebar */
const appStore = useAppStore()

const { collapsed } = storeToRefs(appStore)
const { toggleSidebar } = appStore

/* BreadCrumb */
const breadCrumbList = computed(() =>
  route.matched.filter((item) => !!item.meta?.title)
)
function handleBreadClick(path) {
  if (path === route.path) return
  router.push(path)
}

function getIcon(meta) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 16 })
  if (meta?.icon) return renderIcon(meta.icon, { size: 16 })
  return null
}

/* UserInfo */
const { userInfo, logout } = useUserStore()

const userOptions = [{ label: '退出登录', key: 'logout' }]

function handleSelect(key) {
  const handler = {
    logout: () => {
      logout()
      router.push('/login')
    },
  }
  handler[key]()
}
</script>

<template>
  <div flex justify-between items-center h-60 px-24 text-gray-5>
    <!-- Left-->
    <div flex items-center>
      <!-- Toggle Sidebar -->
      <TheIcon
        class="icon-btn"
        :icon="collapsed ? 'ep:expand' : 'ep:fold'"
        :size="22"
        @click="toggleSidebar"
      />
      <!-- BreadCrumb -->
      <div ml-12 pl-12 border-l-2>
        <n-breadcrumb>
          <n-breadcrumb-item
            v-for="item in breadCrumbList"
            :key="item.path"
            @click="handleBreadClick(item.path)"
          >
            <component :is="getIcon(item.meta)" />
            {{ item.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </div>
    <!-- Right -->
    <div>
      <!-- UserInfo -->
      <div flex items-center gap-12 text-16>
        <span hover:text-primary hover:cursor-pointer>
          {{ userInfo.username || '未登录' }}
        </span>
        <n-dropdown
          trigger="hover"
          :options="userOptions"
          @select="handleSelect"
        >
          <img v-if="userInfo.avatar" :src="userInfo.avatar" wh-36 circle />
          <TheIcon
            v-else
            icon="carbon:user-avatar-filled"
            :size="36"
            color="currentColor"
          />
        </n-dropdown>
      </div>
    </div>
  </div>
  <TagBar />
</template>

<style lang="scss" scoped></style>
