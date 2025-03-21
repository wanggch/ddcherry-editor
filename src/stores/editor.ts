import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

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
  
  // 初始化编辑器内容
  function initContent() {
    // 尝试从localStorage中加载保存的内容
    const savedContent = localStorage.getItem('markdownContent')
    
    // 如果有保存的内容，使用保存的内容；否则使用默认内容
    if (savedContent) {
      markdownContent.value = savedContent
    } else {
      markdownContent.value = getDefaultContent()
    }
  }
  
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
  
  // 初始化内容（在创建store时立即执行）
  initContent()
  
  return {
    markdownContent,
    theme,
    codeTheme,
    config,
    setMarkdownContent,
    setTheme,
    setCodeTheme,
    updateConfig,
    initContent // 导出初始化方法以便在需要时重新初始化
  }
}) 