<script setup name="ComponentDemo">
import { reactive } from 'vue'

const form = reactive({
  id: 1,
})
const rule = {
  trigger: ['input', 'blur'],
  required: true,
  type: 'number',
  message: '请输入id',
}
const rules = {
  id: {
    trigger: ['input', 'blur'],
    required: true,
    type: 'number',
    message: '请输入id',
  },
}
</script>

<template>
  <h1>Component</h1>
  <n-form :model="form" :rules="rules">
    <n-form-item path="id">
      <n-input-number v-model:value="form.id" />
    </n-form-item>
  </n-form>
  <n-form-item path="id" :rule="rule">
    <n-input-number v-model:value="form.id" />
  </n-form-item>
</template>

<style lang="scss" scoped></style>
