<script setup>
import { NSwitch } from 'naive-ui'
import SmartCrud from '@/components/crud/SmartCrud.vue'
import userApi from '@/api/user.api'
import _ from 'lodash'

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
]
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

const tableAttrs = {
  scrollX: 1500,
}
</script>

<template>
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

<style lang="scss" scoped></style>
