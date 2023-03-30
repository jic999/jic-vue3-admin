<script setup name="MdRenderView">
import { marked } from 'marked'
import { onMounted, ref } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const content = localStorage.getItem('vditorvditor')

const renderedContent = ref()

function highlightCode(code, lang) {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlightedCode = hljs.highlight(code, { language }).value
  return `<pre><code class="hljs ${language}">${highlightedCode}</code></pre>`
}

onMounted(() => {
  renderedContent.value = marked.parse(content, {
    highlight: highlightCode,
  })
})
</script>

<template>
  <h1 border-b>MD Render</h1>
  <div v-html="renderedContent"></div>
</template>

<style lang="scss" scoped></style>
