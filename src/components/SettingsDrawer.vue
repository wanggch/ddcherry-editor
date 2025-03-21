<template>
  <el-drawer
    v-model="drawerVisible"
    title="编辑器设置"
    direction="rtl"
    size="380px"
    :show-close="true"
    class="settings-drawer"
  >
    <div class="settings-content">
      <!-- 主题设置 -->
      <div class="setting-section">
        <div class="section-header">
          <Icon icon="mdi:palette-outline" class="section-icon" />
          <h3 class="section-title">主题设置</h3>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">主题选择</div>
          <el-radio-group v-model="themeSettings.theme" class="theme-select">
            <el-radio-button label="default">默认主题</el-radio-button>
            <el-radio-button label="elegant">优雅主题</el-radio-button>
            <el-radio-button label="tech">科技主题</el-radio-button>
            <el-radio-button label="dark">暗黑主题</el-radio-button>
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
        <div class="section-header">
          <Icon icon="mdi:format-font" class="section-icon" />
          <h3 class="section-title">字体与排版</h3>
        </div>
        
        <div class="setting-item compact">
          <div class="setting-label-group">
            <div class="setting-label">字体大小</div>
            <div class="setting-value">{{ fontSettings.fontSize }}px</div>
          </div>
          <el-slider 
            v-model="fontSettings.fontSize"
            :min="12" 
            :max="24" 
            :step="1" 
          ></el-slider>
        </div>
        
        <div class="setting-item compact">
          <div class="setting-label-group">
            <div class="setting-label">行高</div>
            <div class="setting-value">{{ fontSettings.lineHeight }}</div>
          </div>
          <el-slider 
            v-model="fontSettings.lineHeight"
            :min="1"
            :max="2.5"
            :step="0.1" 
          ></el-slider>
        </div>
        
        <div class="setting-item compact">
          <div class="setting-label-group">
            <div class="setting-label">段落间距</div>
            <div class="setting-value">{{ fontSettings.paragraphSpacing }}</div>
          </div>
          <el-slider 
            v-model="fontSettings.paragraphSpacing"
            :min="0.5"
            :max="3"
            :step="0.1"
          ></el-slider>
        </div>
      </div>
      
      <!-- 图片设置 -->
      <div class="setting-section">
        <div class="section-header">
          <Icon icon="mdi:image-outline" class="section-icon" />
          <h3 class="section-title">图片设置</h3>
        </div>
        
        <div class="setting-item">
          <div class="setting-label">图片对齐方式</div>
          <el-radio-group v-model="imageSettings.align" size="small">
            <el-radio-button label="left">
              <Icon icon="mdi:format-align-left" />
            </el-radio-button>
            <el-radio-button label="center">
              <Icon icon="mdi:format-align-center" />
            </el-radio-button>
            <el-radio-button label="right">
              <Icon icon="mdi:format-align-right" />
            </el-radio-button>
          </el-radio-group>
        </div>
        
        <div class="setting-item">
          <div class="setting-label-group">
            <div class="setting-label">图片边框</div>
          </div>
          <el-switch
            v-model="imageSettings.border"
            inline-prompt
            active-text="开"
            inactive-text="关"
          ></el-switch>
        </div>
        
        <div class="setting-item compact" v-if="imageSettings.border">
          <div class="setting-label-group">
            <div class="setting-label">圆角大小</div>
            <div class="setting-value">{{ imageSettings.borderRadius }}px</div>
          </div>
          <el-slider
            v-model="imageSettings.borderRadius"
            :min="0"
            :max="20"
            :step="1"
          ></el-slider>
        </div>
      </div>
      
      <div class="settings-actions">
        <el-button @click="resetSettings" size="small" plain>重置</el-button>
        <el-button type="primary" @click="saveSettings" size="small">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useEditorStore } from '../stores/editor'
import { ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'

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
:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--primary-dark);
}

.settings-content {
  padding: 12px 16px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.setting-section {
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.section-icon {
  font-size: 18px;
  color: var(--primary-color);
  margin-right: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-dark);
  margin: 0;
}

.setting-item {
  margin-bottom: 16px;
}

.setting-item.compact {
  margin-bottom: 12px;
}

.setting-label {
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 6px;
  font-weight: 500;
}

.setting-label-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.setting-value {
  font-size: 12px;
  color: var(--secondary-color);
}

.theme-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.w-full {
  width: 100%;
}

:deep(.el-radio-button--small .el-radio-button__inner) {
  padding: 5px 12px;
}

.settings-actions {
  margin-top: auto;
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-slider) {
  width: 100%;
  margin-top: 4px;
}

:deep(.el-slider__runway) {
  margin: 8px 0;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: -1px 0 0 0 var(--primary-color);
}
</style> 