<script setup name="ComponentDemo">
import SmartUpload from '@/components/crud/SmartUpload.vue'
import { reactive } from 'vue'
</script>

<template>
  <h1>Component</h1>
  <SmartUpload multiple :limit="3" />
</template>

<style lang="scss" scoped></style>
