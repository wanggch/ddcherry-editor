import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  // 编辑器内容
  const markdownContent = ref('')
  
  // 编辑器主题设置
  const theme = ref('default')
  const codeTheme = ref('github')
  
  // 自定义配置
  const config = ref({
    fontSize: 16,
    lineHeight: 1.6,
    paragraphSpacing: 1.2,
    imageStyle: {
      align: 'center',
      border: false,
      borderRadius: 0
    }
  })
  
  // 设置markdown内容
  function setMarkdownContent(content: string) {
    markdownContent.value = content
  }
  
  // 设置主题
  function setTheme(newTheme: string) {
    theme.value = newTheme
  }
  
  // 设置代码高亮主题
  function setCodeTheme(newTheme: string) {
    codeTheme.value = newTheme
  }
  
  // 更新配置
  function updateConfig(newConfig: any) {
    config.value = { ...config.value, ...newConfig }
  }
  
  return {
    markdownContent,
    theme,
    codeTheme,
    config,
    setMarkdownContent,
    setTheme,
    setCodeTheme,
    updateConfig
  }
}) 