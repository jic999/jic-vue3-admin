import req from './axios'

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
  validateToken() {
    return req.post('/user/login-status')
  },
}