import req from './axios'

export default {
  reqQiniuToken() {
    return req.get('/admin/upload/qiniu-token')
  },
}
