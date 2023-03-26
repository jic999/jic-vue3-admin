<script setup>
import { computed, reactive } from 'vue'
import SmartUpload from './SmartUpload.vue'

const props = defineProps({
  formItems: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  excludes: {
    type: Array,
    default: undefined,
  },
})

/**
 * 单格根节点 $attrs自动继承
 */
/**
 * FormItem { label, value, type, attrs, options, rule, formItemAttrs }
 * 数字输入框 NumberInput
 * 字符输入框 Input
 * 开关 Switch
 * 单选框组 Radio
 * 复选框 checkbox 若只有一项 直接绑定value 若多项 value须传入数组[{ ..., value }]
 * 复选框组 CheckboxGroup return []
 * 选择器 Select
 * 级联选择器 Cascader
 */

const $form = ref()

const formData = reactive(transForm())

function transForm() {
  const newForm = {}
  for (let key in props.formItems) {
    newForm[key] = props.formItems[key].value
  }
  return newForm
}
function getFormData() {
  const result = props.excludes ? {} : formData
  if (props.excludes) {
    for (let key in formData) {
      if (!props.excludes.includes(key)) result[key] = formData[key]
    }
  }
  return result
}

const rules = computed(() => {
  const rules = {}
  for (let key in props.formItems) {
    rules[key] = props.formItems[key].rule
  }
  return rules
})

defineExpose({
  validate: () => $form.value.validate(),
  getFormData,
})
</script>

<template>
  <n-form
    ref="$form"
    :model="formData"
    label-placement="left"
    label-width="auto"
    :disabled="disabled"
    :rules="rules"
  >
    <template v-for="(item, key) in formItems" :key="key">
      <n-form-item :label="item.label" :path="key" v-bind="item.formItemAttrs">
        <template v-if="item.type === 'NumberInput'">
          <n-input-number
            v-model:value="formData[key]"
            :placeholder="`请输入${item.label}`"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Input'">
          <n-input
            v-model:value="formData[key]"
            :placeholder="`请输入${item.label}`"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Switch'">
          <n-switch v-model:value="formData[key]" v-bind="item.attrs" />
        </template>
        <template v-else-if="item.type === 'Radio'">
          <n-radio-group v-model:value="formData[key]" name="radiogroup">
            <n-space>
              <n-radio
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </template>
        <template v-else-if="item.type === 'Checkbox'">
          <n-space item-style="display: flex;">
            <n-checkbox
              v-for="(option, i) in item.options"
              :key="option"
              v-model:checked="formData[key][i]"
              :label="option"
            />
          </n-space>
        </template>
        <template v-else-if="item.type === 'CheckboxGroup'">
          <n-checkbox-group v-model:value="formData[key]">
            <n-space item-style="display: flex;">
              <n-checkbox
                v-for="option in item.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </n-space>
          </n-checkbox-group>
        </template>
        <template v-else-if="item.type === 'Select'">
          <n-select
            v-model:value="formData[key]"
            :options="item.options"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Cascader'">
          <n-cascader
            v-model:value="formData[key]"
            :options="item.options"
            children-field="options"
            v-bind="item.attrs"
          />
        </template>
        <template v-else-if="item.type === 'Image'">
          <SmartUpload
            v-model="formData[key]"
            v-bind="item.attrs"
            :disabled="disabled"
          />
        </template>
      </n-form-item>
    </template>
  </n-form>
</template>
