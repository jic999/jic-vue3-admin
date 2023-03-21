<script setup>
import { h } from 'vue'
import { NButton, NSwitch } from 'naive-ui'
import { renderIcon } from '@/utils/icon'
import SmartTable from '@/components/crud/table/SmartTable.vue'

const columns = [
  {
    title: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '用户名',
    key: 'username',
  },
  {
    title: '邮箱',
    key: 'email',
  },
  {
    title: '是否vip',
    key: 'isVip',
    render(row) {
      return h(NSwitch, { value: row.isVip === 1 })
    },
  },
  {
    title: '头像',
    key: 'avatarUrl',
    render(row) {
      return h('img', { src: row.avatarUrl, class: 'wh-36' })
    },
  },
  {
    title: '用户类型',
    key: 'type',
    render(row) {
      const text = {
        0: '普通用户',
        1: '管理员',
        9: '超级管理员',
      }
      const style = {
        0: { backgroundColor: '#e2e2e2' },
        1: { backgroundColor: '#18a058', color: '#fff' },
        9: { backgroundColor: '#009688', color: '#fff' },
      }

      return h(
        'span',
        { class: 'p-8 br-4', style: { ...style[row.type] } },
        text[row.type]
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 132,
    render(row, col, index) {
      return h('div', { class: 'flex gap-12' }, [
        h(
          NButton,
          { type: 'primary', size: 'small' },
          {
            default: () => '查看',
            icon: renderIcon('carbon:view', { side: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'default', size: 'small' },
          {
            default: () => '编辑',
            icon: renderIcon('carbon:edit', { side: 14 }),
          }
        ),
        h(
          NButton,
          { type: 'error', size: 'small' },
          {
            default: () => '删除',
            icon: renderIcon('carbon:trash-can', { side: 14 }),
          }
        ),
      ])
    },
  },
]

const data = [
  {
    id: 61,
    username: 'Timothy Taylor',
    email: 'c.ntev@bixv.pro',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 62,
    username: 'Amy Johnson',
    email: 'u.mniavdbkr@uqmivey.ao',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 63,
    username: 'George Miller',
    email: 'p.xzipdvq@wfkft.ag',
    isVip: 0,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 1,
  },
  {
    id: 64,
    username: 'Amy Martin',
    email: 'e.wroo@ctddsnx.cn',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 65,
    username: 'Anthony Miller',
    email: 'f.fhlszik@jvegqaq.de',
    isVip: 0,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 66,
    username: 'Jessica Clark',
    email: 'b.jfntamexj@dnhcvwygw.nt',
    isVip: 0,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 67,
    username: 'William Harris',
    email: 'k.luuz@kexgml.ht',
    isVip: 0,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 9,
  },
  {
    id: 68,
    username: 'Helen Johnson',
    email: 'b.ntpsz@klhm.ec',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 1,
  },
  {
    id: 69,
    username: 'Brenda Jackson',
    email: 's.xeysxfnel@dfsfln.sy',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 0,
  },
  {
    id: 70,
    username: 'Barbara Jackson',
    email: 'n.bwuwrilq@gzsrgogxx.mr',
    isVip: 1,
    avatarUrl:
      'https:/th.bing.com/th/id/OIP.vE_-AxYszvlZjXDWijrwwwAAAA?pid=ImgDet&rs=1',
    type: 1,
  },
]

const getData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data })
    }, 800)
  })
</script>

<template>
  <h1>Crud1</h1>
  <SmartTable :columns="columns" :get-data="getData" />
</template>

<style lang="scss" scoped></style>
