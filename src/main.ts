import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
// 先导入主样式，然后是Tailwind相关样式
import './style.css'
import './assets/main.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册Iconify组件
app.component('Icon', Icon)

app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
