import { ref, computed } from 'vue'

const ACTIONS_NAME = {
  create: '新增',
  update: '更新',
  view: '查看',
}

export default function ({ name, formItems }) {
  const formAction = ref('')
  const formVisible = ref(false)
  const formTitle = computed(() => ACTIONS_NAME[formAction.value] + name)

  const ctrlFormItems = ref(formItems)

  function handleView(row) {
    formAction.value = 'view'
    formVisible.value = true
    transFormItems(row)
  }
  function handleUpdate(row) {
    formAction.value = 'update'
    formVisible.value = true
    transFormItems(row)
  }
  function handleCreate() {
    formAction.value = 'create'
    formVisible.value = true
    initFormValue()
  }
  function handleCancel() {
    formVisible.value = false
  }
  function transFormItems(row) {
    Object.keys(row).forEach((key) => {
      if (ctrlFormItems.value[key] !== undefined)
        ctrlFormItems.value[key].value = row[key]
    })
  }
  const initForm = {}
  // 拷贝初始值
  for (let key in formItems) {
    initForm[key] = formItems[key].value
  }
  function initFormValue() {
    Object.keys(initForm).forEach((key) => {
      ctrlFormItems.value[key].value = initForm[key]
    })
  }
  return {
    formTitle,
    formAction,
    formVisible,
    ctrlFormItems,
    handleView,
    handleCreate,
    handleUpdate,
    handleCancel,
  }
}
