import { ref, computed } from 'vue'

const ACTIONS_TEXT = {
  create: '新增',
  update: '更新',
  view: '查看',
}

export default function ({
  title,
  formItems,
  reqCreate,
  reqUpdate,
  reqDelete,
  refresh,
  createParamsHandler = (params) => params,
  updateParamsHandler = (params) => params,
}) {
  const formTitle = computed(() => ACTIONS_TEXT[formAction.value] + title)
  const formAction = ref('')
  const formVisible = ref(false)
  const formLoading = ref(false)

  const $form = ref()

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
  function handleDelete(id) {
    $dialog.warning({
      title: `删除${title}`,
      content: `确认删除？`,
      positiveText: '确认',
      negativeText: '取消',
      autoFocus: false,
      onPositiveClick: async () => {
        const msgLoading = $message.loading('删除中', { duration: 0 })
        try {
          const { code, msg } = await reqDelete(id)
          if (code !== 0) throw new Error(msg)
          $message.success('删除成功')
          refresh()
        } catch (err) {
          $message.error(err.message || '删除失败，请稍后再试')
        } finally {
          msgLoading.destroy()
        }
      },
    })
  }
  async function handleCommit() {
    if (formAction.value === 'view') return handleCancel()
    const error = await $form.value?.validate()
    if (error) return
    const formData = $form.value.getFormData()
    const handler = {
      create: () => reqCreate(createParamsHandler(formData)),
      update: () => reqUpdate(updateParamsHandler(formData)),
    }
    try {
      formLoading.value = true
      const { code, msg } = await handler[formAction.value]()
      if (code !== 0) throw new Error(msg)
      $message.success(msg)
      refresh()
      handleCancel()
    } catch (err) {
      $message.error(err.message || '提交失败，请稍后再试')
    } finally {
      formLoading.value = false
    }
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
    formLoading,
    ctrlFormItems,
    refresh,
    $form,
    handleView,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleCommit,
    handleCancel,
  }
}
