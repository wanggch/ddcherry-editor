<template>
  <header class="header">
    <div class="logo">
      <h1 class="text-xl font-bold">微信公众号Markdown编辑器</h1>
    </div>
    <div class="actions">
      <el-tooltip content="复制HTML内容" placement="top">
        <el-button type="primary" @click="copyHtml" size="default">
          <el-icon><Document /></el-icon>
          复制
        </el-button>
      </el-tooltip>
      
      <el-tooltip content="设置" placement="top">
        <el-button type="info" @click="openSettings" size="default">
          <el-icon><Setting /></el-icon>
          设置
        </el-button>
      </el-tooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import copy from 'clipboard-copy'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['open-settings'])

function copyHtml() {
  try {
    const previewContent = document.querySelector('.preview-content')
    
    if (!previewContent) {
      ElMessage.error('无法找到预览内容')
      return
    }
    
    // 复制HTML内容
    // const cleanHtml = cleanHtmlForWechat(previewContent.innerHTML)
    // copy(cleanHtml)
    // 微信公众号格式
    previewContent.focus()
    const range = document.createRange()
    range.setStartBefore(previewContent.firstChild!)
    range.setEndAfter(previewContent.lastChild!)
    window.getSelection()!.addRange(range)
    document.execCommand('copy')
    window.getSelection()!.removeAllRanges()
    
    ElMessage.success('HTML内容已复制到剪贴板，可直接粘贴到微信公众号')
  } catch (error) {
    ElMessage.error('复制失败，请重试')
    console.error('复制失败:', error)
  }
}

function cleanHtmlForWechat(html: string): string {
  let cleanedHtml = html.replace(/ class="[^"]*"/g, '')
  
  cleanedHtml = cleanedHtml.replace(/<img ([^>]*)>/g, (match, p1) => {
    return `<img ${p1.trim()}>`;
  })
  
  cleanedHtml = `<section style="font-family: 微软雅黑, sans-serif; line-height: 1.75;">${cleanedHtml}</section>`
  
  return cleanedHtml
}

function openSettings() {
  emit('open-settings')
}
</script>

<style scoped>
.header {
  @apply flex justify-between items-center px-4 border-b border-gray-200;
  height: 64px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo h1 {
  @apply m-0 text-xl font-bold;
  color: var(--primary-dark);
  background: linear-gradient(90deg, var(--primary-dark), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.actions {
  @apply flex gap-3;
}

/* 按钮自定义样式 */
:deep(.el-button--primary) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.el-button--primary:hover) {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

:deep(.el-button--info) {
  background-color: #f3f4f6;
  border-color: #e5e7eb;
  color: var(--text-color);
}

:deep(.el-button--info:hover) {
  background-color: var(--primary-light);
  border-color: var(--primary-light);
  color: var(--primary-dark);
}
</style> 