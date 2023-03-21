import Layout from '@/components/Layout/index.vue'

export default {
  path: '/demo',
  name: 'DemoView',
  redirect: '/demo/component',
  component: Layout,
  meta: {
    title: '示例代码',
    order: 2,
    icon: 'carbon:code',
  },
  children: [
    {
      path: 'component',
      name: 'Component',
      component: () => import('./component/index.vue'),
      meta: {
        icon: 'carbon:3d-mpr-toggle',
      },
    },
    {
      path: 'crud',
      name: 'Crud',
      meta: {
        icon: 'carbon:data-table',
      },
      children: [
        {
          path: 'crud1',
          name: 'Crud1',
          component: () => import('./crud/crud1.vue'),
          meta: {
            icon: 'carbon:code',
          },
        },
        {
          path: 'crud2',
          name: 'Crud2',
          component: () => import('./crud/crud2.vue'),
          meta: {
            icon: 'carbon:code',
          },
        },
      ],
    },
  ],
}
