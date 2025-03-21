<template>
  <div class="markdown-editor">
    <Toolbar @format="handleFormat" />
    <div class="editor-content">
      <!-- <div class="editor-header">
        <Icon icon="mdi:pencil" class="editor-icon" />
        <span class="editor-title">编辑</span>
      </div> -->
      <Codemirror
        :value="modelValue"
        :style="{ fontSize: `${fontSize}px` }"
        :autofocus="true"
        :indent-with-tab="true"
        :tabSize="2"
        :extensions="extensions"
        @change="handleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { undo, redo } from '@codemirror/commands'
import { useEditorStore } from '../stores/editor'
import Toolbar from './Toolbar.vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  fontSize: {
    type: Number,
    default: 16
  }
})

const emit = defineEmits(['update:modelValue'])

const editorStore = useEditorStore()
const editorView = ref<EditorView>()

// 初始化编辑器扩展
const extensions = [
  markdown(),
  EditorState.allowMultipleSelections.of(true),
  EditorView.lineWrapping,
  oneDark
]

/**
 * 当编辑内容更新时触发
 * @param value 编辑器当前内容
 */
function handleUpdate(value: string) {
  emit('update:modelValue', value)
}

/**
 * 处理工具栏格式化命令
 * @param command 格式化命令对象 
 */
function handleFormat(command: any) {
  if (!editorView.value) return
  
  const { state } = editorView.value
  const selection = state.selection.main
  
  // 获取选中文本
  const selectedText = state.sliceDoc(selection.from, selection.to)
  let newText = selectedText
  
  switch(command.type) {
    case 'bold':
      newText = `**${selectedText}**`
      break
    case 'italic':
      newText = `*${selectedText}*`
      break
    case 'strikethrough':
      newText = `~~${selectedText}~~`
      break
    case 'underline':
      newText = `<u>${selectedText}</u>`
      break
    case 'unorderedList':
      // 处理多行文本
      if (selectedText.includes('\n')) {
        newText = selectedText.split('\n').map(line => `- ${line}`).join('\n')
      } else {
        newText = `- ${selectedText}`
      }
      break
    case 'orderedList':
      // 处理多行文本
      if (selectedText.includes('\n')) {
        newText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n')
      } else {
        newText = `1. ${selectedText}`
      }
      break
    case 'heading':
      // 获取当前行的开始位置
      const line = state.doc.lineAt(selection.from)
      const levelStr = '#'.repeat(parseInt(command.level))
      if (line.from === selection.from && line.to === selection.to) {
        newText = `${levelStr} ${selectedText}`
      } else {
        newText = `${levelStr} ${selectedText}`
      }
      break
    case 'quote':
      // 处理多行文本
      if (selectedText.includes('\n')) {
        newText = selectedText.split('\n').map(line => `> ${line}`).join('\n')
      } else {
        newText = `> ${selectedText}`
      }
      break
    case 'link':
      newText = `[${selectedText || '链接文字'}](https://example.com)`
      break
    case 'image':
      newText = `![${selectedText || '图片描述'}](https://example.com/image.jpg)`
      break
    case 'codeblock':
      newText = `\`\`\`\n${selectedText}\n\`\`\``
      break
    case 'table':
      newText = `| 标题 | 标题 |\n| --- | --- |\n| 内容 | 内容 |`
      break
    case 'undo':
      undo(editorView.value)
      return
    case 'redo':
      redo(editorView.value)
      return
    case 'clear':
      // 简单实现，只移除常见的markdown标记
      newText = selectedText
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        .replace(/~~(.*?)~~/g, '$1')
        .replace(/<u>(.*?)<\/u>/g, '$1')
        .replace(/^#+\s+/gm, '')
        .replace(/^>\s+/gm, '')
        .replace(/^(\d+\.|\-|\*)\s+/gm, '')
      break
  }
  
  // 替换选中的文本
  editorView.value.dispatch({
    changes: { from: selection.from, to: selection.to, insert: newText },
    selection: { anchor: selection.from + newText.length }
  })
}

// 监听props中的modelValue变化，确保编辑器内容与父组件同步
watch(() => props.modelValue, (newValue) => {
  // 检查编辑器实例是否存在，并且内容是否与当前值不同
  if (editorView.value && editorView.value.state.doc.toString() !== newValue) {
    // 更新编辑器内容
    editorView.value.dispatch({
      changes: {
        from: 0,
        to: editorView.value.state.doc.length,
        insert: newValue
      }
    })
  }
}, { immediate: true })

/**
 * 在组件挂载后获取编辑器实例并确保内容正确加载
 */
onMounted(() => {
  // 延迟一会儿确保DOM已渲染
  setTimeout(() => {
    // 通过DOM获取CodeMirror实例
    const editorElement = document.querySelector('.cm-editor') as HTMLElement
    if (editorElement) {
      const view = EditorView.findFromDOM(editorElement)
      if (view) {
        editorView.value = view
        
        // 检查编辑器内容是否为空，而props.modelValue有值
        const currentContent = view.state.doc.toString()
        if (currentContent === '' && props.modelValue) {
          // 设置编辑器内容
          view.dispatch({
            changes: {
              from: 0,
              to: view.state.doc.length,
              insert: props.modelValue
            }
          })
        }
      }
    }
  }, 100)
})
</script>

<style scoped>
.markdown-editor {
  @apply flex flex-col h-full;
  background-color: #ffffff;
}

.editor-content {
  @apply flex-1 overflow-hidden flex flex-col;
}

.editor-header {
  @apply flex items-center px-4 py-2 border-b border-gray-200 bg-gray-50;
}

.editor-icon {
  @apply text-lg mr-2;
  color: var(--primary-color);
}

.editor-title {
  @apply font-medium text-sm;
  color: var(--text-color);
}

:deep(.cm-editor) {
  height: 100%;
  overflow: auto;
}

:deep(.cm-scroller) {
  overflow: auto;
  font-family: 'Fira Code', monospace, 'Courier New', Courier;
}

:deep(.cm-content) {
  padding: 16px;
  line-height: 1.6;
}
</style> 