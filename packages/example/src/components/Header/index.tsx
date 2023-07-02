import React from 'react';
import styles from './Header.module.less';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoWrap}>
        <div className={styles.siteLogo}>
          <img src="/favicon.svg" alt="" />
        </div>
        <div className={styles.siteTitle}>组件示例</div>
      </div>
    </div>
  );
};

export default Header;
