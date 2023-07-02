import React from 'react';
import clsx from 'clsx';
import type { HappySpinProps } from './types';
import styles from './HappySpin.module.less';

/**
 * 加载中
 */
const HappySpin: React.FC<HappySpinProps> = ({
  size,
  delay,
  indicator,
  full,
  tip,
  className,
  style,
}) => {
  return (
    <div
      className={clsx(styles.happySpin, 'happy-spin', className, {
        [styles.small]: size === 'small',
        [styles.large]: size === 'large',
        [styles.delay]: delay,
        [styles.full]: full,
      })}
      style={delay ? { ...style, animationDelay: `${delay}ms` } : style}
    >
      {indicator || (
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path
            d="M128 281.6a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 0 0-307.2 0z"
            fillOpacity=".2"
          />
          <path
            d="M588.8 281.6a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 0 0-307.2 0z"
            fillOpacity=".4"
          />
          <path
            d="M588.8 742.4a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 0 0-307.2 0z"
            fillOpacity=".7"
          />
          <path d="M128 742.4a153.6 153.6 0 1 0 307.2 0 153.6 153.6 0 0 0-307.2 0z" />
        </svg>
      )}
      {tip && <div className={styles.tip}>{tip}</div>}
    </div>
  );
};

export default HappySpin;
