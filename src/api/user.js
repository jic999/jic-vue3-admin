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
    return req.post('/admin/user/login', params)
  },
  reqAuth() {
    return req.post('/admin/user/login-status')
  },
  reqList(params) {
    return req.get('/admin/user/list', params)
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
  reqPhotoList(id) {
    return req.get(`/admin/user/photo/${id}`)
  },
  reqPhotoUpload(params) {
    return req.post('/admin/user/photo', params)
  },
}
