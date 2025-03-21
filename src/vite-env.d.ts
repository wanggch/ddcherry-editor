/// <reference types="vite/client" />

declare module '@iconify/vue' {
  import { DefineComponent } from 'vue'
  export const Icon: DefineComponent<{
    icon: string;
    [key: string]: any;
  }>
}
