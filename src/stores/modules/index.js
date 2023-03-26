export * from './app'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { lStorage } from '@/utils/storage'
import userApi from '@/api/user.api'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})

  function setUserInfo(info) {
    // Object.assign(userInfo, info)
    userInfo.value = info
    if (!lStorage.get('userInfo')) lStorage.set('userInfo', info, 3600 * 24)
  }
  function logout() {
    userInfo.value = {}
    lStorage.remove('userInfo')
  }
  async function tokenLogin() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await userApi.reqAuth()
        if (data.code !== 0) {
          // 失败 清除登录信息
          logout()
          reject(data)
        } else {
          // 成功 记录登录状态
          setUserInfo(data.data)
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  return {
    userInfo,
    setUserInfo,
    logout,
    tokenLogin,
  }
})
