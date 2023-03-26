<script setup name="AppProvider">
import { defineComponent, h } from 'vue'
import {
  useLoadingBar,
  useDialog,
  useMessage,
  useNotification,
  zhCN,
  dateZhCN,
} from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#009688FF',
    primaryColorHover: '#009688E3',
    primaryColorPressed: '#007766ff',
    primaryColorSuppl: '#009688a4',
  },
}

// 挂载naive组件的方法至window, 以便在全局使用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
