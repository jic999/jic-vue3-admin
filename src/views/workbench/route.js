import Layout from '@/components/Layout/index.vue'

export default {
  path: '/workbench',
  name: 'WorkbenchView',
  component: Layout,
  redirect: '/workbench',
  isSingle: true,
  meta: {
    title: '工作台',
    order: 1,
    icon: 'carbon:cloud-alerting',
  },
  children: [
    {
      path: '',
      name: 'Workbench',
      component: () => import('./index.vue'),
    },
  ],
}
