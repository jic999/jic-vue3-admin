<script setup>
import { RouterView, useRouter } from 'vue-router'
import { NButton, NSwitch } from 'naive-ui'
import SmartCrud from '@/components/crud/SmartCrud.vue'
import userApi from '@/api/user'
import _ from 'lodash'

const router = useRouter()

function pushWithData({ name, data }) {
  router.beforeEach((to) => {
    to.meta.data = data
  })
  router.push({ name })
}

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
  createdAt: {
    label: '创建时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动生成' },
  },
  updatedAt: {
    label: '更新时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动生成' },
  },
})

const columns = [
  {
    title: 'id',
    key: 'id',
    width: 80,
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
    width: 60,
    render(row) {
      if (row.avatar)
        return h('img', {
          src: row.avatar,
          class: 'wh-36 object-cover object-center',
        })
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
    width: 60,
    render(row) {
      return h(NSwitch, { value: row.isVip === 1, size: 'small' })
    },
  },
  {
    title: '用户类型',
    key: 'type',
    width: 120,
    render(row) {
      const text = {
        0: '普通用户',
        1: '管理员',
      }
      const style = {
        0: { color: 'inherit' },
        1: { color: 'var(--primary-c)', fontWeight: 600 },
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
    width: 60,
    render(row) {
      return h(NSwitch, { value: row.status === 0, size: 'small' })
    },
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 150,
    render(row) {
      const time = new Date(row.createdAt)
      return h('span', {}, time.toLocaleString())
    },
  },
  {
    title: '更新时间',
    key: 'updatedAt',
    width: 150,
    render(row) {
      const time = new Date(row.updatedAt)
      return h('span', {}, time.toLocaleString())
    },
  },
  {
    title: '图片管理',
    width: 80,
    render(row) {
      return h(
        NButton,
        {
          type: 'primary',
          size: 'tiny',
          secondary: true,
          onClick: () => router.push({ name: 'Photo', state: row }),
        },
        () => '管理'
      )
    },
  },
]
const excludeField = ['updatedAt', 'createdAt']
const updateParamsHandler = (formData) => {
  console.log(formData)
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

const tableAttrs = {
  scrollX: 1200,
}
</script>

<template>
  <template v-if="$route.name === 'Crud2'">
    <SmartCrud
      title="用户"
      :form-items="formItems"
      :columns="columns"
      :exclude-field="excludeField"
      :api="userApi"
      :table-attrs="tableAttrs"
      :create-params-handler="createParamsHandler"
      :update-params-handler="updateParamsHandler"
    />
  </template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
