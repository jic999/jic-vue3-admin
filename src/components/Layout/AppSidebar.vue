<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

function handleChangeMenu(key) {
  router.push({ name: key })
  defaultActive.value = key
}
const defaultActive = ref(route.name)
console.log(defaultActive.value)
</script>

<template>
  <n-menu
    :options="menuOptions"
    :value="defaultActive"
    @update:value="handleChangeMenu"
  />
</template>

<style lang="scss" scoped></style>
