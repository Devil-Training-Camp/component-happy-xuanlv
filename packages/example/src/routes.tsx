import React, { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { set } from 'lodash-es';

/**
 * 根据 pages 目录生成路径配置
 */
function generatePathConfig(): Record<string, any> {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('/src/pages/**/$*.{ts,tsx}');

  const pathConfig = {};
  Object.keys(modules).forEach((filePath) => {
    const routePath = filePath
      // 去除 src/pages 不相关的字符
      .replace('/src/pages/', '')
      // 去除文件名后缀
      .replace(/.tsx?/, '')
      // 转换动态路由 $[foo].tsx => :foo
      .replace(/\$\[([\w-]+)]/, ':$1')
      // 转换以 $ 开头的文件
      .replace(/\$([\w-]+)/, '$1')
      // 以目录分隔
      .split('/');
    // 使用 lodash.set 合并为一个对象
    set(pathConfig, routePath, modules[filePath]);
  });
  return pathConfig;
}

/**
 * 为动态 import 包裹 lazy 和 Suspense
 */
function wrapSuspense(importer: () => Promise<{ default: React.ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，还可以自定义 fallback 组件
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

/**
 * 将文件路径配置映射为 react-router 路由
 */
function mapPathConfigToRoute(cfg: Record<string, any>): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === 'function') {
      // 等于 index 则映射为 当前根路由
      const isIndex = routePath === 'index';
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 将函数转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { $, ...rest } = child;
    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense($),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}

function generateRouteConfig(): RouteObject[] {
  const { $, ...pathConfig } = generatePathConfig();
  const childRoutes = mapPathConfigToRoute(pathConfig);
  return [
    {
      path: '/',
      element: wrapSuspense($),
      children: childRoutes,
    },
  ];
}

export const routeConfig = generateRouteConfig();

/**
 * 路由组件
 */
export function PageRoutes() {
  return useRoutes(routeConfig);
}
