<script setup name="MdEditorView">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { onMounted } from 'vue'

const vditor = ref(null)

function getContent() {
  const content = vditor.value.getValue()
  console.log(content)
}

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    minHeight: 480,
  })
})
</script>

<template>
  <h1 border-b>MD Editor</h1>
  <div id="vditor" />
  <n-button type="primary" @click="getContent">保存</n-button>
</template>
