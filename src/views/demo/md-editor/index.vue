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
    const observable = qiniu.upload(file, undefined, uploadInfo.uploadToken)
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
        console.log(files)
        // TODO 文件上传
        try {
          const reqPromises = []
          files.forEach((file) => {
            reqPromises.push(reqQiniuUpload(file))
            // reqQiniuUpload(file)
          })
          // 单次请求
          const result = await Promise.all(reqPromises)
          console.log('result', result)
          // if(vditor.value && vditor.value.vditor.currentMode = 'wysiwyg') {
          // }
          const urlList = result.map(({ key }) => {
            const url = `//${uploadInfo.domain}/${key}`
            return `![image](${url})`
          })
          vditor.value.insertValue(urlList.join('\n'))
        } catch (error) {
          console.log(error)
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
