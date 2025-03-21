<template>
  <div class="markdown-preview">
    <!-- <div class="preview-header">
      <Icon icon="mdi:eye" class="preview-icon" />
      <span class="preview-title">预览</span>
    </div> -->
    <div 
      class="preview-content" 
      v-html="renderedContent"
      :class="themeClass"
      :style="customStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { useEditorStore } from '../stores/editor'
import { Icon } from '@iconify/vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const editorStore = useEditorStore()

// 根据配置生成自定义样式
const customStyle = computed(() => {
  return {
    fontSize: `${editorStore.config.fontSize}px`,
    lineHeight: editorStore.config.lineHeight,
    '--paragraph-spacing': `${editorStore.config.paragraphSpacing}em`,
    '--image-align': editorStore.config.imageStyle.align,
    '--image-border': editorStore.config.imageStyle.border ? '1px solid #ddd' : 'none',
    '--image-border-radius': `${editorStore.config.imageStyle.borderRadius}px`,
    'font-family': 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif'
  };
});

// 初始化 MarkdownIt 解析器
const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string | undefined {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

// 根据当前主题返回主题类
const themeClass = computed(() => {
  return `theme-${editorStore.theme}`;
});

// 渲染 Markdown 内容为 HTML，并做微信公众号兼容处理
const renderedContent = computed(() => {
  let html = md.render(props.content || '');
  
  // 处理图片标签，使其与微信公众号兼容
  html = html.replace(/<img ([^>]*)>/g, (match, p1) => {
    return `<img ${p1} style="max-width:100%;display:block;margin:1em auto;">`;
  });
  
  return html;
});

// 监听代码主题变化
watch(() => editorStore.codeTheme, (newTheme) => {
  // 动态加载代码高亮样式
  let linkId = 'highlight-theme';
  let link = document.getElementById(linkId) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  
  link.href = `https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/${newTheme}.min.css`;
});
</script>

<style>
.markdown-preview {
  @apply h-full overflow-auto;
}

.preview-header {
  @apply flex items-center px-4 py-2 border-b border-gray-200 bg-gray-50;
}

.preview-icon {
  @apply text-lg mr-2;
  color: var(--primary-color);
}

.preview-title {
  @apply font-medium text-sm;
  color: var(--text-color);
}

.preview-content {
  @apply max-w-3xl mx-auto p-4;
  word-break: break-word;
}

/* 主题样式 - 优化以符合微信公众号风格 */
.theme-default {
  @apply text-gray-800 bg-white;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

.theme-elegant {
  @apply text-gray-700 bg-gray-50;
  font-family: 'Georgia', serif;
}

.theme-tech {
  @apply text-gray-900 bg-blue-50;
  font-family: 'Roboto', sans-serif;
}

.theme-dark {
  @apply text-gray-200 bg-gray-800;
}

/* 元素样式 */
.preview-content h1 {
  @apply text-2xl font-bold mt-6 mb-4;
  color: var(--primary-dark);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5em;
}

.preview-content h2 {
  @apply text-xl font-bold mt-5 mb-3;
  color: var(--primary-color);
}

.preview-content h3 {
  @apply text-lg font-bold mt-4 mb-2;
  color: var(--text-color);
}

.preview-content p {
  @apply my-4;
  margin-bottom: var(--paragraph-spacing);
}

.preview-content blockquote {
  @apply pl-4 border-l-4 my-4 text-gray-600 bg-gray-50;
  border-left-color: var(--primary-color);
  padding: 0.5em 0.8em;
}

.preview-content ul, .preview-content ol {
  @apply pl-6 my-4;
}

.preview-content ul {
  @apply list-disc;
}

.preview-content ol {
  @apply list-decimal;
}

.preview-content a {
  color: var(--primary-color);
  text-decoration: none;
}

.preview-content a:hover {
  text-decoration: underline;
  color: var(--primary-dark);
}

.preview-content img {
  max-width: 100%;
  text-align: var(--image-align);
  border: var(--image-border);
  border-radius: var(--image-border-radius);
  margin: 1em auto;
  display: block;
}

.preview-content pre {
  @apply my-4 p-4 rounded overflow-auto;
  background-color: #f6f8fa;
}

.preview-content code {
  @apply font-mono text-sm;
}

.preview-content :not(pre) > code {
  @apply px-1 py-0.5 rounded;
  background-color: #f3f4f6;
  color: var(--primary-dark);
}

/* 表格样式 */
.preview-content table {
  @apply w-full border-collapse my-4;
}

.preview-content th, .preview-content td {
  @apply border px-4 py-2;
  border-color: var(--border-color);
}

.preview-content th {
  background-color: #f9fafb;
}

/* 删除线和下划线 */
.preview-content del {
  @apply line-through text-gray-500;
}

.preview-content u {
  @apply underline;
}
</style> 