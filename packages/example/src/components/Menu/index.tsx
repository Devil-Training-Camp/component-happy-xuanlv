import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { routeConfig } from '@/routes';

/**
 * 生成菜单
 */
function generateMenu(originList: RouteObject[], pathList: string[]): React.ReactNode {
  return originList.map(({ children, ...route }) => {
    const isRoot = route.path === '/';
    const hasChildren = children && children.length > 0;
    // 路由 path
    const routePath = (route.path ? pathList.concat(route.path) : pathList).join('/');
    // 缩进
    const indentation = 10 + pathList.length * 10;

    const itemNode = route.index ? (
      <NavLink
        key={routePath}
        to={routePath}
        className={({ isActive }) =>
          clsx('hover:text-primary-5 relative block truncate py-2', {
            'text-primary bg-primary-1 border-primary border-r-2': isActive,
          })
        }
        style={{ paddingLeft: indentation }}
      >
        Index
      </NavLink>
    ) : !hasChildren ? (
      <NavLink
        key={routePath}
        to={routePath}
        className={({ isActive }) =>
          clsx('hover:text-primary-5 relative block truncate py-2', {
            'text-primary bg-primary-1 border-primary border-r-2': isActive,
          })
        }
        style={{ paddingLeft: indentation }}
      >
        {route.path}
      </NavLink>
    ) : isRoot ? null : (
      <p
        className="mb-2 mt-5 pl-8 text-sm text-slate-400"
        key={route.path}
        style={{ paddingLeft: indentation }}
      >
        {route.path}
      </p>
    );

    if (!hasChildren) {
      return itemNode;
    }

    return (
      <React.Fragment key={routePath}>
        {itemNode}
        {generateMenu(children, pathList.concat(isRoot ? '' : route.path ?? []))}
      </React.Fragment>
    );
  });
}

const menuNode = generateMenu(routeConfig, []);

export default function Menu() {
  return <div className="flex flex-col py-5 text-slate-800">{menuNode}</div>;
}
