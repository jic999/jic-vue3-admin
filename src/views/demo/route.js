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
        title: '组件展示',
        icon: 'carbon:3d-mpr-toggle',
      },
    },
    {
      path: 'crud',
      name: 'Crud',
      redirect: 'crud1',
      meta: {
        title: 'Crud',
        icon: 'carbon:data-table',
      },
      children: [
        {
          path: 'crud1',
          name: 'Crud1',
          component: () => import('./crud/crud1.vue'),
          meta: {
            title: 'CRUD',
            icon: 'carbon:code',
          },
        },
        {
          path: 'crud2',
          name: 'Crud2',
          component: () => import('./crud/crud2.vue'),
          meta: {
            title: 'SMART_CRUD',
            icon: 'carbon:code',
          },
          childrenHidden: true,
          children: [
            {
              path: 'photo',
              name: 'Photo',
              component: () => import('./crud/photo/index.vue'),
              meta: {
                title: '照片管理',
                icon: 'carbon:image',
                parent: 'Crud2',
              },
            },
          ],
        },
      ],
    },
    {
      path: 'md-editor',
      name: 'MdEditor',
      component: () => import('./md-editor/index.vue'),
      meta: {
        title: 'MD编辑器',
        icon: 'carbon:document',
      },
    },
    {
      path: 'md-render',
      name: 'MdRender',
      component: () => import('./md-render/index.vue'),
      meta: {
        title: 'MD渲染',
        icon: 'carbon:ibm-watson-natural-language-understanding',
      },
    },
  ],
}
