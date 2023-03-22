<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  getData: {
    type: Function,
    required: true,
  },
})

const isLoading = ref(true)
const tableData = ref()

async function handleQuery() {
  try {
    isLoading.value = true
    const { code, data } = await props.getData()
    console.log(code, data)
    if (0 !== code) throw new Error()
    tableData.value = data
  } catch (err) {
    $message.error('请求失败，请稍候再试')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <n-data-table :data="tableData" :loading="isLoading" />
</template>

<style lang="scss" scoped></style>
