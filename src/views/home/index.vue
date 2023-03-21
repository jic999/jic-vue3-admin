<script setup name="Home">
import { onMounted } from 'vue'
import TheIcon from '@/components/icon/TheIcon.vue'
import { useUserStore } from '@/stores/user'

const { userInfo } = useUserStore()

console.log(userInfo)

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
