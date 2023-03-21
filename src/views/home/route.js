import Layout from '@/components/Layout/index.vue'

export default {
  path: '/',
  name: 'HomeView',
  component: Layout,
  redirect: '/home',
  isSingle: true,
  meta: {
    title: '首页',
    order: 0,
    icon: 'carbon:home',
  },
  children: [
    {
      path: 'home',
      name: 'Home',
      component: () => import('./index.vue'),
    },
  ],
}
