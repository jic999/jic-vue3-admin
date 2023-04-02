<script setup name="MdEditorView">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted, reactive, ref } from 'vue'
import uploadApi from '@/api/upload'
import req from '@/api/axios'
import _ from 'lodash'
import * as qiniu from 'qiniu-js'

const vditor = ref(null)

const uploadInfo = reactive({})

function getContent() {
  const content = vditor.value.getValue()
  console.log(content)
}
function reqQiniuUpload(file) {
  return new Promise((resolve, reject) => {
    const observable = qiniu.upload(
      file,
      `test001/qwe1/${file.name}`,
      uploadInfo.uploadToken
    )
    const observer = {
      error(err) {
        reject(err)
      },
      complete(res) {
        resolve(res)
      },
    }
    observable.subscribe(observer)
  })
}

function createEditor() {
  vditor.value = new Vditor('vditor', {
    minHeight: 480,
    upload: {
      accept: 'image/*,.jpg,.png,.jpeg',
      multiple: true,
      handler: async (files) => {
        const loadingMsg = $message.loading('上传中...', { duration: 0 })
        console.log(files)
        try {
          const reqPromises = []
          files.forEach((file) => {
            reqPromises.push(reqQiniuUpload(file))
          })
          const result = await Promise.all(reqPromises)
          console.log('result', result)
          const urlList = result.map(({ key }) => {
            const url = `//${uploadInfo.domain}/${key}`
            return `![image](${url})`
          })
          $message.success('上传成功~')
          vditor.value.insertValue(urlList.join('\n\n'))
        } catch (error) {
          console.log(error)
          $message.error('上传失败，请稍后再试')
        } finally {
          loadingMsg.destroy()
        }
      },
    },
  })
}

async function getUploadToken() {
  try {
    const { code, data } = await uploadApi.reqQiniuToken()
    if (code !== 0) throw new Error('请求失败')
    Object.assign(uploadInfo, data)
    console.log(data)
  } catch (error) {
    console.log(error.message)
  }
}
onMounted(() => {
  getUploadToken()
  createEditor()
})
</script>

<template>
  <h1 border-b>MD Editor</h1>
  <div id="vditor" />
  <n-button type="primary" @click="getContent">保存</n-button>
</template>
