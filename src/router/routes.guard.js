import { useUserStore } from '@/stores/user'
import { lStorage } from '@/utils/storage'

const WHITE_LIST_PAGE = ['/login']

// 每次路由跳转前检查登录状态
export function authGuard(router) {
  router.beforeEach(async (to, from, next) => {
    // 白名单 放行
    if (WHITE_LIST_PAGE.includes(to.fullPath)) return next()

    const { userInfo, tokenLogin } = useUserStore()
    // 若状态正常 放行
    if (userInfo.id) return next()
    // 否则 验证token
    try {
      // 查看token是否过期
      if (!lStorage.get('userInfo')) throw new Error()
      // 未过期 验证token
      const res = await tokenLogin()
      if (res) $message.success('身份验证成功~')
      next()
    } catch (error) {
      $message.error('身份验证失败，请登录')
      next('/login')
    }
  })
}

export function createGuard(router) {
  authGuard(router)
}
