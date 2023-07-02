import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { routeConfig } from '@/routes';
import styles from './Menu.module.less';

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
        className={({ isActive }) => clsx(styles.link, { [styles.active]: isActive })}
        style={{ paddingLeft: indentation }}
      >
        Index
      </NavLink>
    ) : !hasChildren ? (
      <NavLink
        key={routePath}
        to={routePath}
        className={({ isActive }) => clsx(styles.link, { [styles.active]: isActive })}
        style={{ paddingLeft: indentation }}
      >
        {route.path}
      </NavLink>
    ) : isRoot ? null : (
      <p className={styles.caption} key={route.path} style={{ paddingLeft: indentation }}>
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
  return <div className={styles.menu}>{menuNode}</div>;
}
