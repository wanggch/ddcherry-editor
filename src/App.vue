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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useEditorStore } from './stores/editor'
import Header from './components/Header.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import MarkdownPreview from './components/MarkdownPreview.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

const editorStore = useEditorStore()
const settingsVisible = ref(false)

// 编辑器内容双向绑定
const markdownContent = ref('')

// 自动保存的定时器
let autoSaveTimer: number | null = null

// 更新编辑器内容
function updateContent(newValue: string) {
  markdownContent.value = newValue
}

// 自动保存功能
function autoSave() {
  if (markdownContent.value) {
    localStorage.setItem('markdownContent', markdownContent.value)
  }
}

// 设置自动保存
function setupAutoSave() {
  autoSaveTimer = window.setInterval(() => {
    autoSave()
  }, 5000) // 每5秒保存一次
}

// 从localStorage加载内容
function loadFromLocalStorage() {
  const savedContent = localStorage.getItem('markdownContent')
  if (savedContent) {
    markdownContent.value = savedContent
  } else {
    markdownContent.value = getDefaultContent()
  }
}

// 默认的Markdown内容
function getDefaultContent() {
  return `# Markdown 使用指南

## 基本语法

### 1. 标题

使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

### 2. 强调

**粗体**：在文字两端加上 ** 或 __
*斜体*：在文字两端加上 * 或 _
~~删除线~~：在文字两端加上 ~~
<u>下划线</u>：使用 <u>下划线内容</u>

### 3. 列表

无序列表使用 - 或 * 或 + 作为列表标记：

- 第一项
- 第二项
- 第三项

有序列表使用数字并加上 . 号来表示：

1. 第一项
2. 第二项
3. 第三项

### 4. 引用

> 这是一个引用示例
> 
> 多行引用

### 5. 链接和图片

[链接名称](链接地址)
![图片alt](图片地址)

例如：[微信公众平台](https://mp.weixin.qq.com/)

### 6. 表格

| 表头1 | 表头2 | 表头3 |
| ----- | ----- | ----- |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

### 7. 代码

行内代码：\`code\`

代码块：
\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

## 微信公众号排版建议

1. 适当使用标题、加粗等强调效果
2. 控制图片大小，保持页面整洁
3. 使用引用突出重要内容
4. 使用列表让文章结构更清晰
5. 适当使用表格整理数据

祝您使用愉快！`
}

// 监听内容变化
watch(markdownContent, (newContent) => {
  editorStore.setMarkdownContent(newContent)
})

function openSettings() {
  settingsVisible.value = true
}

// 组件挂载时加载内容并设置自动保存
onMounted(() => {
  loadFromLocalStorage()
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
