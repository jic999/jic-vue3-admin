<script setup name="Home">
import TheIcon from '@/components/icon/TheIcon.vue'
import { onMounted } from 'vue'

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
  <TheIcon icon="carbon:3d-cursor" :size="20" />
</template>

<style lang="scss" scoped></style>
