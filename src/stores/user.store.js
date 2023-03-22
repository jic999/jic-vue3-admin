import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { lStorage } from '@/utils/storage'
import userApi from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    setUserInfo(info) {
      Object.assign(userInfo, info)
      if (!lStorage.get('userInfo')) lStorage.set('userInfo', info, 3600 * 24)
    },
    logout() {
      userInfo.value = {}
      lStorage.remove('userInfo')
    },
    async tokenLogin() {
      return new Promise(async (resolve, reject) => {
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
      })
    },
  },
})
