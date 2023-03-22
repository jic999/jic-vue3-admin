<script setup>
import { useRouter } from 'vue-router'
import TheIcon from '@/components/Icon/TheIcon.vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { isEmptyObj } from '@/utils/is'

const { userInfo, logout } = useUserStore()
const isLogin = computed(() => !isEmptyObj(userInfo))

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
  <div flex justify-between items-center h-60 px-48>
    <div>1</div>
    <div>
      <div flex items-center gap-8>
        <span hover:text-primary hover:cursor-pointer>
          {{ userInfo.username || '未登录' }}
        </span>
        <n-dropdown
          trigger="hover"
          :options="userOptions"
          @select="handleSelect"
        >
          <img
            v-if="userInfo.avatarUrl"
            :src="userInfo.avatarUrl"
            wh-36
            circle
          />
          <TheIcon v-else icon="carbon:user-avatar" :size="36" color="#999" />
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
