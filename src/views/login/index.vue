<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import userApi from '@/api/user'
import { lStorage } from '@/utils/storage'
import { useUserStore } from '@/stores'

const { setUserInfo, tokenLogin } = useUserStore()

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
    $message.error(error.message || '登陆失败，请稍后再试')
  } finally {
    loadingMsg.destroy()
  }
}

onMounted(() => {
  if (lStorage.get('userInfo')) {
    tokenLogin()
      .then(() => {
        router.push('/')
      })
      .catch(() => {})
  }
})
</script>

<template>
  <div flex items-center h-100vh>
    <div
      :class="`
        flex justify-center flex-wrap w-320 mx-auto py-24 px-48
        bg-fff border shadow-xl -translate-y-42%`"
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
        @keydown.enter="handleLogin"
      />
      <n-button type="primary" w-full @click="handleLogin">登录</n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
