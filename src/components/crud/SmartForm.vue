<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  formItems: {
    type: Object,
    required: true,
  },
})

/**
 * 数字输入框 NumberInput
 * 字符输入框 Input
 * 单选框组 Radio
 * 复选框 checkbox 若只有一项 直接绑定value 若多项 value须传入数组[{ ..., value }]
 * 复选框组 CheckboxGroup return []
 * 选择器 Select
 * 级联选择器 Cascader
 */
const form = reactive({
  id: {
    label: 'id',
    value: 999,
    type: 'NumberInput',
    attrs: { placeholder: 'id', showButton: false },
    rule: {
      trigger: ['input', 'blur'],
      required: true,
      type: 'number',
      message: '请输入id',
    },
  },
  name: {
    label: '姓名',
    value: '',
    type: 'Input',
    attrs: { placeholder: '姓名' },
    rule: {
      trigger: 'blur',
      required: true,
      type: 'string',
      message: '请输入姓名',
    },
  },
  hobby: {
    label: '爱好',
    value: '篮球',
    type: 'Radio',
    options: [
      { label: '唱歌', value: '唱歌' },
      { label: '跳舞', value: '跳舞' },
      { label: '篮球', value: '篮球' },
    ],
  },
  book: {
    label: '书籍',
    value: [false, false, false],
    type: 'Checkbox',
    options: ['孟子', '老子', '韩非子'], // [label]
    rule: {
      validator: (rule, value) => {
        for (let i in value) if (value[i]) return
        return new Error('请至少选中一项')
      },
    },
  },
  game: {
    label: '游戏',
    value: [],
    type: 'CheckboxGroup',
    options: [
      { label: '英雄联盟', value: '英雄联盟' },
      { label: '魔兽争霸', value: '魔兽争霸' },
      { label: '骑马与砍杀', value: '骑马与砍杀' },
      { label: '荒野大镖客', value: '荒野大镖客' },
    ],
  },
  province: {
    label: '省份',
    value: '',
    type: 'Select',
    options: [
      { label: '湖北', value: '湖北' },
      { label: '湖南', value: '湖南' },
      { label: '安徽', value: '安徽' },
    ],
  },
  grade: {
    label: '年级',
    value: '',
    type: 'Cascader',
    attrs: { checkStrategy: 'child' },
    options: [
      {
        label: '初中',
        value: '初中',
        options: [
          { label: '初一', value: '初一' },
          { label: '初二', value: '初二' },
          { label: '初三', value: '初三' },
        ],
      },
      {
        label: '高中',
        value: '高中',
        options: [
          { label: '高一', value: '高一' },
          { label: '高二', value: '高二' },
          { label: '高三', value: '高三' },
        ],
      },
      {
        label: '大学',
        value: '大学',
        options: [
          { label: '大一', value: '大一' },
          { label: '大二', value: '大二' },
          { label: '大三', value: '大三' },
        ],
      },
    ],
  },
})

const $form = ref()

setTimeout(() => {
  console.log($form.value.validate())
}, 1000)

const formData = reactive(transForm(form))

const rules = computed(() => {
  const rules = {}
  for (let key in form) {
    rules[key] = form[key].rule
  }
  return rules
})
function transForm() {
  const newForm = {}
  for (let key in form) {
    newForm[key] = form[key].value
  }
  return newForm
}
</script>

<template>
  <n-form
    ref="$form"
    :model="formData"
    label-placement="left"
    label-width="auto"
    :rules="rules"
  >
    <template v-for="(item, key) in form" :key="key">
      <n-form-item :label="item.label" :path="key">
        <template v-if="item.type === 'NumberInput'">
          <n-input-number v-model:value="formData[key]" v-bind="item.attrs" />
        </template>
        <template v-else-if="item.type === 'Input'">
          <n-input v-model:value="formData[key]" v-bind="item.attrs" />
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
      </n-form-item>
    </template>
  </n-form>
</template>

<style lang="scss" scoped></style>
