# 微信公众号Markdown编辑器

一个基于Vue 3、TypeScript和Vite构建的微信公众号Markdown编辑器，旨在让公众号内容创作更加高效便捷。

## 功能特点

- **Markdown实时编辑**：支持标准Markdown语法，实时渲染预览
- **工具栏**：提供常用格式化功能，无需记忆所有Markdown语法
- **多主题支持**：内置多种文章主题和代码高亮主题
- **自定义样式**：可自定义字体大小、行高、段落间距等
- **图片增强**：支持调整图片对齐方式、添加边框和圆角
- **一键复制HTML**：一键复制生成的HTML代码，直接粘贴到微信公众号编辑器

## 技术栈

- **Vue 3**：使用Vue 3的组合式API和`<script setup>`
- **TypeScript**：提供类型安全和更好的开发体验
- **Vite**：快速的开发服务器和构建工具
- **Pinia**：Vue状态管理
- **Element Plus**：UI组件库
- **CodeMirror 6**：代码编辑器
- **Markdown-it**：Markdown渲染引擎
- **Highlight.js**：代码高亮
- **TailwindCSS**：实用优先的CSS框架

## 快速开始

### 安装依赖

```bash
# 使用pnpm
pnpm install

# 或使用npm
npm install

# 或使用yarn
yarn install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 使用方法

1. 在左侧编辑器中编写Markdown内容
2. 使用工具栏辅助添加格式化内容
3. 在右侧实时预览渲染效果
4. 根据需要在设置面板中调整样式
5. 完成后点击"复制"按钮获取HTML代码
6. 将HTML代码粘贴到微信公众号编辑器中

## 功能详解

### 文本格式化

- 标题（H1-H6）
- 加粗、斜体
- 引用块
- 列表（有序、无序）
- 代码块和行内代码

### 插入功能

- 链接
- 图片
- 表格
- 代码块

### 主题设置

- 默认主题
- 优雅主题
- 科技主题
- 暗黑主题

### 自定义设置

- 字体大小
- 行高
- 段落间距
- 图片样式（对齐、边框、圆角）

## 贡献指南

欢迎贡献代码、报告问题或提出功能建议！

1. Fork此仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的修改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个Pull Request

## 许可证

MIT

---

希望这个工具能让你的公众号创作更加高效！
