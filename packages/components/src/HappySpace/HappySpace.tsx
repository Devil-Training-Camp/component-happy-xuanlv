import React, { useMemo } from 'react';
import clsx from 'clsx';
import type { HappySpaceProps } from './types';
import { getNumberSize } from './utils';
import styles from './HappySpace.module.less';

function HappySpace(
  {
    size = 'small',
    direction = 'horizontal',
    align = direction === 'horizontal' ? 'center' : undefined,
    className,
    style,
    children,
    ...restProps
  }: HappySpaceProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [horizontalSize, verticalSize] = useMemo(
    () => (Array.isArray(size) ? size : [size, size]).map(getNumberSize),
    [size],
  );

  return (
    <div
      className={clsx(styles.happySpace, className, {
        [styles.horizontal]: direction === 'horizontal',
        [styles.vertical]: direction === 'vertical',
      })}
      style={
        {
          '--ux-space-horizontal-size': `${horizontalSize}px`,
          '--ux-space-vertical-size': `${verticalSize}px`,
          alignItems: align,
          ...style,
        } as React.CSSProperties
      }
      ref={ref}
      {...restProps}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(HappySpace);
