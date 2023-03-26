<script setup>
import { reactive, ref, nextTick, computed } from 'vue'
import TheIcon from '@/components/icon/TheIcon.vue'
import _ from 'lodash'

/**
 * TODO 限制文件大小、类型
 *  */
const props = defineProps({
  modelValue: {
    type: null,
    default: undefined,
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1,
  },
  files: {
    type: Array,
    default: undefined,
  },
  urlFiled: {
    type: String,
    default: 'url',
  },
  fileFiled: {
    type: String,
    default: 'raw',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const $emits = defineEmits(['update:modelValue'])

function createImage(file) {
  const myImage = {}
  myImage[props.urlFiled] = URL.createObjectURL(file)
  myImage[props.fileFiled] = file
  return myImage
}

const $upload = ref()

const fileList = reactive([])

if (props.files || props.modelValue) {
  transFiles()
}

/**
 * 已有图片预览
 * 先转为MyImage 再加入fileList
 */
function transFiles() {
  const tmp = props.files || props.modelValue
  if (_.isArray(tmp) && tmp.length > 0) {
    tmp.forEach((img) => {
      fileList.push(img)
    })
  } else if (_.isObject(tmp) && !_.isEmpty(tmp)) {
    fileList.push(tmp)
  } else if (_.isString(tmp)) {
    const myImage = {}
    myImage[props.urlFiled] = tmp
    fileList.push(myImage)
  }
}

const action = ref('add') // add | update

const disabledAdd = computed(
  () => fileList.length >= props.limit || props.disabled
)
const allowMultiple = computed(
  () => props.multiple && action.value !== 'update' && props.limit > 1
)
const limitMsg = computed(() => `至多可上传${props.limit}张图片`)

function addImg() {
  action.value = 'add'
  $upload.value.click()
}

let currentIndex = -1
function binding() {
  props.modelValue && $emits('update:modelValue', fileList)
}
function updateImg(i) {
  currentIndex = i
  action.value = 'update'
  nextTick(() => $upload.value.click())
}
function deleteImg(i) {
  fileList.splice(i, 1)
  binding()
}
function viewImg(e) {
  console.log(
    'view',
    /**
     * TODO 待优化
     */
    e.target.parentNode.parentNode.parentNode
      .querySelector('.n-image img')
      .click()
  )
}
function onChange(e) {
  const files = e.target.files
  if (files.length === 0) return
  // 上传图片超过上限 弹出提示
  if (
    fileList.length + Object.keys(files).length > props.limit &&
    action.value === 'add'
  )
    return $message.warning(limitMsg.value)
  const handlers = {
    add() {
      if (props.limit > 1) {
        Object.keys(files).forEach((key) => {
          fileList.push(createImage(files[key]))
        })
      } else {
        fileList.push(createImage(files[0]))
      }
    },
    update() {
      // 添加到对应项
      Object.assign(fileList[currentIndex], {
        ...createImage(files[0]),
        oldUrl: fileList[currentIndex].url,
      })
      // fileList.splice(currentIndex, 1, createImage(files[0]))
    },
  }
  handlers[action.value]()
  binding()
}

defineExpose({
  getFileList: () => fileList,
})
</script>

<template>
  <div flex flex-wrap gap-8>
    <div
      v-for="(img, i) in fileList"
      :key="i"
      class="preview-img relative wh-80 br-8 overflow-hidden"
    >
      <n-image
        class="wh-full"
        :src="img[urlFiled]"
        object-center
        object-cover
      />
      <div
        v-if="!disabled"
        :class="`preview-img__mark absolute t-0 l-0 flex-center gap-2 wh-full
        bg-00000055 text-fff`"
      >
        <TheIcon
          class="cursor-pointer"
          icon="carbon:search"
          :size="16"
          @click="viewImg"
        />
        <TheIcon
          class="cursor-pointer"
          icon="carbon:edit"
          :size="16"
          @click="updateImg(i)"
        />
        <TheIcon
          class="cursor-pointer"
          icon="carbon:trash-can"
          :size="16"
          @click="deleteImg(i)"
        />
      </div>
    </div>
    <div
      v-if="!disabledAdd"
      :class="`flex-center wh-80 br-8 border-1 border-dashed border-gray-5 bg-eee
      cursor-pointer hover:border-primary hover:text-primary`"
      @click="addImg"
    >
      <TheIcon icon="carbon:add" :size="20" color="currentColor" />
    </div>
    <input
      ref="$upload"
      class="hidden"
      type="file"
      :accept="accept"
      :multiple="allowMultiple"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.preview-img {
  &__mark {
    visibility: hidden;
  }
  &:hover > &__mark {
    visibility: visible;
  }
}
</style>
