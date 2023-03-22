<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import userApi from '@/api/user'
import { lStorage } from '@/utils/storage'
import { useUserStore } from '@/stores/user'

const { userInfo, setUserInfo } = useUserStore()

const loginParams = reactive({
  username: '',
  password: '',
})

const router = useRouter()
async function handleLogin() {
  if (!loginParams.username || !loginParams.username)
    return $message.warning('请输入用户名和密码')
  const loadingMsg = $message.loading('登录中')
  try {
    const { code, msg, data } = await userApi.login(loginParams)
    if (code !== 0) throw new Error(msg)
    // 记录登录状态
    setUserInfo(data)
    router.push('/')
    $message.success('登录成功')
  } catch (error) {
    $message.error(error.message)
  } finally {
    loadingMsg.destroy()
  }
}

async function tokenLogin() {
  const userInfo = lStorage.get('userInfo')
  if (!userInfo) return
  // 检查登录状态 若已登陆 验证token
  const { code, data } = await userApi.reqAuth()
  if (code !== 0) return
  // 若验证成功 记录状态并进入主页
  setUserInfo(data)
  router.push('/')
}

onMounted(() => {
  tokenLogin()
})
</script>

<template>
  <div flex items-center h-100vh>
    <div
      :class="`
        flex justify-center flex-wrap w-320 mx-auto py-24 px-48
        border shadow-xl -translate-y-42%`"
    >
      <h3 text-primary>Vue3 Naive Admin</h3>
      <input
        v-model="loginParams.username"
        class="w-full mb-16 p-8 bg-f2f2f2"
        type="text"
        placeholder="用户名"
      />
      <input
        v-model="loginParams.password"
        class="w-full mb-16 p-8 bg-f2f2f2"
        type="password"
        placeholder="密码"
      />
      <n-button type="primary" w-full @click="handleLogin">登录</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
