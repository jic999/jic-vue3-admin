<script setup>
import { onMounted, reactive } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  getData: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  extraParams: {
    type: Object,
    default: () => ({}),
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  paginationAttrs: {
    type: Object,
    default: () => ({}),
  },
  pageField: {
    type: String,
    default: 'records',
  },
  headerStyle: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:queryParams'])
const initQuery = { ...props.queryParams }
const isLoading = ref(true)
const tableData = ref()

const pageInfo = reactive({
  page: 1,
  pageSize: 5,
  itemCount: 0,
  pageSizes: [5, 10, 15, 20, 25, 30],
  showSizePicker: true,
  onUpdatePage: (page) => {
    pageInfo.page = page
    handleQuery()
  },
  onUpdatePageSize: (pageSize) => {
    pageInfo.pageSize = pageSize
    pageInfo.page = 1
    handleQuery()
  },
  ...props.paginationAttrs,
})

async function handleQuery() {
  try {
    isLoading.value = true
    let paginationParams = {}
    if (props.isPagination) {
      paginationParams = { pageNo: pageInfo.page, pageSize: pageInfo.pageSize }
    }
    const { code, data, msg } = await props.getData({
      ...props.queryParams,
      ...props.extraParams,
      ...paginationParams,
    })
    if (0 !== code) throw new Error(msg)
    if (props.isPagination) {
      tableData.value = data[props.pageField]
      pageInfo.itemCount = data['total']
    } else {
      tableData.value = data
    }
  } catch (err) {
    $message.error(err.message)
  } finally {
    isLoading.value = false
  }
}
function handleSearch() {
  pageInfo.page = 1
  handleQuery()
}
function handleReset() {
  const queryParams = { ...props.queryParams }
  for (const key in queryParams) {
    queryParams[key] = ''
  }
  emit('update:queryParams', { ...queryParams, ...initQuery })
  nextTick(() => {
    pageInfo.page = 1
    console.log(props.queryParams)
    handleQuery()
  })
}

onMounted(() => {
  handleQuery()
})

defineExpose({
  refresh: () => handleQuery(),
  handleSearch,
  handleReset,
})
</script>

<template>
  <div class="flex items-center" :style="headerStyle">
    <h2 :class="{ 'm-0': $slots.queryBar }" font-500>
      {{ (title || '') + '管理' }}
    </h2>
    <slot name="header" />
  </div>
  <slot name="queryBar" />
  <n-data-table :data="tableData" :loading="isLoading" v-bind="$attrs" />
  <div flex justify-end mt-12>
    <n-pagination v-bind="pageInfo" />
  </div>
</template>

<style lang="scss" scoped></style>
