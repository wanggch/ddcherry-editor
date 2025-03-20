<template>
  <el-dialog
    title="编辑器设置"
    v-model="dialogVisible"
    width="600px"
  >
    <el-tabs>
      <el-tab-pane label="主题设置">
        <div class="setting-section">
          <h3 class="text-lg font-medium mb-4">主题</h3>
          <el-radio-group v-model="themeSettings.theme">
            <el-radio label="default">默认主题</el-radio>
            <el-radio label="elegant">优雅主题</el-radio>
            <el-radio label="tech">科技主题</el-radio>
            <el-radio label="dark">暗黑主题</el-radio>
          </el-radio-group>
        </div>
        
        <div class="setting-section mt-6">
          <h3 class="text-lg font-medium mb-4">代码高亮主题</h3>
          <el-select v-model="themeSettings.codeTheme" placeholder="选择代码主题">
            <el-option label="GitHub" value="github"></el-option>
            <el-option label="Monokai" value="monokai"></el-option>
            <el-option label="VS Code" value="vscode"></el-option>
            <el-option label="Atom One Dark" value="atom-one-dark"></el-option>
          </el-select>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="字体与排版">
        <div class="setting-section">
          <h3 class="text-lg font-medium mb-4">字体大小</h3>
          <el-slider
            v-model="fontSettings.fontSize"
            :min="12"
            :max="24"
            :step="1"
            show-input
          ></el-slider>
        </div>
        
        <div class="setting-section mt-6">
          <h3 class="text-lg font-medium mb-4">行高</h3>
          <el-slider
            v-model="fontSettings.lineHeight"
            :min="1"
            :max="2.5"
            :step="0.1"
            show-input
          ></el-slider>
        </div>
        
        <div class="setting-section mt-6">
          <h3 class="text-lg font-medium mb-4">段落间距</h3>
          <el-slider
            v-model="fontSettings.paragraphSpacing"
            :min="0.5"
            :max="3"
            :step="0.1"
            show-input
          ></el-slider>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="图片设置">
        <div class="setting-section">
          <h3 class="text-lg font-medium mb-4">图片对齐方式</h3>
          <el-radio-group v-model="imageSettings.align">
            <el-radio label="left">左对齐</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="right">右对齐</el-radio>
          </el-radio-group>
        </div>
        
        <div class="setting-section mt-6">
          <h3 class="text-lg font-medium mb-4">图片边框</h3>
          <el-switch
            v-model="imageSettings.border"
            active-text="显示边框"
            inactive-text="无边框"
          ></el-switch>
        </div>
        
        <div class="setting-section mt-6">
          <h3 class="text-lg font-medium mb-4">圆角大小</h3>
          <el-slider
            v-model="imageSettings.borderRadius"
            :min="0"
            :max="20"
            :step="1"
            show-input
            :disabled="!imageSettings.border"
          ></el-slider>
        </div>
      </el-tab-pane>
    </el-tabs>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="saveSettings">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useEditorStore } from '../stores/editor'

const editorStore = useEditorStore()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

// 监听visible属性变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
})

// 监听对话框状态变化
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

// 主题设置
const themeSettings = reactive({
  theme: editorStore.theme,
  codeTheme: editorStore.codeTheme
})

// 字体设置
const fontSettings = reactive({
  fontSize: editorStore.config.fontSize,
  lineHeight: editorStore.config.lineHeight,
  paragraphSpacing: editorStore.config.paragraphSpacing
})

// 图片设置
const imageSettings = reactive({
  align: editorStore.config.imageStyle.align,
  border: editorStore.config.imageStyle.border,
  borderRadius: editorStore.config.imageStyle.borderRadius
})

// 保存设置
function saveSettings() {
  // 更新主题设置
  editorStore.setTheme(themeSettings.theme)
  editorStore.setCodeTheme(themeSettings.codeTheme)
  
  // 更新配置
  editorStore.updateConfig({
    fontSize: fontSettings.fontSize,
    lineHeight: fontSettings.lineHeight,
    paragraphSpacing: fontSettings.paragraphSpacing,
    imageStyle: {
      align: imageSettings.align,
      border: imageSettings.border,
      borderRadius: imageSettings.borderRadius
    }
  })
  
  dialogVisible.value = false
}
</script>

<style scoped>
.setting-section {
  @apply mb-6;
}

.dialog-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-button) {
  font-weight: normal;
}
</style> 