<script setup>
import { h, ref } from 'vue'
import { NButton, NSwitch } from 'naive-ui'
import { renderIcon } from '@/utils/icon'
import SmartTable from '@/components/crud/SmartTable.vue'
import SmartForm from '@/components/crud/SmartForm.vue'

import userApi from '@/api/user'

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
    key: 'avatarUrl',
    width: 100,
    render(row) {
      if (row.avatarUrl) return h('img', { src: row.avatarUrl, class: 'wh-36' })
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
        0: { backgroundColor: '#e2e2e2' },
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
          { type: 'primary', size: 'tiny' },
          {
            default: () => '查看',
            icon: renderIcon('carbon:view', { side: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'default', size: 'tiny' },
          {
            default: () => '编辑',
            icon: renderIcon('carbon:edit', { side: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'error', size: 'tiny' },
          {
            default: () => '删除',
            icon: renderIcon('carbon:trash-can', { side: 14 }),
          }
        ),
      ])
    },
  },
]

// TODO SmartTable
// 增删改查 分页

userApi.reqList().then((res) => {
  console.log(res)
})

/* 模态框 */
const modalVisible = ref(false)

const modalStyle = {
  width: '600px',
}
const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '0 16px',
}
function handleCommit() {
  $message.success('提交成功')
}
function handleCancel() {
  $message.info('取消')
}
</script>

<template>
  <h1>Crud1</h1>
  <n-button @click="modalVisible = true">Click!</n-button>
  <n-modal
    v-model:show="modalVisible"
    class="custom-card"
    preset="card"
    :style="modalStyle"
    :footer-style="modalFooterStyle"
    title="卡片预设"
    size="huge"
    :bordered="false"
  >
    <SmartForm :form-items="{}" />
    <template #footer>
      <n-button @click="handleCancel">取消</n-button>
      <n-button type="primary" @click="handleCommit">提交</n-button>
    </template>
  </n-modal>
  <SmartTable
    :columns="columns"
    :get-data="userApi.reqList"
    :scroll-x="1500"
    bordered
  />
</template>

<style lang="scss" scoped></style>
