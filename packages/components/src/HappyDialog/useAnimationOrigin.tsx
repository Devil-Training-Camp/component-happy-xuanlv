import React from 'react';
import { useFunction, useIsoLayoutEffect } from '@xuan/hooks';

let originRect: DOMRect | undefined;

// 点击事件支持从鼠标触发位置动画展开
if (typeof window !== 'undefined') {
  document.documentElement.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        return;
      }
      originRect = target.getBoundingClientRect();
      // 指定时间内发生过点击事件，则从点击位置动画展示
      setTimeout(() => {
        originRect = undefined;
      }, 100);
    },
    true,
  );
}

/**
 * 弹窗的源动画
 */
export default function useAnimationOrigin(
  ref: React.RefObject<HTMLElement>,
  visible: boolean | undefined,
) {
  const currentOrigin = React.useRef<DOMRect | undefined>();

  useIsoLayoutEffect(() => {
    if (visible) {
      currentOrigin.current = originRect;
    }
  }, [visible]);

  return useFunction(() => {
    if (!(currentOrigin.current && ref.current)) {
      return 'translate(25%, 25%) scale(0.5)';
    }
    const { x, y, width, height } = currentOrigin.current;
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = ref.current;

    const scale = `scale(${width / offsetWidth}, ${height / offsetHeight})`;
    return `translate(${x - offsetLeft}px, ${y - offsetTop}px) ${scale}`;
  });
}
