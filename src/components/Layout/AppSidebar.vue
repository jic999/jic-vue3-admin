<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { renderIcon, renderCustomIcon } from '@/utils/icon'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

const route = useRoute()
const router = useRouter()

const menuOptions = router.options.routes
  .filter((item) => !item.isHidden && item.name)
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
  <a
    class="flex-center text-center mt-24 mb-12 text-16 italic whitespace-nowrap"
    style="color: var(--primary-c)"
    href="#"
  >
    <TheIcon icon="ep:apple" :size="24" />
    <span v-if="!appStore.collapsed" ml-4 font-600>Vue3 Naive Admin</span>
  </a>
  <n-menu
    :options="menuOptions"
    :value="defaultActive"
    :indent="12"
    @update:value="handleChangeMenu"
  />
</template>

<style lang="scss" scoped></style>
