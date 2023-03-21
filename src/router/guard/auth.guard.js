// 每次路由跳转前检查登录状态 若失效 请求更新状态
import { useUserStore } from '@/stores/user'
import userApi from '@/api/user'
// TODO
const { userInfo, setUserInfo } = useUserStore()

export function authGuard(router) {
  router.beforeEach(async (to, from, next) => {
    if (userInfo.id) next()
    try {
      const { code, data } = await userApi.validateToken()
      if (code !== 0) throw new Error('身份验证已过期，请重新登录')
      setUserInfo(data)
    } catch (err) {
      $message.warning(err.message)
    }
  })
}
