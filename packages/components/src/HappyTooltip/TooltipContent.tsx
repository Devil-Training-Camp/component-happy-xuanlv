import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import type { HappyTooltipContentProps } from './types';
import { getTriggerArrowEdge } from './utils';
import styles from './TooltipContent.module.less';

/**
 * Tooltip 容器样式
 */
export function TooltipContent({
  className,
  content,
  theme = 'white',
  showArrow = true,
  placement = 'top',
  triggerRef,
  popupRef,
  onClose,
  overlayMode,
  matchTriggerWidth,
  style,
  ...restProps
}: HappyTooltipContentProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  // 箭头指向距离
  const [tooltipProperty, updateTooltipProperty] = useState({
    offset: 0,
    minWidth: 0 as number | undefined,
  });

  useLayoutEffect(() => {
    if (contentRef.current && triggerRef.current) {
      const offset = getTriggerArrowEdge(triggerRef.current, contentRef.current, placement);
      updateTooltipProperty({
        offset,
        minWidth: matchTriggerWidth ? triggerRef.current.offsetWidth : undefined,
      });
    }
  }, [triggerRef]);

  return (
    <div
      className={clsx(styles.happyTooltip, className, {
        [styles.tipMessage]: overlayMode === 'message',
        [styles.themeDark]: theme === 'dark',
        [styles.themeWhite]: theme === 'white',
        [styles.showArrow]: showArrow,
        [styles.top]: placement === 'top',
        [styles.topLeft]: placement === 'topLeft',
        [styles.topRight]: placement === 'topRight',
        [styles.right]: placement === 'right',
        [styles.rightTop]: placement === 'rightTop',
        [styles.rightBottom]: placement === 'rightBottom',
        [styles.bottom]: placement === 'bottom',
        [styles.bottomLeft]: placement === 'bottomLeft',
        [styles.bottomRight]: placement === 'bottomRight',
        [styles.left]: placement === 'left',
        [styles.leftTop]: placement === 'leftTop',
        [styles.leftBottom]: placement === 'leftBottom',
      })}
      style={
        {
          '--ux-tooltip-trigger-arrow-edge': `${tooltipProperty.offset}px`,
          minWidth: tooltipProperty.minWidth,
          ...style,
        } as React.CSSProperties
      }
      ref={contentRef}
      {...restProps}
    >
      {typeof content === 'function'
        ? content({ placement, triggerRef, popupRef, onClose })
        : content}
    </div>
  );
}
