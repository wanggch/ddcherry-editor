<template>
  <el-drawer
    v-model="drawerVisible"
    title="编辑器设置"
    direction="rtl"
    size="400px"
  >
    <div class="settings-content">
      <!-- 主题设置 -->
      <div class="setting-section">
        <h3 class="section-title">主题设置</h3>
        
        <div class="setting-item">
          <div class="setting-label">主题</div>
          <el-radio-group v-model="themeSettings.theme" class="theme-select">
            <el-radio label="default">默认主题</el-radio>
            <el-radio label="elegant">优雅主题</el-radio>
            <el-radio label="tech">科技主题</el-radio>
            <el-radio label="dark">暗黑主题</el-radio>
          </el-radio-group>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">代码高亮主题</div>
          <el-select v-model="themeSettings.codeTheme" placeholder="选择代码主题" class="w-full">
            <el-option label="GitHub" value="github"></el-option>
            <el-option label="Monokai" value="monokai"></el-option>
            <el-option label="VS Code" value="vscode"></el-option>
            <el-option label="Atom One Dark" value="atom-one-dark"></el-option>
          </el-select>
        </div>
      </div>
      
      <!-- 字体与排版 -->
      <div class="setting-section">
        <h3 class="section-title">字体与排版</h3>
        
        <div class="setting-item">
          <div class="setting-label">字体大小</div>
          <el-slider 
            v-model="fontSettings.fontSize"
            :min="12" 
            :max="24" 
            :step="1" 
            show-input
          ></el-slider>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">行高</div>
          <el-slider 
            v-model="fontSettings.lineHeight"
            :min="1"
            :max="2.5"
            :step="0.1" 
            show-input
          ></el-slider>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">段落间距</div>
          <el-slider 
            v-model="fontSettings.paragraphSpacing"
            :min="0.5"
            :max="3"
            :step="0.1"
            show-input
          ></el-slider>
        </div>
      </div>
      
      <!-- 图片设置 -->
      <div class="setting-section">
        <h3 class="section-title">图片设置</h3>
        
        <div class="setting-item">
          <div class="setting-label">图片对齐方式</div>
          <el-radio-group v-model="imageSettings.align">
            <el-radio label="left">左对齐</el-radio>
            <el-radio label="center">居中</el-radio>
            <el-radio label="right">右对齐</el-radio>
          </el-radio-group>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">图片边框</div>
          <el-switch
            v-model="imageSettings.border"
            active-text="显示边框"
            inactive-text="无边框"
          ></el-switch>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">圆角大小</div>
          <el-slider
            v-model="imageSettings.borderRadius"
            :min="0"
            :max="20"
            :step="1"
            show-input
            :disabled="!imageSettings.border"
          ></el-slider>
        </div>
      </div>
      
      <div class="settings-actions">
        <el-button @click="resetSettings">重置</el-button>
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useEditorStore } from '../stores/editor'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const editorStore = useEditorStore()

const drawerVisible = ref(props.visible)

// 监听visible属性变化
watch(() => props.visible, (newVal) => {
  drawerVisible.value = newVal
})

// 监听对话框状态变化
watch(drawerVisible, (newVal) => {
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
  
  ElMessage.success('设置已保存')
  drawerVisible.value = false
}

// 重置设置
function resetSettings() {
  themeSettings.theme = 'default'
  themeSettings.codeTheme = 'github'
  
  fontSettings.fontSize = 16
  fontSettings.lineHeight = 1.6
  fontSettings.paragraphSpacing = 1.2
  
  imageSettings.align = 'center'
  imageSettings.border = false
  imageSettings.borderRadius = 0
  
  ElMessage.info('设置已重置')
}
</script>

<style scoped>
.settings-content {
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.setting-section {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--primary-dark);
}

.setting-item {
  margin-bottom: 20px;
}

.setting-label {
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.theme-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.w-full {
  width: 100%;
}

.settings-actions {
  margin-top: auto;
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 