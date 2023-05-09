import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { basicRoutes } from './routes';

console.log(basicRoutes);

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(), // createWebHashHistory() URL带参#, createWebHistory() URL不带参
  strict: true, // 是否严格模式, 是否应该禁止尾部斜杠。默认为假
  routes: basicRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }) // 路由切换时，页面滚动到顶部
});

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
