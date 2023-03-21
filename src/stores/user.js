import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { lStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({})

  function setUserInfo(info) {
    console.log('before setUserInfo', info)
    Object.assign(userInfo, info)
    if (!lStorage.get('userInfo')) lStorage.set('userInfo', info, 3600 * 24)
    console.log('after setUserInfo', info)
  }
  function logout() {
    userInfo.value = {}
    lStorage.remove('userInfo')
  }

  return {
    userInfo,
    setUserInfo,
    logout,
  }
})
