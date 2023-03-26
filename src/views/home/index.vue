<script setup name="Home">
import { onMounted } from 'vue'
import TheIcon from '@/components/icon/TheIcon.vue'

onMounted(() => {
  $loadingBar.start()
  setTimeout(() => {
    $loadingBar.finish()
    $message.success('加载完成，Perfect~')
  }, 1500)
})
</script>

<template>
  <h1>Home</h1>
  <p text-20>这是一个基于Vue3 + Vite + NaiveUI 的后台管理模板</p>
  <p text-20>目前还在完善中</p>
</template>

<style lang="scss" scoped></style>
