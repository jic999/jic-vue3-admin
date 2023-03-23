<script setup name="ComponentDemo">
import SmartUpload from '@/components/crud/SmartUpload.vue'
import { reactive, ref, watch } from 'vue'

// const list = ref([])
const $upload = ref()
const list = [
  {
    id: 100,
    name: '李1',
    url: 'https://th.bing.com/th/id/OIP.wos6Z7P5JxWct-In-pqUtAAAAA?pid=ImgDet&rs=1',
  },
  {
    id: 101,
    name: '杜2',
    url: 'https://th.bing.com/th/id/OIP.LQXm5PMROSyyfZSXFC3dKQAAAA?pid=ImgDet&w=400&h=400&rs=1',
  },
  {
    id: 102,
    name: '元3',
    url: 'https://th.bing.com/th/id/OIP.jAoiwR_qOGbyDwUcN-FscwHaHa?pid=ImgDet&rs=1',
  },
]

function log() {
  console.log($upload.value.getFileList())
}
</script>

<template>
  <h1>Component</h1>
  <SmartUpload ref="$upload" v-model="list" multiple :limit="3" />
  <n-button @click="log">打印文件列表</n-button>
</template>

<style lang="scss" scoped></style>
