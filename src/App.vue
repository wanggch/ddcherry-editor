<template>
  <div class="app-container">
    <Header @open-settings="openSettings" />
    <div class="main-content">
      <div class="editor-section">
        <MarkdownEditor 
          :modelValue="markdownContent"
          @update:modelValue="updateContent"
          :fontSize="editorStore.config.fontSize" 
        />
      </div>
      <div class="preview-section">
        <MarkdownPreview :content="markdownContent" />
      </div>
    </div>
    <SettingsDrawer v-model:visible="settingsVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useEditorStore } from './stores/editor'
import Header from './components/Header.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

// 初始化编辑器存储
const editorStore = useEditorStore()
const settingsVisible = ref(false)

// 编辑器内容双向绑定 - 从 editorStore 获取初始值
const markdownContent = ref(editorStore.markdownContent)

// 自动保存的定时器
let autoSaveTimer: number | null = null

/**
 * 更新编辑器内容
 * 当用户在编辑器中输入内容时，此函数会被调用
 */
function updateContent(newValue: string) {
  markdownContent.value = newValue
}

/**
 * 自动保存功能
 * 将当前编辑器内容保存到localStorage
 */
function autoSave() {
  if (markdownContent.value) {
    localStorage.setItem('markdownContent', markdownContent.value)
  }
}

/**
 * 设置自动保存定时器
 * 每隔一段时间自动保存当前编辑内容
 */
function setupAutoSave() {
  autoSaveTimer = window.setInterval(() => {
    autoSave()
  }, 5000) // 每5秒保存一次
}

/**
 * 打开设置面板
 */
function openSettings() {
  settingsVisible.value = true
}

// 监听内容变化，同步到编辑器存储
watch(markdownContent, (newContent) => {
  editorStore.setMarkdownContent(newContent)
})

// 组件挂载时设置自动保存
onMounted(() => {
  // 确保内容已从store中加载
  nextTick(() => {
    // 如果编辑器内容为空，但store中有内容，则使用store中的内容
    if (!markdownContent.value && editorStore.markdownContent) {
      markdownContent.value = editorStore.markdownContent
    }
  })
  
  // 设置自动保存
  setupAutoSave()
})

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  --primary-color: #6366f1;  /* indigo-500 */
  --primary-light: #e0e7ff;  /* indigo-100 */
  --primary-dark: #4f46e5;   /* indigo-600 */
  --secondary-color: #64748b; /* slate-500 */
  --bg-color: #f8fafc;        /* slate-50 */
  --text-color: #334155;      /* slate-700 */
  --border-color: #e2e8f0;    /* slate-200 */
  
  background-color: var(--bg-color);
  color: var(--text-color);
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 64px); /* 减去头部高度 */
}

.editor-section, .preview-section {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.editor-section {
  border-right: 1px solid var(--border-color);
}

/* 使用自定义的主题样式 */
:deep(.el-button--primary) {
  --el-button-bg-color: var(--primary-color);
  --el-button-border-color: var(--primary-color);
  --el-button-hover-bg-color: var(--primary-dark);
  --el-button-hover-border-color: var(--primary-dark);
}

:deep(.el-button--info) {
  --el-button-bg-color: var(--secondary-color);
  --el-button-border-color: var(--secondary-color);
  }
  
:deep(.el-button--info.is-plain) {
  --el-button-bg-color: transparent;
  --el-button-border-color: var(--border-color);
  --el-button-hover-bg-color: var(--primary-light);
  --el-button-hover-border-color: var(--primary-color);
  --el-button-hover-text-color: var(--primary-dark);
}
</style>
