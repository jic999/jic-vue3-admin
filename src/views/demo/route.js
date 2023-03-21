import Layout from '@/components/Layout/index.vue'

export default {
  path: '/demo',
  name: 'DemoView',
  redirect: '/demo/component',
  component: Layout,
  meta: {
    title: '示例代码',
    order: 2,
  },
  children: [
    {
      path: 'component',
      name: 'Component',
      component: () => import('./component/index.vue'),
    },
    {
      path: 'crud',
      name: 'Crud',
      children: [
        {
          path: 'crud1',
          name: 'Crud1',
          component: () => import('./crud/crud1.vue'),
        },
        {
          path: 'crud2',
          name: 'Crud2',
          component: () => import('./crud/crud2.vue'),
        },
      ],
    },
  ],
}
