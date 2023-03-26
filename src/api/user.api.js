import req from './axios'

/**
 * reqPage
 * reqList
 * reqCreate
 * reqUpdate
 * reqDelete
 */
export default {
  /**
   *
   * @param {{ username, password }} params
   * @return {Promise}
   */
  login(params) {
    console.log('login before', params)
    return req.post('/user/login', params)
  },
  reqAuth() {
    return req.post('/user/login-status')
  },
  reqList(params) {
    return req.post('/admin/user/list', params)
  },
  reqPage(params = {}) {
    return req.post('/admin/user/page', params)
  },
  reqCreate(params) {
    return req.post('/admin/user', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  reqUpdate(params) {
    return req.put('/admin/user', params)
  },
  reqDelete(id) {
    return req.delete(`/admin/user/${id}`)
  },
}
