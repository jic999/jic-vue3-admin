<script setup>
import TheIcon from '@/components/Icon/TheIcon.vue'
</script>

<template>
  <div flex justify-between items-center h-60 px-24>
    <div>1</div>
    <div>
      <div flex items-center gap-8>
        <span>未登录</span>
        <TheIcon icon="carbon:user-avatar-filled-alt" :size="30" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
