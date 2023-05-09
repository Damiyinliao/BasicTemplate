import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' //组件自动按需引入
import autoImport from 'unplugin-auto-import/vite' //自动导入 Composition API
import { visualizer } from 'rollup-plugin-visualizer' //打包size分析工具
import compression from 'vite-plugin-compression' //gzip/br 压缩
// import { resolve } from 'path'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname), //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
  plugins: [
    vue(),
    visualizer(),
    Components({ resolvers: [] }),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      dts: path.resolve(__dirname, 'types/auto-imports.d.ts'),  // 生成的 dts 文件地址和名称
      eslintrc: {
         enabled: false,  // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
         filepath: path.resolve(__dirname,"./.eslintrc-auto-import.json"),  // 生成文件地址和名称
         globalsPropValue: true,  // 是否生成全局变量
      }
    }),
    compression({
      algorithm: 'gzip',  // 压缩算法
      threshold: 1024 * 500,  // 大于500kb的文件进行压缩
      ext: '.gz', // 压缩文件格式
      deleteOriginFile: false // 是否删除原文件
    }),
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src'), // 设置 `@` 指向 `src` 目录
      '~':path.resolve(__dirname,'public') // 设置 `~` 指向 `public` 目录
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server:{
    host:'localhost', // 指定服务器主机名
    port:8880,      // 指定服务器端口号
    hmr:true,      // 启用或禁用HMR——即时模块重载(热更新)
    open:true,   // 在服务器启动时自动在浏览器中打开应用程序
    https:false  // 服务器是否应该启用HTTPS
  }
})
