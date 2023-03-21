<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { renderIcon, renderCustomIcon } from '@/utils/icon'

const route = useRoute()
const router = useRouter()

const menuOptions = router.options.routes
  .map((item) => getMenuItem(item))
  .sort((a, b) => a.order - b.order)

function getMenuItem(route) {
  const menuItem = {
    label: route.meta?.title || route.name,
    key: route.name,
    path: route.path,
    order: route.meta?.order || 0,
    icon: getIcon(route.meta),
  }
  if (!route.children) return menuItem
  if (route.isSingle)
    return {
      ...menuItem,
      key: route.children[0].name,
    }
  menuItem.children = route.children.map((item) => getMenuItem(item))
  return menuItem
}
function getIcon(meta) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
  return null
}

function handleChangeMenu(key) {
  router.push({ name: key })
  defaultActive.value = key
}
const defaultActive = ref(route.name)
</script>

<template>
  <a href="#" text-center pt-20 pb-12 text-18 italic>Vue3 Naive Admin</a>
  <n-menu
    :options="menuOptions"
    :value="defaultActive"
    @update:value="handleChangeMenu"
  />
</template>

<style lang="scss" scoped></style>
