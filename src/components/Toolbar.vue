<template>
  <div class="toolbar">
    <!-- 文本格式工具 -->
    <div class="format-tools">
      <!-- 粗体 -->
      <el-tooltip content="粗体" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('bold')">
          <Icon icon="mdi:format-bold" />
        </el-button>
      </el-tooltip>
      
      <!-- 斜体 -->
      <el-tooltip content="斜体" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('italic')">
          <Icon icon="mdi:format-italic" />
        </el-button>
      </el-tooltip>
      
      <!-- 删除线 -->
      <el-tooltip content="删除线" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('strikethrough')">
          <Icon icon="mdi:format-strikethrough" />
        </el-button>
      </el-tooltip>
      
      <!-- 下划线 -->
      <el-tooltip content="下划线" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('underline')">
          <Icon icon="mdi:format-underline" />
        </el-button>
      </el-tooltip>
      
      <!-- 无序列表 -->
      <el-tooltip content="无序列表" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('unorderedList')">
          <Icon icon="mdi:format-list-bulleted" />
        </el-button>
      </el-tooltip>
      
      <!-- 有序列表 -->
      <el-tooltip content="有序列表" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('orderedList')">
          <Icon icon="mdi:format-list-numbered" />
        </el-button>
      </el-tooltip>
      
      <!-- 引用 -->
      <el-tooltip content="引用" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="formatText('quote')">
          <Icon icon="mdi:format-quote-close" />
        </el-button>
      </el-tooltip>
      
      <!-- 标题 -->
      <el-tooltip content="标题" placement="top">
        <el-dropdown @command="insertHeading">
          <el-button class="toolbar-button" type="info" plain>
            <Icon icon="mdi:format-header-pound" />
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">H1</el-dropdown-item>
              <el-dropdown-item command="2">H2</el-dropdown-item>
              <el-dropdown-item command="3">H3</el-dropdown-item>
              <el-dropdown-item command="4">H4</el-dropdown-item>
              <el-dropdown-item command="5">H5</el-dropdown-item>
              <el-dropdown-item command="6">H6</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </div>
    
    <!-- 分隔符 -->
    <div class="divider"></div>
    
    <!-- 插入工具 -->
    <div class="insert-tools">
      <!-- 超链接 -->
      <el-tooltip content="插入链接" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="insertLink">
          <Icon icon="mdi:link-variant" />
        </el-button>
      </el-tooltip>
      
      <!-- 插入图片 -->
      <el-tooltip content="插入图片" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="insertImage">
          <Icon icon="mdi:image" />
        </el-button>
      </el-tooltip>
      
      <!-- 插入表格 -->
      <el-tooltip content="插入表格" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="insertTable">
          <Icon icon="mdi:table" />
        </el-button>
      </el-tooltip>
      
      <!-- 插入代码块 -->
      <el-tooltip content="插入代码块" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="insertCodeBlock">
          <Icon icon="mdi:code-braces" />
        </el-button>
      </el-tooltip>
    </div>
    
    <!-- 分隔符 -->
    <div class="divider"></div>
    
    <!-- 操作工具 -->
    <div class="action-tools">
      <el-tooltip content="撤销" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="undo">
          <Icon icon="mdi:undo" />
        </el-button>
      </el-tooltip>
      
      <el-tooltip content="重做" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="redo">
          <Icon icon="mdi:redo" />
        </el-button>
      </el-tooltip>
      
      <el-tooltip content="清除格式" placement="top">
        <el-button class="toolbar-button" type="info" plain @click="clearFormat">
          <Icon icon="mdi:format-clear" />
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEditorStore } from '../stores/editor'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['format'])

// 格式化文本
function formatText(type: string) {
  emit('format', { type })
}

// 插入标题
function insertHeading(level: string) {
  emit('format', { type: 'heading', level })
}

// 插入链接
function insertLink() {
  emit('format', { type: 'link' })
}

// 插入图片
function insertImage() {
  emit('format', { type: 'image' })
}

// 插入代码块
function insertCodeBlock() {
  emit('format', { type: 'codeblock' })
}

// 插入表格
function insertTable() {
  emit('format', { type: 'table' })
}

// 撤销
function undo() {
  emit('format', { type: 'undo' })
}

// 重做
function redo() {
  emit('format', { type: 'redo' })
}

// 清除格式
function clearFormat() {
  emit('format', { type: 'clear' })
}
</script>

<style scoped>
.toolbar {
  @apply flex items-center p-2 border-b border-gray-200;
  height: 48px;
  background-color: #f6f8fa;
}

.format-tools, .insert-tools, .action-tools {
  @apply flex items-center gap-1;
}

.divider {
  @apply h-6 border-l border-gray-300 mx-2;
}

.toolbar-button {
  @apply flex items-center justify-center;
  padding: 6px;
  margin: 0;
  width: 32px;
  height: 32px;
  min-height: 32px;
  color: #334155;
  border-color: #e5e7eb;
}

.toolbar-button:hover {
  @apply bg-indigo-50 border-indigo-300;
  color: #4f46e5;
}

.toolbar-button :deep(.iconify) {
  font-size: 18px;
}
</style> 