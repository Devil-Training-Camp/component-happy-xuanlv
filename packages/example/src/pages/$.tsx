import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import styles from './$.module.less';

function BasicLayout() {
  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.navigation}>
          <Menu />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BasicLayout;
