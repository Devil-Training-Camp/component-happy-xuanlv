import type { RefObject } from 'react';
import { useEffect } from 'react';

export interface MountHandlerProps {
  container: HTMLElement | undefined;
  rootRef: RefObject<HTMLDivElement>;
}

// 容器上的 overflow
let lastOverflow: string | undefined;
// 存在的弹窗
let existCount = 0;

/**
 * 屏蔽容器滚动
 */
export function MountHandler({ container, rootRef }: MountHandlerProps) {
  useEffect(() => {
    if (!container) {
      return undefined;
    }
    // 聚焦
    rootRef.current?.focus({ preventScroll: true });
    // 弹窗数量递增
    existCount += 1;

    const { style } = container;
    // 第一次打开时，暂存容器样式
    if (existCount <= 1) {
      lastOverflow = style.overflow;
    }
    style.overflow = 'hidden';

    return () => {
      existCount -= 1;

      // 只有最后一个关闭时，恢复容器样式
      if (existCount <= 0) {
        style.overflow = lastOverflow!;
      }
    };
  }, [container]);

  return null;
}
