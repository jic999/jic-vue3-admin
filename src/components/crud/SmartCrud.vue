<script setup>
import { h, ref } from 'vue'
import { NButton } from 'naive-ui'
import { renderIcon } from '@/utils/icon'
import SmartTable from '@/components/crud/SmartTable.vue'
import SmartForm from '@/components/crud/SmartForm.vue'
import useCrud from '@/hooks/useCrud'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  formItems: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  api: {
    type: Object,
    required: true,
  },
  // 获取formData时需要排除的字段
  excludeField: {
    type: Array,
    default: undefined,
  },
  customActions: {
    type: Boolean,
    default: false,
  },
  createParamsHandler: {
    type: Function,
    default: undefined,
  },
  updateParamsHandler: {
    type: Function,
    default: undefined,
  },
  tableAttrs: {
    type: Object,
    default: undefined,
  },
  formAttrs: {
    type: Object,
    default: undefined,
  },
})

const {
  formTitle,
  formAction,
  formVisible,
  formLoading,
  ctrlFormItems,
  handleView,
  handleUpdate,
  handleCreate,
  handleDelete,
  handleCommit,
  handleCancel,
  refresh,
  $form,
} = useCrud({
  title: props.title,
  formItems: props.formItems,
  reqUpdate: props.api.reqUpdate,
  reqCreate: props.api.reqCreate,
  reqDelete: props.api.reqDelete,
  refresh: () => $table.value.refresh(),
  createParamsHandler: props.createParamsHandler,
  updateParamsHandler: props.updateParamsHandler,
})

const defaultColumns = [
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 216,
    render(row, col, index) {
      return h('div', { class: 'flex gap-12' }, [
        h(
          NButton,
          { type: 'primary', size: 'tiny', onClick: () => handleView(row) },
          {
            default: () => '查看',
            icon: renderIcon('carbon:view', { size: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'default', size: 'tiny', onClick: () => handleUpdate(row) },
          {
            default: () => '编辑',
            icon: renderIcon('carbon:edit', { size: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'error', size: 'tiny', onClick: () => handleDelete(row.id) },
          {
            default: () => '删除',
            icon: renderIcon('carbon:trash-can', { size: 14 }),
          }
        ),
      ])
    },
  },
]
/**
 * TODO 根据不同字段搜索
 */
const $table = ref()
const queryParams = ref({})

/* 模态框 */
const modalStyle = {
  width: '600px',
  maxHeight: '98vh',
}
const modalBodyStyle = {
  overflowY: 'auto',
}
const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  paddingTop: '6px',
  gap: '0 16px',
}
</script>

<template>
  <n-modal
    v-model:show="formVisible"
    class="custom-card"
    preset="card"
    :style="modalStyle"
    :footer-style="modalFooterStyle"
    :content-style="modalBodyStyle"
    :title="formTitle"
    size="huge"
    :auto-focus="false"
    :bordered="false"
  >
    <n-scrollbar>
      <SmartForm
        ref="$form"
        :form-items="ctrlFormItems"
        :disabled="formAction === 'view'"
        :excludes="excludeField"
        v-bind="formAttrs"
      />
    </n-scrollbar>
    <template #footer>
      <n-button @click="handleCancel">取消</n-button>
      <n-button type="primary" :loading="formLoading" @click="handleCommit">
        提交
      </n-button>
    </template>
  </n-modal>
  <SmartTable
    ref="$table"
    v-model:query-params="queryParams"
    :columns="customActions ? columns : [...columns, ...defaultColumns]"
    :get-data="api.reqPage"
    :title="title"
    is-pagination
    bordered
    v-bind="tableAttrs"
  >
    <template #queryBar>
      <div flex justify-between py-20>
        <div flex gap-12>
          <n-input
            v-model:value="queryParams.username"
            type="text"
            placeholder="请输入关键字"
            @keydown.enter="() => $table.handleSearch()"
          />
          <n-button type="primary" @click="() => $table.handleSearch()">
            <template #icon>
              <TheIcon icon="carbon:search" />
            </template>
            搜索
          </n-button>
          <n-button secondary @click="() => $table.handleReset()">
            <template #icon>
              <TheIcon icon="carbon:reset" />
            </template>
            重置
          </n-button>
        </div>
        <div>
          <n-button type="primary" secondary @click="handleCreate">
            <template #icon>
              <TheIcon icon="carbon:add" :size="14" />
            </template>
            新增用户
          </n-button>
        </div>
      </div>
    </template>
  </SmartTable>
</template>
