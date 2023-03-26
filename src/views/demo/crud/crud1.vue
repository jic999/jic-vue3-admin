<script setup>
import { h, reactive, ref } from 'vue'
import { NButton, NSwitch } from 'naive-ui'
import _ from 'lodash'
import { renderIcon } from '@/utils/icon'
import SmartTable from '@/components/crud/SmartTable.vue'
import SmartForm from '@/components/crud/SmartForm.vue'
import useCrud from '@/hooks/useCrud'

import userApi from '@/api/user.api'

/* const formItems = reactive({
  id: {
    label: 'id',
    value: 999,
    type: 'NumberInput',
    attrs: { placeholder: 'id', showButton: false },
    rule: {
      trigger: ['input', 'blur'],
      required: true,
      type: 'number',
      message: '请输入id',
    },
  },
  name: {
    label: '姓名',
    value: '',
    type: 'Input',
    attrs: { placeholder: '姓名' },
    rule: {
      trigger: 'blur',
      required: true,
      type: 'string',
      message: '请输入姓名',
    },
  },
  avatar: {
    label: '头像',
    value: {
      url: 'https://th.bing.com/th/id/OIP.wos6Z7P5JxWct-In-pqUtAAAAA?pid=ImgDet&rs=1',
    },
    type: 'Image',
    attrs: {},
  },
  hobby: {
    label: '爱好',
    value: '篮球',
    type: 'Radio',
    options: [
      { label: '唱歌', value: '唱歌' },
      { label: '跳舞', value: '跳舞' },
      { label: '篮球', value: '篮球' },
    ],
  },
  book: {
    label: '书籍',
    value: [false, false, false],
    type: 'Checkbox',
    options: ['孟子', '老子', '韩非子'], // [label]
    rule: {
      validator: (rule, value) => {
        for (let i in value) if (value[i]) return
        return new Error('请至少选中一项')
      },
    },
  },
  game: {
    label: '游戏',
    value: [],
    type: 'CheckboxGroup',
    options: [
      { label: '英雄联盟', value: '英雄联盟' },
      { label: '魔兽争霸', value: '魔兽争霸' },
      { label: '骑马与砍杀', value: '骑马与砍杀' },
      { label: '荒野大镖客', value: '荒野大镖客' },
    ],
  },
  province: {
    label: '省份',
    value: '',
    type: 'Select',
    options: [
      { label: '湖北', value: '湖北' },
      { label: '湖南', value: '湖南' },
      { label: '安徽', value: '安徽' },
    ],
  },
  grade: {
    label: '年级',
    value: '',
    type: 'Cascader',
    attrs: { checkStrategy: 'child' },
    options: [
      {
        label: '初中',
        value: '初中',
        options: [
          { label: '初一', value: '初一' },
          { label: '初二', value: '初二' },
          { label: '初三', value: '初三' },
        ],
      },
      {
        label: '高中',
        value: '高中',
        options: [
          { label: '高一', value: '高一' },
          { label: '高二', value: '高二' },
          { label: '高三', value: '高三' },
        ],
      },
      {
        label: '大学',
        value: '大学',
        options: [
          { label: '大一', value: '大一' },
          { label: '大二', value: '大二' },
          { label: '大三', value: '大三' },
        ],
      },
    ],
  },
}) */
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

const {
  formTitle,
  formAction,
  formVisible,
  ctrlFormItems,
  handleView,
  handleUpdate,
  handleCreate,
  handleDelete,
  handleCancel,
  refresh,
} = useCrud({
  title: '用户',
  formItems,
  reqDelete: userApi.reqDelete,
  refresh: () => $table.value.refresh(),
})

const formLoading = ref(false)

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

const $form = ref()

const $table = ref()

const excludeField = ['updateAt', 'createAt']
function getUpdateParams(formData) {
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
function getCreateParams(formData) {
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

async function handleCommit() {
  const error = await $form.value.validate()
  if (error) return
  const formData = $form.value.getFormData()

  const handler = {
    create: () => userApi.reqCreate(getCreateParams(formData)),
    update: () => userApi.reqUpdate(getUpdateParams(formData)),
  }

  try {
    formLoading.value = true
    const { code, data, msg } = await handler[formAction.value]()
    if (code === 0) {
      // 刷新
      $message.success(msg)
      refresh()
    } else {
      throw new Error(msg)
    }
  } catch (err) {
    $message.error(err.message)
  } finally {
    formLoading.value = false
    handleCancel()
  }
}

const queryParams = ref({})

/* 模态框 */
const modalStyle = {
  width: '600px',
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
