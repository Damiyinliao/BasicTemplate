import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';

const routeModuleList: AppRouteModule[] = [];

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/*.ts', { eager: true });
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {};
  const modList = Array.isArray(mod) ? mod : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

// 跟路由即首页
export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    // redirect: '/home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
        title: 'Root'
    }
};

export const basicRoutes = [
  RootRoute,
  ...asyncRoutes
];