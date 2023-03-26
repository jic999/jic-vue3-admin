<script setup>
import { useRouter } from 'vue-router'
import TheIcon from '@/components/Icon/TheIcon.vue'
import { useUserStore } from '@/stores'
import TagBar from './components/TagBar.vue'
import { computed } from 'vue'
import _ from 'lodash'

import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()

const { collapsed } = storeToRefs(appStore)
const { toggleSidebar } = appStore

console.log(collapsed, toggleSidebar)
const { userInfo, logout } = useUserStore()
const isLogin = computed(() => !_.isEmpty(userInfo))

const userOptions = [{ label: '退出登录', key: 'logout' }]

const router = useRouter()

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
  <div flex justify-between items-center h-60 px-24>
    <div>
      <TheIcon
        v-if="collapsed"
        class="icon-btn"
        icon="ep:expand"
        :size="20"
        @click="toggleSidebar"
      />
      <TheIcon
        v-else
        class="icon-btn"
        icon="ep:fold"
        :size="20"
        @click="toggleSidebar"
      />
    </div>
    <div>
      <div flex items-center gap-8 text-16>
        <span hover:text-primary hover:cursor-pointer>
          {{ userInfo.username || '未登录' }}
        </span>
        <n-dropdown
          trigger="hover"
          :options="userOptions"
          @select="handleSelect"
        >
          <img v-if="userInfo.avatar" :src="userInfo.avatar" wh-36 circle />
          <TheIcon v-else icon="carbon:user-avatar" :size="36" color="#999" />
        </n-dropdown>
      </div>
    </div>
  </div>
  <TagBar />
</template>

<style lang="scss" scoped></style>
