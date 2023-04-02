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
  imgStyle: {
    type: Object,
    default: () => ({}),
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

const previewList = computed(() =>
  formatFileList(props.modelValue || props.files)
)

const fileList = reactive(previewList.value)

/**
 * 已有图片预览
 * ImageItem 再加入fileList
 */
function formatFileList(files) {
  if (_.isArray(files) && files.length > 0) return [...files]
  if (_.isObject(files) && !_.isEmpty(files)) return files
  if (_.isString(files)) {
    const imageItem = {}
    imageItem[props.urlFiled] = files
    return [imageItem]
  }
  return []
}

const action = ref('add') // add | update

const disabledAdd = computed(
  () =>
    previewList.value.length >= props.limit ||
    fileList.length > props.limit ||
    props.disabled
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
  !_.isUndefined(props.modelValue) && $emits('update:modelValue', fileList)
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
const $fileList = ref()
function viewImg(i) {
  /**
   * TODO 待优化
   */
  $fileList.value[i].querySelector('img').click()
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

const imgStyle = computed(() => ({
  width: 100,
  height: 100,
  objectFit: 'contain',
  objectPosition: 'center',
  ...props.imgStyle,
}))

const iconSize = computed(() => {
  const size = imgStyle.value.width / 8
  return size > 16 ? size : 16
})

defineExpose({
  getFileList: () => fileList,
})
</script>

<template>
  <div flex flex-wrap gap-8>
    <div
      v-for="(img, i) in previewList.length > 0 ? previewList : fileList"
      ref="$fileList"
      :key="i"
      class="preview-img relative br-8 overflow-hidden"
      :style="{ width: `${imgStyle.width}px`, height: `${imgStyle.height}px` }"
    >
      <n-image class="wh-full" :src="img[urlFiled]" v-bind="imgStyle" border />
      <div
        v-if="!disabled"
        :class="`preview-img__mark absolute t-0 l-0 flex-center gap-4 wh-full
        bg-00000054 text-gray-3`"
      >
        <TheIcon
          class="action-icon cursor-pointer"
          icon="carbon:search"
          :size="iconSize"
          @click.stop="viewImg(i)"
        />
        <TheIcon
          class="action-icon cursor-pointer"
          icon="carbon:edit"
          :size="iconSize"
          @click.stop="updateImg(i)"
        />
        <TheIcon
          class="action-icon cursor-pointer"
          icon="carbon:trash-can"
          :size="iconSize"
          @click.stop="deleteImg(i)"
        />
      </div>
    </div>
    <div
      v-if="!disabledAdd"
      :class="`flex-center wh-80 br-8 border-1 border-dashed border-gray-5 bg-eee
      cursor-pointer hover:border-primary hover:text-primary`"
      :style="{ width: `${imgStyle.width}px`, height: `${imgStyle.height}px` }"
      @click="addImg"
    >
      <TheIcon icon="carbon:add" :size="iconSize" color="currentColor" />
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
.action-icon {
  transition: color 0.2s;
  &:hover {
    color: #fff;
  }
}
</style>
