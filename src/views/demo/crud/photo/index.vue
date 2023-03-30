<script setup name="PhotoManage">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SmartUpload from '@/components/crud/SmartUpload.vue'
import userApi from '@/api/user.api'
import { analyzeFileChange } from '@/components/crud/utils/upload'

const route = useRoute()

const userInfo = history.state

const photoList = ref()

let initialPhotoList = null

// TODO 前端上传图片到七牛云

onMounted(() => {
  userApi
    .reqPhotoList(userInfo.id)
    .then((res) => {
      const { code, msg, data } = res
      if (code !== 0) throw new Error(msg)
      photoList.value = initialPhotoList = data
    })
    .catch((err) => {
      console.error(err)
      $message.error('请求失败，请稍后再试')
    })
})

function handleCommit() {
  const { fileList, ...record } = analyzeFileChange(
    initialPhotoList,
    photoList.value
  )
  const formParams = new FormData()
  formParams.append('userId', userInfo.id)

  for (let key in record) {
    record[key].forEach((obj, index) => {
      Object.keys(obj).forEach((k) => {
        formParams.append(`${key}[${index}][${k}]`, obj[k])
      })
    })
  }
  fileList.forEach((file) => {
    formParams.append('fileList', file)
  })
  userApi.reqPhotoUpload(formParams).then((res) => {
    console.log(res)
  })
  // console.log('createList', createList)
  // console.log('updateList', updateList)
  // console.log('deleteList', deleteList)
  // console.log('fileList', fileList)
}
</script>

<template>
  <h1>照片管理</h1>
  <SmartUpload v-if="photoList" v-model="photoList" :limit="99" multiple />
  <div mt-24>
    <n-button type="primary" @click="handleCommit">提交</n-button>
  </div>
</template>

<style lang="scss" scoped></style>
