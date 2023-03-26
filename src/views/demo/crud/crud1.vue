<script setup>
import { h, reactive, ref } from 'vue'
import { NButton, NSwitch } from 'naive-ui'
import _ from 'lodash'
import { renderIcon } from '@/utils/icon'
import SmartTable from '@/components/crud/SmartTable.vue'
import SmartForm from '@/components/crud/SmartForm.vue'
import useCrud from '@/hooks/useCrud'

import userApi from '@/api/user.api'

/* Form */
const formItems = reactive({
  id: {
    label: 'id',
    value: null,
    type: 'NumberInput',
    attrs: { disabled: true, placeholder: '自动生成' },
  },
  username: {
    label: '用户名',
    value: null,
    type: 'Input',
    rule: {
      required: true,
      type: 'string',
    },
  },
  avatar: {
    label: '头像',
    value: [],
    type: 'Image',
  },
  email: {
    label: '邮箱',
    value: '',
    type: 'Input',
  },
  isVip: {
    label: '是否vip',
    value: 0,
    type: 'Radio',
    options: [
      { label: '否', value: 0 },
      { label: '是', value: 1 },
    ],
  },
  type: {
    label: '用户类型',
    value: 0,
    type: 'Radio',
    options: [
      { label: '普通用户', value: 0 },
      { label: '管理员', value: 1 },
    ],
  },
  status: {
    label: '状态',
    value: 0,
    type: 'Radio',
    options: [
      { label: '正常', value: 0 },
      { label: '禁用', value: -1 },
    ],
  },
  createAt: {
    label: '创建时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动生成' },
  },
  updateAt: {
    label: '更新时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动生成' },
  },
})
const excludeField = ['updateAt', 'createAt']

const updateParamsHandler = (formData) => {
  const formParams = new FormData()
  const { avatar, ...params } = formData
  for (let key in params) {
    formParams.append(key, params[key])
  }
  if (_.isArray(avatar) && avatar[0].raw) {
    console.log('append avatar')
    formParams.append('avatar', avatar[0].oldUrl)
    formParams.append('avatarFile', avatar[0].raw)
  }
  return formParams
}
const createParamsHandler = (formData) => {
  const formParams = new FormData()
  const { id, avatar, ...params } = formData
  for (let key in params) {
    formParams.append(key, params[key])
  }
  if (_.isArray(avatar) && avatar[0].raw) {
    formParams.append('avatarFile', avatar[0].raw)
  }
  return formParams
}

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
  title: '用户',
  formItems,
  reqUpdate: userApi.reqUpdate,
  reqCreate: userApi.reqCreate,
  reqDelete: userApi.reqDelete,
  refresh: () => $table.value.refresh(),
  createParamsHandler: createParamsHandler,
  updateParamsHandler: updateParamsHandler,
})

const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '用户名',
    key: 'username',
    width: 120,
    ellipsis: { tooltip: true },
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      if (row.avatar) return h('img', { src: row.avatar, class: 'wh-36' })
      else return h('span', {}, '无')
    },
  },
  {
    title: '邮箱',
    key: 'email',
    width: 120,
    ellipsis: { tooltip: true },
  },
  {
    title: '是否vip',
    key: 'isVip',
    width: 100,
    render(row) {
      return h(NSwitch, { value: row.isVip === 1 })
    },
  },
  {
    title: '用户类型',
    key: 'type',
    width: 150,
    render(row) {
      const text = {
        0: '普通用户',
        1: '管理员',
      }
      const style = {
        0: { backgroundColor: 'inherit' },
        1: { backgroundColor: '#18a058', color: '#fff' },
      }
      return h(
        'span',
        { class: 'p-8 br-4', style: { ...style[row.type] } },
        text[row.type]
      )
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 120,
    render(row) {
      return h(NSwitch, { value: row.status === 0 })
    },
  },
  {
    title: '创建时间',
    key: 'createAt',
    render(row) {
      const time = new Date(row.createAt)
      return h('span', {}, time.toLocaleString())
    },
  },
  {
    title: '更新时间',
    key: 'updateAt',
    render(row) {
      const time = new Date(row.updateAt)
      return h('span', {}, time.toLocaleString())
    },
  },
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
    <SmartForm
      ref="$form"
      :form-items="ctrlFormItems"
      :disabled="formAction === 'view'"
      :excludes="excludeField"
    />
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
    :columns="columns"
    :get-data="userApi.reqPage"
    title="用户"
    is-pagination
    :scroll-x="1500"
    bordered
  >
    <template #queryBar>
      <div flex justify-between py-20>
        <div flex gap-12>
          <n-input
            v-model:value="queryParams.username"
            type="text"
            placeholder="请输入用户名"
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

<style lang="scss" scoped></style>
